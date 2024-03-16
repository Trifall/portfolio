import { AnimatePresence, motion } from 'framer-motion';
import { lazy } from 'react';
import Parallax from 'react-next-parallax';
import Transition from './components/LandingEntry';
import SmoothLink from './components/SmoothLink';

const BackgroundBlobs = lazy(() => import('./components/BackgroundGradient'));
const BackgroundTiles = lazy(() =>
	import('./components/ui/background-boxes').then((module) => ({ default: module.BoxesCore }))
);

function App() {
	return (
		<>
			<AnimatePresence mode='wait'>
				<motion.div className='relative z-40 bg-black' key={'LandingPageEntry'}>
					<Transition key='transition1' />
					<div className='z-40 flex min-h-screen items-stretch justify-center' key='OuterWrapper'>
						<div
							className='relative m-6 flex w-full items-center justify-center overflow-hidden rounded-lg bg-black bg-opacity-75'
							key='InnerWrapper'
						>
							<BackgroundBlobs />
							<div
								className='absolute left-1/2 top-1/2 z-10 w-[85%] -translate-x-1/2 -translate-y-1/2 p-4 sm:w-[80%] sm:p-12 lg:p-24'
								key='TextWrapper'
							>
								<motion.span className='text-[6.5vw] leading-normal text-white sm:text-4xl sm:text-[4vw] md:text-5xl'>
									Howdy Partner! I&apos;m Jerren, a web and software developer. <br />
									<br /> I love creating software solutions in many different languages and frameworks.
								</motion.span>
							</div>
							<div className='absolute bottom-6 right-auto z-10 sm:bottom-16 sm:right-16' key='ProjectsLinkWrapper'>
								<SmoothLink itemName='projects'>
									<span className='text-5xl'>My Projects</span>
								</SmoothLink>
							</div>
							<div className='absolute left-auto top-6 z-10 sm:left-16 sm:top-16' key='HomeLinkWrapper'>
								<SmoothLink itemName='landing'>
									<span className='text-4xl sm:text-2xl'>Jerren Trifan</span>
								</SmoothLink>
							</div>
						</div>
					</div>
				</motion.div>
				<div
					className='relative flex h-screen w-full flex-col items-center justify-center bg-black'
					id='projects'
					key='ProjectsWrapper'
				>
					<div className='absolute left-0 top-0 h-full w-full bg-black bg-opacity-75' key='BoxesWrapper'>
						<BackgroundTiles />
					</div>

					<motion.span className='absolute top-12 text-4xl leading-snug text-white sm:text-5xl'>Projects</motion.span>
					<Parallax style={{ position: 'relative' }} className='p-6'>
						<div className='relative h-[300px] w-[450px] [&>img]:absolute [&>img]:inset-0 [&>span]:absolute'>
							<img src='https://via.placeholder.com/600x400' alt='placeholder' data-parallax-offset='-2' />
							<span className='p-3 text-4xl leading-snug text-white sm:text-[1.6vw]' data-parallax-offset='2'>
								Add project name
							</span>
							<span
								className='bottom-0 left-0 p-3 text-4xl leading-snug text-white sm:text-[1.4vw]'
								data-parallax-offset='2'
							>
								Project description example listing here with a decent amount of text to fill the space.
							</span>
						</div>
					</Parallax>
				</div>
				<div className='relative h-screen w-full items-center justify-center bg-black' id='projects'></div>
			</AnimatePresence>
		</>
	);
}

export default App;
