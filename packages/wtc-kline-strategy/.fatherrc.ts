import { defineConfig } from 'father';

export default defineConfig({
  cjs: {
    input: 'src',
    output: 'cjs',
    platform: 'node',
    transformer: 'esbuild',
  },
  extraBabelPresets: ['minify'],
});
