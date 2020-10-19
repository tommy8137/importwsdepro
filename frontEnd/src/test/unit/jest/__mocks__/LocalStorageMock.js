// class LocalStorageMock {
//   constructor() {
//     this.store = {};
//   }

//   clear() {
//     this.store = {};
//   }

//   getItem(key) {
//     return this.store[key] || null;
//   }

//   setItem(key, value) {
//     this.store[key] = value.toString();
//   }

//   removeItem(key) {
//     delete this.store[key];
//   }
// }

// global.localStorage = LocalStorageMock;

const LocalStorageMock = (() => {
  let store = {};

  return {
    getItem: jest.fn(key => store[key]),
    setItem: jest.fn((key, value) => { store[key] = value.toString(); }),
    removeItem: jest.fn((key) => { delete store[key]; }),
    clear: jest.fn(() => { store = {}; }),
  };
})();


export default LocalStorageMock;

// window.localStorage = LocalStorageMock;

