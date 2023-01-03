import Header from '@/v2/Header';
import Intro from '@/v2/Intro';
import Work from '@/v2/Work';
import Blog from '@/v2/Blog';
import Contact from '@/v2/Contact';
import Projects from '@/v2/Projects';
import Awards from '@/v2/Awards';
import Videos from '@/v2/Videos';
import Testimonials from '@/v2/Testimonials';

export default function Index() {
	return (
		<>
			<Header />
			<Intro />
			<Work />
			<Blog />
			<Contact />
			<Projects />
			<Awards />
			<Videos />
			<Testimonials />
		</>
	);
}
