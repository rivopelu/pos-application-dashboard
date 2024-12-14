import { describe, expect, it } from 'vitest';
import { NumberFormatterHelper } from '../helper/numberFormatHelper.ts';

const format = new NumberFormatterHelper();

describe('Number Format Helper', () => {
  it('should testing', () => {
    const num = 100000;
    const formatString = format.toRupiah(num);
    expect(formatString).toBe('Rp 100.000');
  });
});
