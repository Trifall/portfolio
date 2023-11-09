import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const transitionVariants = {
	initial: {
		y: '100%',
		height: '100%',
	},
	animate: {
		y: '0%',
		height: '0%',
	},
	exit: {
		y: ['0%', '100%'],
		height: ['0%', '100%'],
	},
};

const transitionSpanVariants = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
	},
	exit: {
		opacity: 0,
	},
};

const Transition = () => {
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(false);
		}, 3000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<>
			<motion.div
				className='z-99999 from--500 fixed bottom-full left-0 right-0 flex h-screen w-screen items-center justify-center bg-gradient-to-tr from-black to-gray-900'
				variants={transitionVariants}
				initial='initial'
				animate='animate'
				exit='exit'
				transition={{ delay: 3, duration: 2, ease: 'easeInOut' }}
			>
				<AnimatePresence>
					{isVisible && (
						<motion.span
							className='text-5xl font-bold'
							variants={transitionSpanVariants}
							animate='animate'
							exit='exit'
							initial='initial'
							transition={{ delay: 0, duration: 1, ease: 'easeInOut' }}
						>
							Jerren Trifan
						</motion.span>
					)}
				</AnimatePresence>
			</motion.div>
		</>
	);
};

export default Transition;
