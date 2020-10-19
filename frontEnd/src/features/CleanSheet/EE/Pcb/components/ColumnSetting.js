import { comma } from '~~utils/Math';
import { SEARCH_METHOD } from '../PCBCalculatorConst';


const PcbResultColumn = () => {
  function getRenderValue(val) {
    if (typeof val === 'object' && val != null) {
      return val.length === 0 ? '−' : val.join(', ');
    }
    return val == null ?  '−' :  val;
  }

  /**
   *
   * @param {string} key key name
   * @param {number} width 欄寬
   */
  function getConfigs(key, width) {
    return {
      dataIndex: `info.${key}`,
      width,
      render: (val) => getRenderValue(val)
    };
  }

  return (
    [
      {
        title: 'Type I',
        align: 'left',
        ...getConfigs('typei', 80),
      },
      {
        title: 'Type II\n(PTH or HDI)',
        align: 'left',
        ...getConfigs('typeii', 100),
      },
      {
        title: 'Part Number',
        align: 'left',
        ...getConfigs('wistronpn', 150),
      },
      {
        title: 'Description',
        align: 'left',
        ...getConfigs('', 300),
      },
      {
        title: 'PCB No._Stage',
        align: 'left',
        ...getConfigs('PcbStageNo', 120),
      },
      {
        title: 'Vendor Name',
        align: 'left',
        ...getConfigs('', 120),
      },
      {
        title: 'Manufacturer',
        align: 'left',
        ...getConfigs('manufacturer', 120),
      },
      {
        title: 'Supply Type',
        align: 'left',
        ...getConfigs('supply_type', 100),
      },
      {
        title: 'Vendor P/N',
        align: 'left',
        ...getConfigs('', 250),
      },
      {
        title: 'Remark',
        align: 'left',
        ...getConfigs('remark', 180),
      },
      {
        title: 'Curr.',
        align: 'left',
        ...getConfigs('', 60),
        render: () => 'USD'
      },
      {
        title: 'Price(L)',
        align: 'left',
        ...getConfigs('lowest_last_price_info.unitPrice', 100),
      },
      {
        title: 'Price(H)',
        align: 'left',
        ...getConfigs('highest_last_price_info.unitPrice', 100),
      },
      {
        title: 'Org.\nCurr.(L)',
        align: 'left',
        ...getConfigs('lowest_last_price_info.originCurrency', 80),
      },
      {
        title: 'Org.\nCurr.(H)',
        align: 'left',
        ...getConfigs('highest_last_price_info.originCurrency', 80),
      },
      {
        title: 'Org.\nPrice(L)',
        align: 'left',
        ...getConfigs('lowest_last_price_info.originLastPriceup', 120),
      },
      {
        title: 'Org.\nPrice(H)',
        align: 'left',
        ...getConfigs('highest_last_price_info.originLastPriceup', 120),
      },
      {
        title: 'Clean-Sheet\nU/P adder',
        align: 'left',
        ...getConfigs('formula4', 100),
        render: (val) => (val == null ? '-' : comma(val, 5))
      },
      {
        title: 'Adder(%)',
        align: 'left',
        ...getConfigs('sum_adder', 100),
        render: (val) => (val == null ? '-' : comma(val, 2))
      },
      {
        title: 'Others5\nAdder(%)',
        align: 'left',
        ...getConfigs('other5Adder', 100),
        render: (val) => (val == null ? '-' : comma(val, 2))
      },
      {
        title: 'SQI per pcs',
        align: 'left',
        ...getConfigs('formula1', 100),
        render: (val) => (val == null ? '-' : comma(val, 5))
      },
      {
        title: "Target Price's\nquotation base",
        align: 'left',
        ...getConfigs('formula2', 120),
        render: (val) => (val == null ? '-' : comma(val, 5))
      },
      {
        title: 'Clean-Sheet U/P\nwithout adder',
        align: 'left',
        ...getConfigs('formula3', 120),
        render: (val) => (val == null ? '-' : comma(val, 5))
      },
      {
        title: 'Clean-Sheet U/P\nvs Pur. U/P gap',
        align: 'left',
        ...getConfigs('formula5', 120),
        render: (val) => (val == null ? '-' : comma(val, 5))
      },
      {
        title: 'Clean-Sheet U/P\nvs Pur. U/P gap%',
        align: 'left',
        ...getConfigs('formula6', 130),
        render: (val) => (val == null ? '-' : comma(val, 5))
      },
      {
        title: 'SPEC 1',
        align: 'left',
        ...getConfigs('SPEC01', 80),
      },
      {
        title: 'SPEC 2',
        align: 'left',
        ...getConfigs('SPEC02', 80),
      },
      {
        title: 'SPEC 3',
        align: 'left',
        ...getConfigs('SPEC03', 80),
      },
      {
        title: 'SPEC 4',
        align: 'left',
        ...getConfigs('SPEC04', 80),
      },
      {
        title: 'SPEC 5',
        align: 'left',
        ...getConfigs('SPEC05', 80),
      },
      {
        title: 'SPEC 6',
        align: 'left',
        ...getConfigs('SPEC06', 80),
      },
      {
        title: 'SPEC 7',
        align: 'left',
        ...getConfigs('SPEC07', 80),
      },
      {
        title: 'SPEC 8',
        align: 'left',
        ...getConfigs('SPEC08', 80),
      },
      {
        title: 'SPEC 9',
        align: 'left',
        ...getConfigs('SPEC09', 80),
      },
      {
        title: 'SPEC 10',
        align: 'left',
        ...getConfigs('SPEC10', 80),
      },
      {
        title: 'SPEC 11',
        align: 'left',
        ...getConfigs('SPEC11', 80),
      },
      {
        title: 'SPEC 12',
        align: 'left',
        ...getConfigs('SPEC12', 100),
      },
      {
        title: 'SPEC 13',
        align: 'left',
        ...getConfigs('SPEC13', 80),
      },
      {
        title: 'SPEC 14',
        align: 'left',
        ...getConfigs('SPEC14', 80),
      },
      {
        title: 'SPEC 15',
        align: 'left',
        ...getConfigs('SPEC15', 80),
      },
      {
        title: 'SPEC 16',
        align: 'left',
        ...getConfigs('SPEC16', 80),
      },
      {
        title: 'SPEC 17',
        align: 'left',
        ...getConfigs('SPEC17', 80),
      },
      {
        title: 'SPEC 18',
        align: 'left',
        ...getConfigs('SPEC18', 120),
      },
      {
        title: 'SPEC 19',
        align: 'left',
        ...getConfigs('SPEC19', 80),
      },
      {
        title: 'SPEC 20',
        align: 'left',
        ...getConfigs('SPEC20', 80),
      },
      {
        title: 'SPEC 21',
        align: 'left',
        ...getConfigs('SPEC21', 80),
      },
      {
        title: 'SPEC 22',
        align: 'left',
        ...getConfigs('SPEC22', 80),
      },
      {
        title: 'SPEC 23',
        align: 'left',
        ...getConfigs('SPEC23', 80),
      },
      {
        title: 'SPEC 24',
        align: 'left',
        ...getConfigs('SPEC24', 80),
      },
      {
        title: 'SPEC 25',
        align: 'left',
        ...getConfigs('SPEC25', 80),
      },
      {
        title: 'SPEC 26',
        align: 'left',
        ...getConfigs('SPEC26', 80),
      },
    ]
  );
};


export default PcbResultColumn;
