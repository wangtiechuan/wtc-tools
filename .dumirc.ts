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
      { type: 'victor-go-database', dir: '/packages/wtc-go-database/docs' },
      { type: 'victor-exchange-api', dir: '/packages/wtc-exchange-api/docs' },
      { type: 'victor-save-kline', dir: '/packages/wtc-save-kline/docs' },
      {
        type: 'victor-kline-strategy',
        dir: '/packages/wtc-kline-strategy/docs',
      },
      { type: 'victor-exchange-go', dir: '/packages/wtc-exchange-go/docs' },
      { type: 'victor-message-push', dir: '/packages/wtc-message-push/docs' },
    ],
    codeBlockMode: 'passive',
  },
  outputPath: 'docs-dist',
  alias: {
    '@victor/victor-common-tools': path.join(
      __dirname,
      'packages/wtc-common-tools/src',
    ),
    '@victor/victor-node-tools': path.join(
      __dirname,
      'packages/wtc-node-tools/src',
    ),
    '@victor/victor-web-tools': path.join(
      __dirname,
      'packages/wtc-web-tools/src',
    ),
    '@victor/victor-react-comp': path.join(
      __dirname,
      'packages/wtc-react-comp/src',
    ),
    '@victor/victor-go-database': path.join(
      __dirname,
      'packages/wtc-go-database/src',
    ),
    '@victor/victor-exchange-api': path.join(
      __dirname,
      'packages/wtc-exchange-api/src',
    ),
    '@victor/victor-save-kline': path.join(
      __dirname,
      'packages/wtc-save-kline/src',
    ),
    '@victor/victor-kline-strategy': path.join(
      __dirname,
      'packages/wtc-kline-strategy/src',
    ),
    '@victor/victor-exchange-go': path.join(
      __dirname,
      'packages/wtc-exchange-go/src',
    ),
    '@victor/victor-message-push': path.join(
      __dirname,
      'packages/wtc-message-push/src',
    ),
  },
  autoAlias: true,
  themeConfig: {
    name: 'victor-tools',
    // logo: '',
    footer: 'Copyright © ****-**** VICTOR. All Rights Reserved.',
  },
});
