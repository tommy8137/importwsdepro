

let whiteTheme = {
  normal: {
    fill: '#fff',
    opacity: 1
  },
  hover: {
    fill: '#f2f2f2',
    opacity: 1
  },
  press: {
    fill: '#fff',
    opacity: 1
  },
  disable: {
    fill: '#fff',
    opacity: 0.2
  }
};


let blackTheme = {
  normal: {
    fill: '#333',
    opacity: 1
  },
  hover: {
    fill: '#555',
    opacity: 1
  },
  press: {
    fill: '#1e1e1e',
    opacity: 1
  },
  disable: {
    fill: '#333',
    opacity: 0.2
  }
};

// white | black
function getTheme(theme = 'black') {
  switch (theme) {
    case 'white':
      return whiteTheme;
    case 'black':
      return blackTheme;
    default:
      return blackTheme;
  }
}


export default getTheme;
