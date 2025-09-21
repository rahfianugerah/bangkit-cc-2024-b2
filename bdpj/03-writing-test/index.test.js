import { test } from 'node:test';
import assert from 'node:assert';
import { sum } from './index.js';

test('Test 1: Menambahkan 2 Bilangan Positif', () => {
  assert.strictEqual(sum(2, 3), 5, 'Seharusnya sum(2, 3) hasilnya 5');
});

test('Test 2: Menambahkan 2 Bilangan Negatif', () => {
  assert.strictEqual(sum(-2, -3), -5, 'Seharusnya sum(-2, -3) hasilnya -5');
});

test('Test 3: Menambahkan 2 Bilangan Positif dan Negatif', () => {
  assert.strictEqual(sum(2, -3), -1, 'Seharusnya sum(2, -3) hasilnya -1');
});

test('Test 4: Menambahkan 2 Bilangan 0', () => {
  assert.strictEqual(sum(0, 0), 0, 'Seharusnya sum(0, 0) hasilnya 0');
});
