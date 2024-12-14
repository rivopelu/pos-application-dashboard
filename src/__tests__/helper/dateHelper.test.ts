import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import DateHelper from '../../helper/dateHelper.ts';

const dateHelper = new DateHelper();

describe('Date Helper Test', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2024, 11, 25, 10, 0, 0)); // Set default time to Dec 25, 2024, 10:00am
  });

  afterEach(() => {
    vi.useRealTimers(); // Restore real timers after each test
  });

  it('yyyy-MM-dd test', () => {
    expect(dateHelper.toFormatDate(new Date(), 'yyyy-MM-dd')).toEqual('2024-12-25');
  });

  it('do MMM yyyy test', () => {
    expect(dateHelper.toFormatDate(new Date(), 'do MMM yyyy')).toEqual('25th Dec 2024');
  });

  it('yyyy - MM - dd test', () => {
    expect(dateHelper.toFormatDate(new Date(), 'yyyy - MM - dd')).toEqual('2024 - 12 - 25');
  });

  it('do MMM test', () => {
    expect(dateHelper.toFormatDate(new Date(), 'do MMM')).toEqual('25th Dec');
  });

  it('LLL dd, yyyy test', () => {
    expect(dateHelper.toFormatDate(new Date(), 'LLL dd, yyyy')).toEqual('Dec 25, 2024');
  });

  it('dd LLLL, yyyy test', () => {
    expect(dateHelper.toFormatDate(new Date(), 'dd LLLL, yyyy')).toEqual('25 December, 2024');
  });

  it('dd LLLL, yyyy - HH:mm test', () => {
    expect(dateHelper.toFormatDate(new Date(), 'dd LLLL, yyyy - HH:mm')).toEqual('25 December, 2024 - 10:00');
  });

  it('dd MMMM yyyy test', () => {
    expect(dateHelper.toFormatDate(new Date(), 'dd MMMM yyyy')).toEqual('25 December 2024');
  });

  it('dd MMM test', () => {
    expect(dateHelper.toFormatDate(new Date(), 'dd MMM')).toEqual('25 Dec');
  });

  it('MMM dd, yyyy test', () => {
    expect(dateHelper.toFormatDate(new Date(), 'MMM dd, yyyy')).toEqual('Dec 25, 2024');
  });

  it('dd LLL yyyy test', () => {
    expect(dateHelper.toFormatDate(new Date(), 'dd LLL yyyy')).toEqual('25 Dec 2024');
  });

  it('dd MMMM test', () => {
    expect(dateHelper.toFormatDate(new Date(), 'dd MMMM')).toEqual('25 December');
  });

  it('yyyy-MM-dd HH:mm:ss test', () => {
    expect(dateHelper.toFormatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')).toEqual('2024-12-25 10:00:00');
  });
});