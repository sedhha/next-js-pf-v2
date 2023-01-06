import Header from '@/v2/Header';
import Intro from '@/v2/Intro';
import Work from '@/v2/Work';
import Blog from '@/v2/Blog';
import Contact from '@/v2/Contact';
import Projects from '@/v2/Projects';
import Awards from '@/v2/Awards';
import Videos from '@/v2/Videos';
import Testimonials from '@/v2/Testimonials';
import TechStack from '@/v2/TechStack';
import Footer from '@/v2/Footer';
import MobileNavigator from '@/v2/MobileNavigator';

export default function Index() {
	return (
		<>
			<Header />
			<MobileNavigator />
			<Intro />
			<Work />
			<Blog />
			<Contact />
			<Projects />
			<Awards />
			<Videos />
			<Testimonials />
			<TechStack />
			<Footer />
		</>
	);
}
