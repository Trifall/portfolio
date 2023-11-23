import '@/styles/global.css';
import { ThemeProvider } from '@/styles/theme-provider.tsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ParallaxProvider } from 'react-scroll-parallax';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ParallaxProvider>
			<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
				<App />
			</ThemeProvider>
		</ParallaxProvider>
	</React.StrictMode>
);

export default App;
