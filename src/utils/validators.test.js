import { describe, it, expect } from 'vitest';
import {
  validateName,
  validateEmail,
  validateMobile,
  validateDepartment,
} from './validators';

describe('validators.js field validation utilities', () => {
  describe('validateName', () => {
    it('returns error if name is empty', () => {
      expect(validateName('')).toBe('Name is required.');
      expect(validateName('   ')).toBe('Name is required.');
      expect(validateName(null)).toBe('Name is required.');
      expect(validateName(undefined)).toBe('Name is required.');
    });

    it('returns error if name is less than 2 chars', () => {
      expect(validateName('A')).toBe('Name must be at least 2 characters.');
      expect(validateName(' ')).toBe('Name is required.');
    });

    it('returns empty string for valid name', () => {
      expect(validateName('John')).toBe('');
      expect(validateName('  Jane  ')).toBe('');
    });
  });

  describe('validateEmail', () => {
    it('returns error if email is empty', () => {
      expect(validateEmail('')).toBe('Email is required.');
      expect(validateEmail('   ')).toBe('Email is required.');
      expect(validateEmail(null)).toBe('Email is required.');
      expect(validateEmail(undefined)).toBe('Email is required.');
    });

    it('returns error for invalid email formats', () => {
      expect(validateEmail('not-an-email')).toBe('Invalid email address.');
      expect(validateEmail('foo@bar')).toBe('Invalid email address.');
      expect(validateEmail('foo@bar.')).toBe('Invalid email address.');
      expect(validateEmail('foo@.com')).toBe('Invalid email address.');
      expect(validateEmail('foo@bar.c')).toBe('Invalid email address.');
      expect(validateEmail('foo@bar,com')).toBe('Invalid email address.');
      expect(validateEmail('foo@bar..com')).toBe('Invalid email address.');
    });

    it('returns empty string for valid email', () => {
      expect(validateEmail('john@example.com')).toBe('');
      expect(validateEmail('JOHN@EXAMPLE.COM')).toBe('');
      expect(validateEmail('john.doe+test@sub.domain.co.uk')).toBe('');
      expect(validateEmail('  jane@hirehub.io  ')).toBe('');
    });
  });

  describe('validateMobile', () => {
    it('returns empty string if mobile is empty', () => {
      expect(validateMobile('')).toBe('');
      expect(validateMobile('   ')).toBe('');
      expect(validateMobile(null)).toBe('');
      expect(validateMobile(undefined)).toBe('');
    });

    it('returns error if mobile has less than 7 digits', () => {
      expect(validateMobile('123')).toBe('Mobile number must be at least 7 digits.');
      expect(validateMobile('123456')).toBe('Mobile number must be at least 7 digits.');
      expect(validateMobile('12 34 56')).toBe('Mobile number must be at least 7 digits.');
      expect(validateMobile('+1-23-456')).toBe('Mobile number must be at least 7 digits.');
    });

    it('returns empty string for valid mobile numbers', () => {
      expect(validateMobile('1234567')).toBe('');
      expect(validateMobile('123 456 7890')).toBe('');
      expect(validateMobile('+1 (234) 567-8901')).toBe('');
      expect(validateMobile('0987654321')).toBe('');
      expect(validateMobile('   1234567890   ')).toBe('');
    });
  });

  describe('validateDepartment', () => {
    it('returns error if department is empty', () => {
      expect(validateDepartment('')).toBe('Department/Position is required.');
      expect(validateDepartment('   ')).toBe('Department/Position is required.');
      expect(validateDepartment(null)).toBe('Department/Position is required.');
      expect(validateDepartment(undefined)).toBe('Department/Position is required.');
    });

    it('returns error if department is less than 2 chars', () => {
      expect(validateDepartment('A')).toBe('Department/Position must be at least 2 characters.');
      expect(validateDepartment(' ')).toBe('Department/Position is required.');
    });

    it('returns empty string for valid department', () => {
      expect(validateDepartment('Engineering')).toBe('');
      expect(validateDepartment('HR')).toBe('');
      expect(validateDepartment('  Marketing  ')).toBe('');
    });
  });
});