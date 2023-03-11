import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  resolve: {
    docDirs: ['docs'],
    atomDirs: [
      { type: 'wtc-common-tools', dir: '/packages/wtc-common-tools/docs' },
      { type: 'wtc-node-tools', dir: '/packages/wtc-node-tools/docs' },
      { type: 'wtc-web-tools', dir: '/packages/wtc-web-tools/docs' },
      { type: 'wtc-react-comp', dir: '/packages/wtc-react-comp/docs' },
    ],
    codeBlockMode: 'passive',
  },
  outputPath: 'docs-dist',
  alias: {
    '@wtc/wtc-common-tools': path.join(__dirname, 'packages/wtc-common-tools/src'),
    '@wtc/wtc-node-tools': path.join(__dirname, 'packages/wtc-node-tools/src'),
    '@wtc/wtc-web-tools': path.join(__dirname, 'packages/wtc-web-tools/src'),
    '@wtc/wtc-react-comp': path.join(__dirname, 'packages/wtc-react-comp/src'),
  },
  autoAlias: true,
  themeConfig: {
    name: 'wtc-tools',
    // logo: '',
    footer: 'Copyright © ****-**** WTC. All Rights Reserved.',
  },
});
