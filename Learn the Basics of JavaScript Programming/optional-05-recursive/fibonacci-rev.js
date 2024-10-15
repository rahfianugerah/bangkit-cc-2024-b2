function fibonacci(n) {
    if (n === 0) return 0;  // Kasus dasar
    if (n === 1) return 1;  // Kasus dasar

    let a = 0;
    let b = 1;
    let fib;

    for (let i = 2; i <= n; i++) {
        fib = a + b;  // Hitung nilai Fibonacci berikutnya
        a = b;        // Geser nilai
        b = fib;      // Geser nilai
    }

    return fib;
}

// Jangan hapus kode di bawah ini!
export default fibonacci;
