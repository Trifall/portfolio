import { useState } from 'react';
import { Button } from './components/ui/button';

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<main>
				<section className='bg-dark'>
					<div className='layout flex min-h-screen flex-col items-center justify-center text-white'>
						<a href='###'>
							<h1>Vite React Tailwind</h1>
						</a>
						<Button
							onClick={() => {
								setCount((prev) => prev + 1);
								setCount((prev) => prev + 1);
							}}
						>
							Button
						</Button>

						<p>Counter value: {count}</p>

						<footer className='absolute bottom-2 text-gray-300'>
							© {new Date().getFullYear()} <a href='https://trifall.com'>Jerren Trifan</a>
						</footer>
					</div>
				</section>
			</main>
		</>
	);
}

export default App;
