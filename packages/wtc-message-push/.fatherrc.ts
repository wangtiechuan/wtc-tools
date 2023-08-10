import { defineConfig } from 'father';

export default defineConfig({
  esm: {
    input: 'src',
    output: 'esm',
    platform: 'browser',
    transformer: 'babel',
  },
  cjs: {
    input: 'src',
    output: 'cjs',
    platform: 'node',
    transformer: 'esbuild',
  },
  extraBabelPresets: ['minify'],
});
