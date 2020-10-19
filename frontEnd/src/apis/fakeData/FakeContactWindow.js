const fakeGroup = () => {
  const RdMe = [...Array(20).keys()].map(item => {
    return {
      name: `Alexander J Lin${item}`,
      emplid: `107000${item}`,
      email: `Alexander J Lin${item}@wistron.com`,
      extension: `000${item}`,
      isCe: false,
      isRd: true,
      isSourcer: false,
      isPm: false,
      isAccount: false,
      isMe: true,
      isEe: false,
      isMeTmFm: false,
      isContactWindow: true,
    };
  });
  const RdEe = [...Array(5).keys()].map(item => {
    return {
      name: 'Alexe Wang',
      emplid: `105000${item}`,
      email: `Alexe Wang${item}@wistron.com`,
      extension: `000${item}`,
      isCe: false,
      isRd: true,
      isSourcer: false,
      isPm: false,
      isAccount: false,
      isMe: false,
      isEe: false,
      isMeTmFm: true,
      isContactWindow: true,
    };
  });
  return {
    contactWindow: [
      { name: 'RD', type: 'ME', list: RdMe },
      { name: 'RD', type: 'ME TM/FM', list: RdEe }
    ]
  };
};

export default {
  fakeGroup,
};

