import { useEffect, useState } from 'react';
import { animateScroll } from 'react-scroll';
type SmoothLinkProps = {
	itemName: string;
	children: React.ReactNode;
	isGradient?: boolean;
};

const SmoothLink = ({ itemName, children, isGradient = true }: SmoothLinkProps) => {
	const [anchorTarget, setAnchorTarget] = useState<HTMLElement | null>(null);

	const options = {
		smooth: 'easeInOutQuad',
		duration: 1000,
	};

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (!anchorTarget) {
			if (itemName === 'landing') return animateScroll.scrollToTop(options);

			return;
		}
		// anchorTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
		animateScroll.scrollTo(anchorTarget.offsetTop, options);
	};
	/*
	 * When the component mounts and/or updates, set our AnchorTarget based
	 * on the itemName
	 */
	useEffect(() => {
		setAnchorTarget(document.getElementById(itemName));
	}, [itemName]);

	// return children
	return (
		<button onClick={handleClick} className={`${isGradient ? 'gradient-link' : ''} rounded-xl px-4 py-2`}>
			{children}
		</button>
	);
};

export default SmoothLink;
