const request = require('request');
const { GoogleSpreadsheet } = require('google-spreadsheet');

const args = process.argv;

// console.log('args', args);

// Google Sheet ID
const GOOGLE_SHEET_ID = '1UW73vGLeaf8SBDeRmnP0dh8Cv6t7Mwg5PDT6l7PnPY8';

// 要計算的 job name
const JOBS_NAME = [
  'prd-ap1-deploy',
  'prd-ap2-deploy',
  'prd-kafka-consumer-deploy',
  'prd-sync-eProcurement'
];

// console.log('args[2]', args[2]);
// console.log('args[3]', args[3]);
// console.log('args[4]', args[4]);
// console.log('args[5]', args[5]);

const options = {
  url: `https://gitlab.devpack.cc/api/v4/projects/1775/pipelines/${args[2]}/jobs`,
  headers: {
    'PRIVATE-TOKEN': args[3],
  }
};

request(options, async (error, response, body) => {
  if (!error && response.statusCode == 200) {
    const data = JSON.parse(body);

    // 過濾出需要計算的 jobs name
    const filterData = data.filter(job => JOBS_NAME.indexOf(job.name) !== -1);

    let deployRecord = {
      date: null,
      ref: null,
      totalTime: 0,
      status: true,
    };

    filterData.forEach((jobData) => {
      const d = new Date(jobData.created_at)
      const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' })
      const [{ value: mo },,{ value: da },,{ value: ye }] = dtf.formatToParts(d)

      // manual: 沒執行 job, 不判斷
      let checkResult = true;
      if (jobData.status === 'failed') {
        checkResult = false;
      }

      deployRecord = {
        ...deployRecord,
        date: `${ye}-${mo}-${da}`,
        ref: jobData.ref,
        totalTime: deployRecord.totalTime + ((jobData.duration) ? jobData.duration : 0),
        status: deployRecord.status && checkResult,
      };
    });
    console.log('deployRecord', deployRecord);

    const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID);

    await doc.useServiceAccountAuth({
      client_email: args[4],
      private_key: args[5],
    });

    await doc.loadInfo();

     // Sheet: Release Status
    const sheet = doc.sheetsByIndex[1];

    // 加入 Row
    const larryRow = await sheet.addRow({
      'date': deployRecord.date,
      'tag': deployRecord.ref,
      'time(sec)': Math.round(deployRecord.totalTime), // 四捨五入
      'success': deployRecord.status,
    });
  } else {
    console.error(error);
  }
});

/**
 * dateFormat
 * 日期格式轉換
 *
 * @param {*} date
 */
const dateFormat = (date) => {
  const d = new Date(date);
  const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' });
  const [{ value: mo },,{ value: da },,{ value: ye }] = dtf.formatToParts(d);
  return `${ye}-${mo}-${da}`;
}