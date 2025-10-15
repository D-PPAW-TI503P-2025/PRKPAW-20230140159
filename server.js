const express = require('express');
const app = express();
const port = 3001; 

// Middleware wajib
app.use(express.json());

app.use('/api/books', require('./books'));


// Data dummy
let books = [
    { id: 1, title: 'Laskar Pelangi', author: 'Andrea Hirata' },
    // ... data lainnya
];

// --- Mulai Route CRUD, TIDAK PERLU router.get, langsung app.get ---
// GET all books
app.get('/api/books', (req, res) => { // Perhatikan, menggunakan app.get
    res.json(books);
});

// CREATE new book
app.post('/api/books', (req, res) => { // Perhatikan, menggunakan app.post
    // ... logika POST
});

// ... lanjutkan dengan app.put, app.delete, dll.

// Jalankan Server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});