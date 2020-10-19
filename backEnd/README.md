WiEProcurement Backend
===
# Start Server
`NVM version`: v8.12.0
`npm run prd`: 系統使用prd參數執行
`npm run sit`: 系統使用sit參數執行
`npm run dev`: 系統使用dev參數執行(default run cmd)
`npm run testapi`: 系統API測試
`npm run testunit`：系統單元測試
`npm run testunitwithcoverage`：系統單元測試產覆蓋率
`npm run testunitwithHtmlcoverage`：系統單元測試產網頁覆蓋率

# Ruuner
`dind`,`mrk3`,`server199`

# API Document
Power by [apidoc](http://apidocjs.com/)

## Usage:
### Pre install
`npm install -g apidoc`
### Generate document
`apidoc -i server/router/ -o apidoc/` or `npm run apidoc`
### View Document
browse https://localhost:3000/apidoc/

### Generate Token for test use
- open ../test/api/generateToken.js
- change the following paramaters user id, user name & relation authority
- save generateToken.js file
- use command tool excute npm run generateToken
- get 6 days and 12 hours expire token

///