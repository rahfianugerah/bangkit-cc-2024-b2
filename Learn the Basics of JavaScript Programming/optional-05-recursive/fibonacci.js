function fibonacci(n) {
    // Basis kasus: jika n adalah 0, kembalikan 0; jika n adalah 1, kembalikan 1
    if (n === 0) {
        return 0;
    } else if (n === 1) {
        return 1;
    }
    // Rekursi: fibonacci dari (n-1) + fibonacci dari (n-2)
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Jangan hapus kode di bawah ini!
export default fibonacci;
