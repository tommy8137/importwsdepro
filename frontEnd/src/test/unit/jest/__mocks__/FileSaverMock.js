import FileSaver from 'file-saver';

jest.mock('file-saver', () => ({ saveAs: jest.fn() }));
