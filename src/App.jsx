import { MotionConfig } from 'motion/react';

import { Header, Footer, MoviesBlock } from './components';

export default function App() {
	return (
		<MotionConfig reducedMotion="user">
			<main>
				<Header />
				<MoviesBlock />
				<Footer />
			</main>
		</MotionConfig>
	);
}
