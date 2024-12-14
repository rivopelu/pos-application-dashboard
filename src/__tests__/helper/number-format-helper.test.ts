import { describe, expect, it } from 'vitest';
import { NumberFormatterHelper } from '../../helper/numberFormatHelper.ts';

const format = new NumberFormatterHelper();

describe('Number Formatter Helper', () => {
  it('toRupiah: should format number to Rupiah', () => {
    const num = 100000;
    const formatString = format.toRupiah(num);
    expect(formatString).toBe('Rp 100.000');
  });

  it('toRupiah: should handle 0 correctly', () => {
    const num = 0;
    const formatString = format.toRupiah(num);
    expect(formatString).toBe('0');
  });

  it('convertOneDigits: should round to 1 decimal place', () => {
    const num = 123.456;
    const result = format.convertOneDigits(num);
    expect(result).toBe(123.5);
  });

  it('convertOneDigits: should return value as is if not a number', () => {
    const value = 'test';
    const result = format.convertOneDigits(value);
    expect(result).toBe(value);
  });

  it('NumberMinifyFormatter: should format large numbers with suffix', () => {
    expect(format.NumberMinifyFormatter(1500000000)).toBe('1.5G');
    expect(format.NumberMinifyFormatter(1500000)).toBe('1.5M');
    expect(format.NumberMinifyFormatter(1500)).toBe('1.5K');
    expect(format.NumberMinifyFormatter(999)).toBe('999');
  });

  it('thousandSeparator: should format number with thousand separator', () => {
    const num = 1234567.89;
    const result = format.thousandSeparator(num);
    expect(result).toBe('1.234.567,9');
  });

  it('toPercentage: should format number to percentage', () => {
    const num = 12.3456;
    const result = format.toPercentage(num);
    expect(result).toBe('12,3%');
  });

  it('toIdrFormat: should format number to IDR format', () => {
    const num = 1234567.89;
    const result = format.toIdrFormat(num);
    expect(result).toBe('IDR 1.234.567,9');
  });

  it('sumArrayNumber: should sum all numbers in array', () => {
    const data = [1, 2, 3, 4, 5];
    const result = format.sumArrayNumber(data);
    expect(result).toBe(15);
  });

  it('sumArrayNumber: should return 0 for empty array', () => {
    const data: number[] = [];
    const result = format.sumArrayNumber(data);
    expect(result).toBe(0);
  });

  it('calculateTaxPercentage: should calculate tax percentage', () => {
    const price = 1000;
    const result = format.calculateTaxPercentage(price);
    expect(result).toBe(110);
  });

  it('calculateTaxPercentage: should return 0 if price is 0', () => {
    const price = 0;
    const result = format.calculateTaxPercentage(price);
    expect(result).toBe(0);
  });
});
