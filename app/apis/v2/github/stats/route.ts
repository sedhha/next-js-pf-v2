// app/api/streak/route.ts
import { NextRequest } from 'next/server';

type Day = { date: string; count: number };

const GH_GQL = 'https://api.github.com/graphql';

function parseISO(d: string) {
	// Safe parse midnight UTC, keep only date
	const [Y, M, D] = d.split('-').map(Number);
	return new Date(Date.UTC(Y, M - 1, D));
}

function addDays(dt: Date, n: number) {
	const d = new Date(dt);
	d.setUTCDate(d.getUTCDate() + n);
	return d;
}

async function fetchCalendar(
	login: string,
	token: string,
	from: string,
	to: string
) {
	const query = `
    query($login:String!, $from:DateTime!, $to:DateTime!) {
      user(login:$login) {
        contributionsCollection(from:$from, to:$to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;
	const res = await fetch(GH_GQL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`,
			'User-Agent': 'streak-endpoint'
		},
		body: JSON.stringify({ query, variables: { login, from, to } }),
		cache: 'no-store'
	});

	if (!res.ok) {
		const txt = await res.text().catch(() => '');
		throw new Error(`GitHub GraphQL error: ${res.status} ${txt}`);
	}
	const json = await res.json();
	const cal = json?.data?.user?.contributionsCollection?.contributionCalendar;
	if (!cal) throw new Error('No calendar data (check username/token scopes).');

	const days: Day[] = cal.weeks
		.flatMap((w: any) => w.contributionDays)
		.map((d: any) => ({ date: d.date, count: d.contributionCount }))
		.sort((a: Day, b: Day) => (a.date < b.date ? -1 : 1));

	return { total: cal.totalContributions as number, days };
}

function computeStreaks(days: Day[]) {
	if (!days.length) {
		return {
			currentCount: 0,
			currentStart: null as Date | null,
			currentEnd: null as Date | null,
			longestCount: 0,
			longestStart: null as Date | null,
			longestEnd: null as Date | null
		};
	}

	// Normalize to daily contiguous series (fill gaps with zero)
	const first = parseISO(days[0].date);
	const last = parseISO(days[days.length - 1].date);
	const map = new Map<string, number>();
	for (const d of days) map.set(d.date, d.count);

	const series: Day[] = [];
	for (let d = new Date(first); d <= last; d = addDays(d, 1)) {
		const key = d.toISOString().slice(0, 10);
		series.push({ date: key, count: map.get(key) ?? 0 });
	}

	// Current streak: from last day backwards until a zero
	let current = 0;
	let curEnd: Date | null = parseISO(series[series.length - 1].date);
	let curStart: Date | null = curEnd;

	for (let i = series.length - 1; i >= 0; i--) {
		if (series[i].count > 0) {
			current++;
			curStart = parseISO(series[i].date);
		} else {
			break;
		}
	}
	if (current === 0) {
		curStart = null;
		curEnd = null;
	}

	// Longest streak: scan all
	let best = 0;
	let bestStart: Date | null = null;
	let bestEnd: Date | null = null;

	let run = 0;
	let runStartIdx = -1;
	for (let i = 0; i < series.length; i++) {
		if (series[i].count > 0) {
			if (run === 0) runStartIdx = i;
			run++;
			if (run > best) {
				best = run;
				bestStart = parseISO(series[runStartIdx].date);
				bestEnd = parseISO(series[i].date);
			}
		} else {
			run = 0;
			runStartIdx = -1;
		}
	}

	return {
		currentCount: current,
		currentStart: curStart,
		currentEnd: curEnd,
		longestCount: best,
		longestStart: bestStart,
		longestEnd: bestEnd
	};
}

type Palette = {
	bg: string;
	border: string;
	text: string;
	subtext: string;
	label: string;
	accent: string; // fire + ring
};

const THEMES: Record<string, Palette> = {
	light: {
		bg: '#FFFEFE',
		border: '#E4E2E2',
		text: '#151515',
		subtext: '#464646',
		label: '#FB8C00',
		accent: '#FB8C00'
	},
	dark: {
		bg: '#0B0F14',
		border: '#1E293B',
		text: '#E5E7EB',
		subtext: '#93A3B8',
		label: '#FDBA74', // softer orange label
		accent: '#FB8C00' // bright orange ring/fire
	}
};

function svgTemplate({
	palette,
	totalContrib,
	currentCount,
	currentRange,
	longestCount,
	longestRange,
	totalRangeLabel,
	transparentBackground = false
}: {
	palette: Palette;
	totalContrib: number;
	currentCount: number;
	currentRange: string;
	longestCount: number;
	longestRange: string;
	totalRangeLabel: string;
	transparentBackground?: boolean;
}) {
	const { bg, border, text, subtext, label, accent } = palette;

	return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'
     style='isolation: isolate' viewBox='0 0 495 195' width='495px' height='195px' direction='ltr'>
  <style>
    @keyframes currstreak {
      0% { font-size: 3px; opacity: 0.2; }
      80% { font-size: 34px; opacity: 1; }
      100% { font-size: 28px; opacity: 1; }
    }
    @keyframes fadein {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
    text { paint-order: stroke; }
  </style>
  <defs>
    <clipPath id='outer_rectangle'>
      <rect width='495' height='195' rx='4.5'/>
    </clipPath>
    <mask id='mask_out_ring_behind_fire'>
      <rect width='495' height='195' fill='white'/>
      <ellipse id='mask-ellipse' cx='247.5' cy='32' rx='13' ry='18' fill='black'/>
    </mask>
  </defs>

  <g clip-path='url(#outer_rectangle)'>
    <g style='isolation: isolate'>
      <rect stroke='${border}' fill='${
		transparentBackground ? 'none' : bg
	}' rx='4.5' x='0.5' y='0.5' width='494' height='194'/>
    </g>

    <g style='isolation: isolate'>
      <line x1='165' y1='28' x2='165' y2='170' vector-effect='non-scaling-stroke' stroke-width='1' stroke='${border}' stroke-linejoin='miter' stroke-linecap='square' stroke-miterlimit='3'/>
      <line x1='330' y1='28' x2='330' y2='170' vector-effect='non-scaling-stroke' stroke-width='1' stroke='${border}' stroke-linejoin='miter' stroke-linecap='square' stroke-miterlimit='3'/>
    </g>

    <!-- Left: Total Contributions -->
    <g style='isolation: isolate'>
      <g transform='translate(82.5, 48)'>
        <text x='0' y='32' text-anchor='middle' fill='${text}'
              font-family='"Segoe UI", Ubuntu, sans-serif' font-weight='700' font-size='28px'
              style='opacity: 0; animation: fadein 0.5s linear forwards 0.6s'>
          ${totalContrib.toLocaleString('en-US')}
        </text>
      </g>
      <g transform='translate(82.5, 84)'>
        <text x='0' y='32' text-anchor='middle' fill='${text}'
              font-family='"Segoe UI", Ubuntu, sans-serif' font-weight='400' font-size='14px'
              style='opacity: 0; animation: fadein 0.5s linear forwards 0.7s'>
          Total Contributions
        </text>
      </g>
      <g transform='translate(82.5, 114)'>
        <text x='0' y='32' text-anchor='middle' fill='${subtext}'
              font-family='"Segoe UI", Ubuntu, sans-serif' font-weight='400' font-size='12px'
              style='opacity: 0; animation: fadein 0.5s linear forwards 0.8s'>
          ${totalRangeLabel}
        </text>
      </g>
    </g>

    <!-- Middle: Current Streak -->
    <g style='isolation: isolate'>
      <g transform='translate(247.5, 108)'>
        <text x='0' y='32' text-anchor='middle' fill='${label}'
              font-family='"Segoe UI", Ubuntu, sans-serif' font-weight='700' font-size='14px'
              style='opacity: 0; animation: fadein 0.5s linear forwards 0.9s'>
          Current Streak
        </text>
      </g>
      <g transform='translate(247.5, 145)'>
        <text x='0' y='21' text-anchor='middle' fill='${subtext}'
              font-family='"Segoe UI", Ubuntu, sans-serif' font-weight='400' font-size='12px'
              style='opacity: 0; animation: fadein 0.5s linear forwards 0.9s'>
          ${currentRange || ''}
        </text>
      </g>
      <g mask='url(#mask_out_ring_behind_fire)'>
        <circle cx='247.5' cy='71' r='40' fill='none' stroke='${accent}' stroke-width='5'
                style='opacity: 0; animation: fadein 0.5s linear forwards 0.4s'></circle>
      </g>
      <g transform='translate(247.5, 19.5)' style='opacity: 0; animation: fadein 0.5s linear forwards 0.6s'>
        <path d='M -12 -0.5 L 15 -0.5 L 15 23.5 L -12 23.5 L -12 -0.5 Z' fill='none'/>
        <path d='M 1.5 0.67 C 1.5 0.67 2.24 3.32 2.24 5.47 C 2.24 7.53 0.89 9.2 -1.17 9.2 C -3.23 9.2 -4.79 7.53 -4.79 5.47 L -4.76 5.11 C -6.78 7.51 -8 10.62 -8 13.99 C -8 18.41 -4.42 22 0 22 C 4.42 22 8 18.41 8 13.99 C 8 8.6 5.41 3.79 1.5 0.67 Z M -0.29 19 C -2.07 19 -3.51 17.6 -3.51 15.86 C -3.51 14.24 -2.46 13.1 -0.7 12.74 C 1.07 12.38 2.9 11.53 3.92 10.16 C 4.31 11.45 4.51 12.81 4.51 14.2 C 4.51 16.85 2.36 19 -0.29 19 Z'
              fill='${accent}'/>
      </g>
      <g transform='translate(247.5, 48)'>
        <text x='0' y='32' text-anchor='middle' fill='${text}'
              font-family='"Segoe UI", Ubuntu, sans-serif' font-weight='700' font-size='28px'
              style='animation: currstreak 0.6s linear forwards'>
          ${currentCount}
        </text>
      </g>
    </g>

    <!-- Right: Longest Streak -->
    <g style='isolation: isolate'>
      <g transform='translate(412.5, 48)'>
        <text x='0' y='32' text-anchor='middle' fill='${text}'
              font-family='"Segoe UI", Ubuntu, sans-serif' font-weight='700' font-size='28px'
              style='opacity: 0; animation: fadein 0.5s linear forwards 1.2s'>
          ${longestCount}
        </text>
      </g>
      <g transform='translate(412.5, 84)'>
        <text x='0' y='32' text-anchor='middle' fill='${text}'
              font-family='"Segoe UI", Ubuntu, sans-serif' font-weight='400' font-size='14px'
              style='opacity: 0; animation: fadein 0.5s linear forwards 1.3s'>
          Longest Streak
        </text>
      </g>
      <g transform='translate(412.5, 114)'>
        <text x='0' y='32' text-anchor='middle' fill='${subtext}'
              font-family='"Segoe UI", Ubuntu, sans-serif' font-weight='400' font-size='12px'
              style='opacity: 0; animation: fadein 0.5s linear forwards 1.4s'>
          ${longestRange || ''}
        </text>
      </g>
    </g>
  </g>
</svg>`;
}

// === GET handler (unchanged logic; new theme params) ===
export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const user = searchParams.get('user') || 'sedhha';

		const token = process.env.GITHUB_TOKEN;
		if (!token) return new Response('Missing GITHUB_TOKEN', { status: 500 });

		const themeParam = (searchParams.get('theme') || 'light').toLowerCase();
		const palette = THEMES[themeParam] || THEMES.light;

		const transparentBackground =
			(searchParams.get('bg') || '').toLowerCase() === 'transparent';

		// same date window + fetch/compute as before...
		const end = new Date();
		const start = new Date(
			Date.UTC(end.getUTCFullYear() - 1, end.getUTCMonth(), end.getUTCDate())
		);
		const { total, days } = await fetchCalendar(
			user,
			token,
			start.toISOString(),
			end.toISOString()
		);
		const {
			currentCount,
			currentStart,
			currentEnd,
			longestCount,
			longestStart,
			longestEnd
		} = computeStreaks(days);

		const fmt = (d: Date | null) =>
			d ? d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '';
		const currentRange =
			currentCount > 0 ? `${fmt(currentStart)} - ${fmt(currentEnd)}` : '';
		const longestRange =
			longestCount > 0 ? `${fmt(longestStart)} - ${fmt(longestEnd)}` : '';
		const totalRangeLabel = days.length
			? `${new Date(days[0].date).toLocaleDateString('en-US', {
					month: 'short',
					day: 'numeric',
					year: 'numeric'
			  })} - Present`
			: '—';

		const svg = svgTemplate({
			palette,
			totalContrib: total,
			currentCount,
			currentRange,
			longestCount,
			longestRange,
			totalRangeLabel,
			transparentBackground
		});

		return new Response(svg, {
			status: 200,
			headers: {
				'Content-Type': 'image/svg+xml; charset=utf-8',
				'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
				'Pragma': 'no-cache',
				'Expires': '0'
			}
		});
	} catch (err: any) {
		return new Response(`<!-- ${err?.message || 'error'} -->`, {
			status: 200,
			headers: { 'Content-Type': 'image/svg+xml; charset=utf-8' }
		});
	}
}
