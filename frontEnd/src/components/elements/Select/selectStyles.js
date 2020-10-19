
const selectStyles = {
  menu: (provided, state) => ({
    ...provided,
    position: 'relative',
    borderTop: '1px solid #808080',
    overflowY: 'auto',
    borderRadius: 0,
    margin: 0,
  }),
  control: provided => ({
    ...provided,
    // minWidth: '12.625rem',
    padding: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  }),
  option: (provided, state) => {
    // console.log(`----------- ${state.children} -----------`);
    // console.log(`[${state.children}]::::: option_provided :`, provided);
    // console.log(`[${state.children}]::::: option_state :`, state);

    return ({
      ...provided,
      ':active': {
        backgroundColor: '#00A99D',
      },
      color: state.isFocused ? '#FFFFFF' : '#333333',
      backgroundColor: state.isFocused ? '#00A99D' : '#FFFFFF',
      wordBreak: 'break-all',
    });
  },
  menuList: (provided) => ({
    ...provided,
    position: 'relative',
    maxHeight: '10rem',
  }),
};

export default selectStyles;
