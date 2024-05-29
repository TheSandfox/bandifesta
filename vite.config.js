import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';

import Dotenv from 'dotenv';
Dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(),VitePWA()],
	base: "/bandifesta",
})
