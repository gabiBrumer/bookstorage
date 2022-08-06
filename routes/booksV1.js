const express = require('express');
const router = express.Router();
const booksV1Controller = require('../controllers/booksV1Controller');

router.get('/books', booksV1Controller.showAllBooks);

router.post('/books', booksV1Controller.createABook);

router.get('/books/:id', booksV1Controller.showOneBook);

// router.put('/books/:id/edit', booksV1Controller.updateABook);
router.put('/books/:id', booksV1Controller.updateABook);

router.delete('/books/:id', booksV1Controller.destroyABook);

module.exports = router;