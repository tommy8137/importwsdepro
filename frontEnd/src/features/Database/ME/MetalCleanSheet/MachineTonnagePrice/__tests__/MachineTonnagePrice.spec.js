import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import MachineTonnagePrice from '../MachineTonnagePrice';


test('Table會顯示工程模和連續模', async () => {
  /*eslint-disable */
  const store = global.mockStore({
    metalCleanSheet: {
      machineTonnagePrice: {
        "date": {
          "last": '2019/01/01',
          "lastId": 1,
          "current": '2019/06/01',
          "currentId": 2,
          "next": '2019/12/01',
          "nextId": 3,
        },
        datalist: [
          {
            "id": "2eb48fc0-e5bf-11e9-af51-0242ac110002",
            "ton:": "0T",
            "pressTypeId": "2eb48fc0-e5bf-11e9-af51-0242ac110002",
            "pressTypeName": "工程模",
            "bloster": null,
            "remark": null,
            "module_1": {
              "moduleMetalId": "c1cd9a76-e642-11e9-9d04-0242ac110002",
              "last": 5.00,
              "current": 2.5,
              "next": 1.5,
            },
            "module_2": {
              "moduleMetalId": "c1cd9a76-e642-11e9-9d04-0242ac110002",
              "last": 5.00,
              "current": 2.5,
              "next": 1.5,
            }
          }
        ]
      }
    }
  });
  /* eslint-enable */


  const { queryByText } = render(<Provider store={store}><MachineTonnagePrice /></Provider>);
  const element1 = queryByText('工程模');
  expect(element1).toBeInTheDocument();
  expect(element1).toHaveClass('custom-colspan');
  const element2 = queryByText('連續模');
  expect(element2).toBeInTheDocument();
  expect(element2).toHaveClass('custom-colspan');
});
