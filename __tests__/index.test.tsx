import { render, screen } from '@testing-library/react';
import { Sample } from '@/components/v3/Misc/Sample';

describe('Sample', () => {
	/*
	const stayingSharpLabel = screen.getByTestId('quick-links-brainhealth');
	expect(stayingSharpLabel).toBeInDocument();
	const anchor = stayingSharpLink.closest('a');
	expect(anchor).toBeInDocument();
	expect(anchor).toHaveAttribute('href', '/health/uhcarticle/hwal-staying-sharp');
	expect(anchor).toHaveAttribute('target', '_blank');
 
    expect(stayingSharpLink).toHaveAttribute(
      'href',
      '/health/uhcarticle/hwal-staying-sharp'
    );
    screen.debug();
 
    expect(stayingSharpLink).toHaveAttribute('target', '_blank');
 
    const nurseSupportLink = screen
      .getByText('24/7 Nurse Support')
      .closest('a');
    expect(nurseSupportLink).toHaveAttribute(
      'href',
      '/health/uhcarticle/hwal-nurse-line-24-7'
    );
    expect(nurseSupportLink).not.toHaveAttribute('target', '_blank');
	*/
	it('Renders with _blank', () => {
		render(<Sample blank />);
		const sample = screen.getByText('Hello');
		expect(sample).toBeInTheDocument();
		const anchor = sample.closest('a');
		expect(anchor).toBeInTheDocument();
		expect(anchor).toHaveAttribute('href', 'https://www.google.com');
		expect(anchor).toHaveAttribute('target', '_blank');
	});

	it('Renders with _self', () => {
		render(<Sample blank={false} />);
		const sample = screen.getByText('Hello');
		expect(sample).toBeInTheDocument();

		const anchor = sample.closest('a');
		expect(anchor).toBeInTheDocument();
		expect(anchor).toHaveAttribute('href', 'https://www.google.com');
		expect(anchor).toHaveAttribute('target', '_self');
	});
});
