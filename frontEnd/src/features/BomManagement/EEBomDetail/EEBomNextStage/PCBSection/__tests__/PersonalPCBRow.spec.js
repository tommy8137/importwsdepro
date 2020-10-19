// Link.react.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import PersonalPCBRow from '../PersonalPCBRow';


describe('[EEBOM Detail - 個人]PCB ROW畫面', () => {
  xtest('[情境]personal submit, leader submit(with approve)。check狀態是灰色實心勾，PCB Detail是View PCB Detail', () => {
    const getState = {
      eeBomPersonalReducer: {
        PCBInfo: {
          pcbInfo: {
            pcbTotalPrice: 64.64,
            is_pcb_personal_checked: true,
            is_pcb_personal_submitted: true,
            leader_checked_status: 'approve',
            leader_submitted_status: 'approve',
            is_reject: false,
            is_bom_approved: false,
            is_pcb_approved: false,
          },
        }
      },
    };
    const props = {
      tabInfo: {
        edm_version_id: '1234'
      }
    };
    const store = global.mockStore(getState);
    const tree = renderer.create(
      <PersonalPCBRow store={store} {...props} />,
    );

    // let tree = testRenderer.toJSON();
    // console.log('tree', tree);
    const button = tree.root.findByType('button');
    expect(button.props.children).toBe('View PCB Detail');
    expect(tree.root.findByType('img').props.alt).toEqual('GreyCheck');
    // TODO submit和save應該消失
    // ROW的底色
    // const wrapper = shallow(<PersonalPCBRow store={store} {...props} />);
    // console.log('wrapper', wrapper);
  });
});
