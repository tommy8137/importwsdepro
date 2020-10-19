// 找到所有需要測試的檔案

const testsContext = require.context('../../src', true, /\.spec\.js$/);
testsContext.keys().forEach(testsContext);

// 測試karma設定對不對
const simpleTest = require.context('../', true, /\.spec\.js$/);
simpleTest.keys().forEach(simpleTest);

// module.exports = testsContext;
