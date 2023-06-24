import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

export default defineConfig(({ command }) => {
  const config = {
    plugins: [preact()],
    base: '/SpyGame',
  };

  if (command !== 'serve') {
    config.base = '/SpyGame/';
  }

  return config;
});
