import GoBackHeaderHoc from './GoBackHeaderHoc';

const Layout = (layoutName = null, options) => (component) => {
  switch (layoutName) {
    case 'goBackHeader':
      return GoBackHeaderHoc(options)(component);
    case 'noHeader':
      return component;
    default:
      return component;
  }
};

export default Layout;
