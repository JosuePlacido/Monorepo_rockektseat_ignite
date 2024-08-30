import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()]
});
/*
document.querySelectorAll('#wtf a').forEach(async function (a) {
	const tab = await window.open(a.href);
	tab.document.createElement('script');
	script.src = `window.open(
		document.querySelector('img.uImage').src,
		'_blank'
	);`;
	tab.document.head.appendChild(script);
	console.log(index + 1);
});
*/
