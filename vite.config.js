import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

const envKeys = [
  "FIREBASE_GOOGLE_API_KEY"
];

// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const processEnv = {};
  envKeys.forEach(key => processEnv[key] = env[key]);

  return {
    define: {
      'process.env': processEnv
    },
    plugins: [react()],
  }
})
