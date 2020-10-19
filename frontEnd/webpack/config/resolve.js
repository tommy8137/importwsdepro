const path = require('path');

// 當前目錄： path.resolve(__dirname) || script跑的地方： path.resolve('./src')
module.exports = {
  resolve: {  // 要對哪些資料夾進行resolve，感覺不加也不會壞
    // modules: [
    //   path.resolve(__dirname, '../../src'),
    //   'node_modules'
    // ],
    alias: {
      // react: path.resolve(__dirname, '../node_modules/react/dist/react.min.js'),
      // 'react-dom': path.resolve(__dirname, '../node_modules/react-dom/dist/react-dom.min.js'),
      // 'react-bootstrap': path.resolve(__dirname, '../node_modules/react-bootstrap/dist/react-bootstrap.js'),
      '~~elements': path.resolve(__dirname, '../../src', 'components/elements'),
      '~~containers': path.resolve(__dirname, '../../src', 'containers'),
      '~~features': path.resolve(__dirname, '../../src', 'features'),
      '~~hoc': path.resolve(__dirname, '../../src', 'hoc'),
      '~~actions': path.resolve(__dirname, '../../src', 'actions'),
      '~~reducers': path.resolve(__dirname, '../../src', 'reducers'),
      '~~sagas': path.resolve(__dirname, '../../src', 'sagas'),
      '~~epics': path.resolve(__dirname, '../../src', 'epics'),
      '~~utils': path.resolve(__dirname, '../../src', 'utils'),
      '~~static': path.resolve(__dirname, '../../src', 'static'),
      '~~styles': path.resolve(__dirname, '../../src', 'styles'),
      '~~apis': path.resolve(__dirname, '../../src', 'apis'),
      '~~middlewares': path.resolve(__dirname, '../../src', 'middlewares'),
      '~~config': path.resolve(__dirname, '../../src', 'config'),
      '~~store': path.resolve(__dirname, '../../src', 'store'),
      '~~redux': path.resolve(__dirname, '../../src', 'redux'),
      '~~hooks': path.resolve(__dirname, '../../src', 'hooks'),
      '~~jest': path.resolve(__dirname, '../../test', 'unit/jest'),
    },
    extensions: [
      '.js',
      '.jsx'
    ]
  }
};
