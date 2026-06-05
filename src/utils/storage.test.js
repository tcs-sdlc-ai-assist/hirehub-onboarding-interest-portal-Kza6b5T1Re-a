import { describe, it, expect, beforeEach } from 'vitest';
import {
  getSubmissions,
  saveSubmissions,
  addSubmission,
  updateSubmission,
  deleteSubmission,
  isEmailDuplicate,
} from './storage';

const STORAGE_KEY = 'hirehub_applications';

function seed(submissions) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
}

describe('storage.js localStorage CRUD helpers', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('getSubmissions returns empty array if nothing stored', () => {
    expect(getSubmissions()).toEqual([]);
  });

  it('getSubmissions returns empty array if corrupted data', () => {
    localStorage.setItem(STORAGE_KEY, 'not-a-json');
    expect(getSubmissions()).toEqual([]);
  });

  it('getSubmissions returns array if valid', () => {
    const arr = [
      { name: 'A', email: 'a@x.com', position: 'Dev', submittedAt: '2024-06-01T12:00:00Z' },
      { name: 'B', email: 'b@x.com', position: 'Designer', submittedAt: '2024-06-02T12:00:00Z' },
    ];
    seed(arr);
    expect(getSubmissions()).toEqual(arr);
  });

  it('saveSubmissions stores array and getSubmissions retrieves it', () => {
    const arr = [
      { name: 'C', email: 'c@x.com', position: 'QA', submittedAt: '2024-06-03T12:00:00Z' },
    ];
    expect(saveSubmissions(arr)).toBe(true);
    expect(getSubmissions()).toEqual(arr);
  });

  it('saveSubmissions returns false if storage fails', () => {
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = () => { throw new Error('fail'); };
    expect(saveSubmissions([{ name: 'D', email: 'd@x.com', position: 'Dev' }])).toBe(false);
    localStorage.setItem = originalSetItem;
  });

  it('addSubmission adds to storage', () => {
    const sub = { name: 'E', email: 'e@x.com', position: 'PM', submittedAt: '2024-06-04T12:00:00Z' };
    expect(addSubmission(sub)).toBe(true);
    expect(getSubmissions()).toEqual([sub]);
    // Add another
    const sub2 = { name: 'F', email: 'f@x.com', position: 'Dev', submittedAt: '2024-06-05T12:00:00Z' };
    expect(addSubmission(sub2)).toBe(true);
    expect(getSubmissions()).toEqual([sub, sub2]);
  });

  it('addSubmission returns false if storage fails', () => {
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = () => { throw new Error('fail'); };
    expect(addSubmission({ name: 'G', email: 'g@x.com', position: 'Dev' })).toBe(false);
    localStorage.setItem = originalSetItem;
  });

  it('updateSubmission updates by email', () => {
    const arr = [
      { name: 'H', email: 'h@x.com', position: 'Dev', submittedAt: '2024-06-06T12:00:00Z' },
      { name: 'I', email: 'i@x.com', position: 'QA', submittedAt: '2024-06-07T12:00:00Z' },
    ];
    seed(arr);
    const updated = { email: 'h@x.com', name: 'Henry', position: 'Lead Dev' };
    expect(updateSubmission(updated)).toBe(true);
    const stored = getSubmissions();
    expect(stored[0].name).toBe('Henry');
    expect(stored[0].position).toBe('Lead Dev');
    expect(stored[1].name).toBe('I');
  });

  it('updateSubmission returns false if email not found', () => {
    seed([
      { name: 'J', email: 'j@x.com', position: 'Dev', submittedAt: '2024-06-08T12:00:00Z' },
    ]);
    expect(updateSubmission({ email: 'notfound@x.com', name: 'Jack' })).toBe(false);
  });

  it('updateSubmission returns false if storage fails', () => {
    seed([
      { name: 'K', email: 'k@x.com', position: 'Dev', submittedAt: '2024-06-09T12:00:00Z' },
    ]);
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = () => { throw new Error('fail'); };
    expect(updateSubmission({ email: 'k@x.com', name: 'Kevin' })).toBe(false);
    localStorage.setItem = originalSetItem;
  });

  it('deleteSubmission removes by email', () => {
    const arr = [
      { name: 'L', email: 'l@x.com', position: 'Dev', submittedAt: '2024-06-10T12:00:00Z' },
      { name: 'M', email: 'm@x.com', position: 'QA', submittedAt: '2024-06-11T12:00:00Z' },
    ];
    seed(arr);
    expect(deleteSubmission('l@x.com')).toBe(true);
    const stored = getSubmissions();
    expect(stored.length).toBe(1);
    expect(stored[0].email).toBe('m@x.com');
  });

  it('deleteSubmission returns true if email not found (no-op)', () => {
    seed([
      { name: 'N', email: 'n@x.com', position: 'Dev', submittedAt: '2024-06-12T12:00:00Z' },
    ]);
    expect(deleteSubmission('notfound@x.com')).toBe(true);
    expect(getSubmissions().length).toBe(1);
  });

  it('deleteSubmission returns false if storage fails', () => {
    seed([
      { name: 'O', email: 'o@x.com', position: 'Dev', submittedAt: '2024-06-13T12:00:00Z' },
    ]);
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = () => { throw new Error('fail'); };
    expect(deleteSubmission('o@x.com')).toBe(false);
    localStorage.setItem = originalSetItem;
  });

  it('isEmailDuplicate returns true if email exists', () => {
    seed([
      { name: 'P', email: 'p@x.com', position: 'Dev', submittedAt: '2024-06-14T12:00:00Z' },
    ]);
    expect(isEmailDuplicate('p@x.com')).toBe(true);
    expect(isEmailDuplicate('P@x.com')).toBe(true); // case-insensitive
  });

  it('isEmailDuplicate returns false if email does not exist', () => {
    seed([
      { name: 'Q', email: 'q@x.com', position: 'Dev', submittedAt: '2024-06-15T12:00:00Z' },
    ]);
    expect(isEmailDuplicate('notfound@x.com')).toBe(false);
  });

  it('isEmailDuplicate returns false if storage corrupted', () => {
    localStorage.setItem(STORAGE_KEY, 'not-a-json');
    expect(isEmailDuplicate('any@x.com')).toBe(false);
  });

  it('getSubmissions returns empty array if stored value is not array', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ foo: 'bar' }));
    expect(getSubmissions()).toEqual([]);
  });
});