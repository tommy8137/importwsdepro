// 單純測試 karma設定有沒有正確
import { expect } from 'chai';

describe('簡單測個1+1', () => {  
  it('should calculate 1 + 1 correctly', () => {
    const expectedResult = 2;
    expect(1 + 1).to.equal(expectedResult);
  });
});