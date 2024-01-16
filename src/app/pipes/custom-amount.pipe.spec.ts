import { CustomAmountPipe } from './custom-amount.pipe';

describe('CustomAmountPipe', () => {
  it('create an instance', () => {
    const pipe = new CustomAmountPipe();
    expect(pipe).toBeTruthy();
  });
});
