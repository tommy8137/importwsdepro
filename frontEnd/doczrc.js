import { css } from 'docz-plugin-css';
import merge from 'webpack-merge';
import resolve from './webpack/config/resolve';

export default {
  title: 'WiProcure Documentation',
  // wrapper: 'src/components/DoczWrapper',
  port: 9454,
  htmlContext: {
    head: {
      links: [{
        rel: 'stylesheet',
        href: 'https://codemirror.net/theme/default.css'
      }]
    }
  },
  themeConfig: {
    // mode: 'dark',
    codemirrorTheme: 'default'
  },
  plugins: [
    css({
      preprocessor: 'postcss',
      // cssmodules: true,
    }),
    css({
      preprocessor: 'sass',
      cssmodules: true,
      loaderOpts: {
        /* whatever your preprocessor loader accept */
      }
    })
  ],
  hashRouter: true,
  modifyBundlerConfig: (modifyBundler) => {
    return merge(modifyBundler, resolve);
  },
};
