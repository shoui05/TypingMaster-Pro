import test from 'node:test';
import assert from 'node:assert/strict';
import { validate } from '../api/leaderboard.js';

test('accepts a valid score', () => {
  assert.deepEqual(validate({ name: 'Shouib', wpm: 72.4, acc: 96, secs: 60 }), { name: 'Shouib', wpm: 72, acc: 96 });
});
test('rejects impossible WPM', () => assert.ok(validate({ name: 'abc', wpm: 900, acc: 99, secs: 60 }).error));
test('rejects tiny tests', () => assert.ok(validate({ name: 'abc', wpm: 80, acc: 99, secs: 5 }).error));
test('strips unsafe characters from names', () => assert.equal(validate({ name: '<b>Neo</b>', wpm: 50, acc: 90, secs: 60 }).name, 'bNeob'));
