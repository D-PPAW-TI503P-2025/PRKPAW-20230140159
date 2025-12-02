const express = require('express');
const router = express.Router();

let books = [
    { id: 1, title: 'Laskar Pelangi', author: 'Andrea Hirata' },
    { id: 2, title: 'Bumi Manusia', author: 'Pramoedya Ananta Toer' }
];

// GET all books
router.get('/', (req, res) => {
    res.json(books);
});

// GET book by ID
router.get('/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
});

// CREATE new book
router.post('/', (req, res) => {
    const { title, author } = req.body;
    if (!title || !author) {
        return res.status(400).json({ message: 'Title and author are required' });
    }
    const newBook = {
        id: books.length + 1,
        title,
        author
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

// UPDATE book
router.put('/:id', (req, res) => {
    const { title, author } = req.body;
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: 'Book not found' });

    if (!title || !author) {
        return res.status(400).json({ message: 'Title and author are required' });
    }

    book.title = title;
    book.author = author;
    res.json(book);
});

// DELETE book
router.delete('/:id', (req, res) => {
    const index = books.findIndex(b => b.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Book not found' });
    const deleted = books.splice(index, 1);
    res.json(deleted[0]);
});

module.exports = router;