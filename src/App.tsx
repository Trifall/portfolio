import { AnimatePresence, motion } from 'framer-motion';
import Transition from './components/landingEntry';

function App() {
	return (
		<>
			<AnimatePresence mode='wait'>
				<motion.div key={'LandingPageEntry'}>
					<Transition />
					<div className='flex min-h-screen items-stretch justify-center bg-black'>
						<div className='relative m-4 flex w-full items-center justify-center overflow-hidden rounded-lg bg-black bg-opacity-75'>
							<canvas className='orb_canvas'></canvas>
							<div className='z-10 bg-slate-400 p-32 text-green-200'>testing things!</div>
							{/* <div className='bg-green-400 mx-5'>test</div> */}
						</div>
					</div>
					<div className='h-screen w-full bg-blue-600'>test2</div>
				</motion.div>
			</AnimatePresence>
		</>
	);
}

export default App;
