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
								className='absolute left-1/2 top-1/2 z-10 w-[85%] -translate-x-1/2 -translate-y-1/2 p-4 sm:w-[80%] sm:p-32'
								key='TextWrapper'
							>
								<motion.span className='text-4xl leading-snug text-white sm:text-[2.3vw] md:text-5xl'>
									Howdy Partner! I&apos;m Jerren Trifan, a web and software developer. <br />
									<br /> I love creating software solutions in many different languages and frameworks.
								</motion.span>
							</div>
							<div className='absolute bottom-16 right-16 z-10' key='ProjectsLinkWrapper'>
								<SmoothLink itemName='projects'>
									<span className='text-5xl'>My Projects</span>
								</SmoothLink>
							</div>
							<div className='absolute left-16 top-16 z-10 ' key='HomeLinkWrapper'>
								<SmoothLink itemName='landing'>
									<span className='text-2xl'>Jerren Trifan</span>
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
						<div className='relative h-[600px] w-[800px] [&>img]:absolute [&>img]:inset-0 [&>span]:absolute [&>span]:inset-0'>
							<img src='https://via.placeholder.com/800x600' alt='placeholder' data-parallax-offset='-2' />
							<span className='p-3 text-4xl leading-snug text-white sm:text-[2.3vw]' data-parallax-offset='2'>
								Add project card here!
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
