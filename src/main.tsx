import '@/styles/global.css';
import { ThemeProvider } from '@/styles/theme-provider.tsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
			<App />
		</ThemeProvider>
	</React.StrictMode>
);

export default App;
