import uuidv4 from 'uuid/v4';

const fakeType1Menus = () => {
  return [...Array(20).keys()].map((item, i) => {
    return {
      id: i,
      type1: `type1-${i}`,
      category: 1,
      used_on: 1
    };
  });
};
const fakeProductTypeMenus = () => {
  return [...Array(20).keys()].map((item, i) => {
    return {
      id: i,
      product_type: `product_type-${i}`
    };
  });
};
const fakeEEbomList = () => {
  const items = [...Array(5).keys()].map(item => {
    return {
      type1: `TypeI ${item}`,
      type2: 'Schotky Diode, Zender Diode, SW Diode, Bridge Diode, Rectifier, ESD/TVS, Schotky Diode, Zender Diode, SW Diode, Bridge Diode, Rectifier, ESD/TVS',
      pic: `Alexis Luan${item}`,
      proxy: `Alfred Wang${item}`,
      pic_emplid: `1000${item}`,
      proxy_emplid: `1030${item}`
    };
  });
  return {
    isEditable: true,
    list: items
  };
};

const fakeXraySpecList = () => {
  const items = [...Array(30).keys()].map(item => {
    return {
      spec_no: `${item + 1}`,
      title: '是否為緯創製造是否為緯創製造是否為緯創製造是否為緯創製造是否為緯創製造是否為緯創製造是否為緯創製造',
      edit_by: 'JIN CHIU',
      edit_time: '2019-12-25 13:30',
    };
  });
  return {
    isEditable: true,
    list: items
  };
};


const fakeAccountList = () => {
  const list = [...Array(10).keys()].map((item) => {
    return {
      name_a: 'Ming M Huang',
      emplid: `1000000${item}`,
      email_address: `wi_${item}@wistron.com`,
      phone: `12${item}`,
      role_group: 'CE',
      role_name: 'ME/EE',
      is_contact_window: true
    };
  });
  return {
    userInfo: {
      numberOfUser: 10,
      userList: list
    }
  };
};

// role management
const fakeCreateRole = (info) => {
  return uuidv4();
};

const fakeGetRoles = () => {
  return [
    {
      roleGroup: 'ce',
      roles: [{
        isDefault: true,
        role: 'me'
      }, {
        isDefault: false,
        role: 'leader'
      }],
      isDefault: true
    },
    {
      roleGroup: 'aaaaa',
      roles: [{
        isDefault: true,
        role: 'me'
      }, {
        isDefault: false,
        role: 'leader'
      }],
      isDefault: false
    },
  ];
};

const fakeGetPolicy = () => {
  return {
    policies: [
      {
        policyId: '1',
        label: 'Bom List',
      },
      {
        policyId: '2',
        label: 'Bom List A',
        require: '1'
      },
      {
        policyId: '3',
        label: 'Bom List A',
        require: '1'
      },
    ],
    allow: {
      1: ['ce:me', 'ce:me_ee'],
      2: ['ce:me']
    },
    deny: {
      3: ['ce:me'],
    }
  };
};

export default {
  fakeEEbomList,
  fakeXraySpecList,
  fakeAccountList,

  // role management
  fakeCreateRole,
  fakeGetRoles,
  fakeGetPolicy,
  // all account
  fakeType1Menus

};
