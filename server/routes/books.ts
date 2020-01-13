var express = require('express');
var router = express.Router();

const book1 = {
  title: 'Villette',
  author: 'Charlotte Brontë',
  cover: 'https://covers.openlibrary.org/b/olid/OL3948363M-M.jpg',
  link: 'https://openlibrary.org/works/OL1095426W/Villette',
};

const book2 = {
  title: 'Bug',
  author: 'by DK Publishing',
  cover: 'https://covers.openlibrary.org/w/id/504088-M.jpg',
  link: 'https://openlibrary.org/books/OL7994470M/Bug',
};

/* GET books listing. */
router.get('/', function(req, res, next) {
  res.json({
    books: [book1, book2],
  });
});

module.exports = router;
