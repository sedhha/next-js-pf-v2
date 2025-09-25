import { sendEmail } from '@/backend/brevo/emailService';
import { updateContactByUuid } from '@/backend/supabase/create_ids';
import { htmlTemplate } from './emailTemplate';

export async function POST(request: Request) {
	const authHeader = request.headers.get('authorization');
	const id = authHeader?.split(' ')?.[1];
	if (!id) {
		return new Response(
			JSON.stringify({ error: true, message: 'No ID provided' }),
			{
				status: 400
			}
		);
	}

	const form = await request.json();

	const res = await updateContactByUuid(id, form);

	if (res.error) {
		return new Response(JSON.stringify({ error: true, message: res.message }), {
			status: 500
		});
	}

	// Try sending email, but don't let it affect response
	try {
		await sendEmail(
			process.env.TO_USER ?? '',
			'New Contact Form Submission',
			htmlTemplate(form.name, form.email, form.subject, form.description)
		);
	} catch (err) {
		console.error('Email sending failed:', err);
		// swallow error intentionally
	}

	// Always return success if DB update worked
	return new Response(
		JSON.stringify({
			error: false,
			message: 'Contact form submitted successfully'
		}),
		{ status: 200 }
	);
}
