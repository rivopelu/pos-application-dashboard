import { describe, expect, it } from 'vitest';
import { convertObjToQueryParam, defaultPaginationObj, defaultPaginationType } from '../../helper/paginationHelper.ts';

describe('Query Helper Test', () => {
  describe('convertObjToQueryParam', () => {
    it('should convert object to query string with valid key-value pairs', () => {
      const obj = { page: 1, size: 10, query: 'test' };
      const result = convertObjToQueryParam(obj);
      expect(result).toBe('?page=1&size=10&query=test');
    });

    it('should handle special characters correctly', () => {
      const obj = { query: 'hello world', filter: 'type:basic' };
      const result = convertObjToQueryParam(obj);
      expect(result).toBe('?query=hello%20world&filter=type%3Abasic');
    });

    it('should exclude keys with undefined or null values', () => {
      const obj = { page: 1, size: undefined, query: null };
      const result = convertObjToQueryParam(obj);
      expect(result).toBe('?page=1');
    });

    it('should return "?" if object is empty', () => {
      const obj = {};
      const result = convertObjToQueryParam(obj);
      expect(result).toBe('?');
    });

    it('should handle numeric and boolean values correctly', () => {
      const obj = { page: 2, size: 5, active: true };
      const result = convertObjToQueryParam(obj);
      expect(result).toBe('?page=2&size=5&active=true');
    });
  });

  describe('defaultPaginationObj', () => {
    it('should have default values for size and page', () => {
      expect(defaultPaginationObj).toEqual({ size: 10, page: 0 });
    });

    it('should allow optional fields like type, sub_type, and query', () => {
      const paginationObj: defaultPaginationType = {
        ...defaultPaginationObj,
        type: 'basic',
        sub_type: 'advanced',
        query: 'search'
      };
      expect(paginationObj).toEqual({
        size: 10,
        page: 0,
        type: 'basic',
        sub_type: 'advanced',
        query: 'search'
      });
    });
  });
});