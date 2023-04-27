import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  resolve: {
    docDirs: ['docs'],
    atomDirs: [
      { type: 'victor-common-tools', dir: '/packages/wtc-common-tools/docs' },
      { type: 'victor-node-tools', dir: '/packages/wtc-node-tools/docs' },
      { type: 'victor-web-tools', dir: '/packages/wtc-web-tools/docs' },
      { type: 'victor-react-comp', dir: '/packages/wtc-react-comp/docs' },
      { type: 'victor-go-database', dir: '/packages/wtc-go-databasedocs' },
      { type: 'victor-exchange-api', dir: '/packages/wtc-exchange-api' },
    ],
    codeBlockMode: 'passive',
  },
  outputPath: 'docs-dist',
  alias: {
    '@victor/victor-common-tools': path.join(__dirname, 'packages/wtc-common-tools/src'),
    '@victor/victor-node-tools': path.join(__dirname, 'packages/wtc-node-tools/src'),
    '@victor/victor-web-tools': path.join(__dirname, 'packages/wtc-web-tools/src'),
    '@victor/victor-react-comp': path.join(__dirname, 'packages/wtc-react-comp/src'),
    '@victor/victor-go-database': path.join(__dirname, 'packages/wtc-go-database/src'),
    '@victor/victor-exchange-api': path.join(__dirname, 'packages/wtc-exchange-api/src'),
  },
  autoAlias: true,
  themeConfig: {
    name: 'victor-tools',
    // logo: '',
    footer: 'Copyright © ****-**** VICTOR. All Rights Reserved.',
  },
});
