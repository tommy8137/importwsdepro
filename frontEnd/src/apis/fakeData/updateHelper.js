const axios = require('axios');
const https = require('https');
const fs = require('fs');
const program = require('commander');


let URL = 'https://192.168.100.207:3000';
// let CATEGORY = 'Fin';
// let CATEGORY_TABLE_NAME = 'densityTable';

let AUTHORIZATION = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IldJTlNPTUUgWUFORyIsInVzZXJJRCI6IjEwNDA0MzAxIiwiaXNNZSI6dHJ1ZSwiaXNDZSI6dHJ1ZSwiaXNFZSI6dHJ1ZSwiaXNBZG1pbiI6dHJ1ZSwibG9naW5UaW1lIjoxNTQ0NTExMjEzOTM3LCJpYXQiOjE1NDQ1MTEyMTMsImV4cCI6MTU0NDU5NzYxMn0.6O4HHnrch_Hho1hZOlvLxd-DXlQ4POCvnVwMzbwUuVk';

let OUTPUT_BASE_PATH = `${__dirname}/Calculator/Thermal/json`;
let FRONTEND_OUTPUT_BASE_PATH = `${__dirname}/Calculator/Thermal`;


let CATEGORY = 'ThermalPlate';
// let CATEGORY_TABLE_NAME = 'materialDensityTable';
let CATEGORY_TABLE_NAME = 'materialDensityTable';

// https.globalAgent.options.ca = fs.readFileSync('/Users/Winsome/Downloads/WiProcurement.cer');

// At request level
const agent = new https.Agent({
  rejectUnauthorized: false
  // ca: fs.readFileSync('/Users/Winsome/Downloads/WiProcurement.cer')
});
// axios.post(`${URL}/costgen/table/${category}/${categoryTableName}`);


/*
呼叫api取得所有資料，並轉成json檔
*/
function saveAllDataIntoJson() {
  axios.get(`${URL}/costgen/database`, {
    headers: { Authorization: AUTHORIZATION },
    httpsAgent: agent
  })
    .then((res) => {
      const { data } = res;
      Object.keys(data).forEach(category => {
        Object.keys(data[category]).forEach(fileName => {
          if (!fs.existsSync(`${OUTPUT_BASE_PATH}/${category}`)) {
            fs.mkdirSync(`${OUTPUT_BASE_PATH}/${category}`);
          }
          fs.writeFileSync(`${OUTPUT_BASE_PATH}/${category}/${fileName}.json`, JSON.stringify(data[category][fileName], null, 2));
        });
      });
    })
    .catch((err) => {
      console.log('err', err);
    });
}


/*
整理出前端要的格式並寫成一個json檔案
*/
function getAllData() {
  const data = fs.readdirSync(OUTPUT_BASE_PATH);
  // console.log('data', data);
  let response = {};
  data.forEach(item => {
    const subData = fs.readdirSync(`${OUTPUT_BASE_PATH}/${item}`);
    console.log('s', item);

    subData.forEach(fileName => {
      const content = fs.readFileSync(`${OUTPUT_BASE_PATH}/${item}/${fileName}`, 'utf8');
      let re = /(.*)\.json/i;
      let found = fileName.match(re);
      const key = found[1];
      if (Object.prototype.hasOwnProperty.call(response, item)) {
        response = {
          ...response,
          [item]: {
            ...response[item],
            [key]: JSON.parse(content)
          }
        };
      } else {
        response = {
          ...response,
          [item]: {
            [key]: JSON.parse(content)
          }
        };
      }
    });

    console.log('response', response);
    fs.writeFileSync(`${FRONTEND_OUTPUT_BASE_PATH}/fakeThermal.json`, JSON.stringify(response, null, 2));
    return response;
  });
}


/*
更新所有的table
*/
function updateAllRemoteData() {
  const data = fs.readdirSync(OUTPUT_BASE_PATH);
  data.forEach((category) => {
    const subData = fs.readdirSync(`${OUTPUT_BASE_PATH}/${category}`);
    subData.forEach(async fileName => {
      const content = fs.readFileSync(`${OUTPUT_BASE_PATH}/${category}/${fileName}`, 'utf8');
      let re = /(.*)\.json/i;
      let found = fileName.match(re);
      const categoryTableName = found[1];
      try {
        // 更新資料
        // console.log('更新', `${URL}/costgen/table/${category}/${categoryTableName}/`);
        const res = await axios.post(`${URL}/costgen/table/${category}/${categoryTableName}/`,
          JSON.parse(content), {
            headers: { Authorization: AUTHORIZATION },
            httpsAgent: agent,
          });
        console.log('res', res.data);
      } catch (err) {
        console.log('err', err.response.data);
        console.log('err', `${URL}/costgen/table/${category}/${categoryTableName}/`);
      }
    });
  });
}


async function updateOneRemoteData(category = CATEGORY, categoryTableName = CATEGORY_TABLE_NAME) {
  console.log('更新單一表格', `${URL}/costgen/table/${category}/${categoryTableName}/`);
  const content = fs.readFileSync(`${OUTPUT_BASE_PATH}/${category}/${categoryTableName}.json`, 'utf8');
  try {
    // 更新資料
    const res = await axios.post(`${URL}/costgen/table/${category}/${categoryTableName}/`,
      JSON.parse(content), {
        headers: { Authorization: AUTHORIZATION },
        httpsAgent: agent,
      });
    // console.log('res', res.data);
  } catch (err) {
    console.log('err', err.response.data);
    // FIXME
    // ThermalPlate - materialDensityTable
    // err https://192.168.100.207:3000/costgen/table/Fan/motorArchitectureTable/s
    // err https://192.168.100.207:3000/costgen/table/Pipe/outerDiameterTable/

    // err https://192.168.100.207:3000/costgen/table/Pipe/outerDiameterLengthTable/
    // err https://192.168.100.207:3000/costgen/table/ThermalPlate/materialDensityTable/
  }
}

// <category> <table> 是必填的欄位
/*
node src/apis/fakeData/updateHelper.js -h


更新單一張table
ex: node src/apis/fakeData/updateHelper.js update-one ThermalBlock thermalBlockTable

更新所有table
ex: node src/apis/fakeData/updateHelper.js update-all

把server table抓下來
ex: node src/apis/fakeData/updateHelper.js sync-from-server


*/
program
  .command('update-one [category] [table]')
  .description('update one table by category and table Name')
  // .option('-c, --category <value>', 'category')
  // .option('-t, --table <value>', 'table')
  .action((category, table, options) => {
    if (category && table) {
      CATEGORY = category;
      CATEGORY_TABLE_NAME = table;
    }
    updateOneRemoteData();
  });

program
  .command('update-all')
  .description('update all table to server')
  .action(() => {
    updateAllRemoteData();
  });

program
  .command('sync-from-server')
  .description('save all table into json files')
  .action(() => {
    saveAllDataIntoJson();
    getAllData();
  });

program.parse(process.argv);
