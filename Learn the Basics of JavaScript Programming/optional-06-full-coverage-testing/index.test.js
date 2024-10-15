import { test } from 'node:test';
import assert from 'node:assert';
import sum from './index.js';

// Fungsi untuk membulatkan angka desimal ke 10 angka di belakang koma
function roundToDecimals(number, decimals = 10) {
    return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

// Skenario 1: Menguji penjumlahan dua bilangan positif
test('Penjumlahan 2 Angka Positif', () => {
  assert.strictEqual(sum(3, 5), 8);
  assert.strictEqual(sum(10, 20), 30);
});

// Skenario 2: Menguji penjumlahan dengan salah satu bilangan negatif
test('Penjumlahan Campuran Angka Positif dan Negatif', () => {
  assert.strictEqual(sum(-3, 5), 0);
  assert.strictEqual(sum(3, -5), 0);
  assert.strictEqual(sum(-3, -5), 0);
});

// Skenario 3: Menguji penjumlahan dua bilangan 0
test('Penjumlahan 2 Angka 0', () => {
  assert.strictEqual(sum(0, 0), 0);
});

// Skenario 4: Menguji penjumlahan dengan salah satu bilangan non-numerik (string, null, undefined, dll.)
test('sum with non-number inputs', () => {
  assert.strictEqual(sum('3', 5), 0); // string sebagai masukan (input)
  assert.strictEqual(sum(3, '5'), 0); // string sebagai masukan (input)
  assert.strictEqual(sum(null, 5), 0); // null sebagai masukan (input)
  assert.strictEqual(sum(3, undefined), 0); // undefined sebagai masukan (input)
  assert.strictEqual(sum({}, 5), 0); // object sebagai masukan (input)
  assert.strictEqual(sum(3, []), 0); // array sebagai masukan (input)
});

// Skenario 5: Menguji penjumlahan dengan bilangan desimal
test('Penjumlahan 2 Angka Desimal', () => {
  assert.strictEqual(roundToDecimals(sum(2.5, 3.1)), 5.6);
  assert.strictEqual(roundToDecimals(sum(0.1, 0.2)), 0.3);
});

// Skenario 6: Menguji penjumlahan bilangan besar
test('Penjumlahan Dengan Jumlah Angka Besar', () => {
  assert.strictEqual(sum(1000000, 2000000), 3000000);
});

// Skenario 7: Menguji penjumlahan salah satu bilangan adalah 0
test('Penjumlahan Dengan 1 Angka 0', () => {
  assert.strictEqual(sum(0, 5), 5);
  assert.strictEqual(sum(5, 0), 5);
});
