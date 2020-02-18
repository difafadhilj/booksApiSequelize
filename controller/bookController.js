const db = require("../app/db.js");
const Book = db.book;
const asyncMiddleware = require("express-async-handler");

function isValid() {
  return [
    check("title")
      .isString()
      .notEmpty()
      .withMessage("Tidak boleh kosong")
      .isLength({ min: 5 }),
    check("author")
      .isLength({ min: 2 })
      .isString()
      .notEmpty()
      .withMessage("Tidak boleh kosong"),
    check("published_date")
      .notEmpty()
      .withMessage("Tidak boleh kosong")
      .isISO8601(),
    check("pages")
      .isNumeric()
      .notEmpty()
      .withMessage("Tidak boleh kosong"),
    check("language")
      .isString()
      .notEmpty()
      .withMessage("Tidak boleh kosong"),
    check("publisher_id")
      .isString()
      .notEmpty()
      .withMessage("Tidak boleh kosong")
  ];
}

exports.addBook = asyncMiddleware(async (req, res) => {
  isValid();
  // Adding a book to database
  console.log("Processing func -> addBook");
  await Book.create({
    id: req.body.id,
    title: req.body.title,
    author: req.body.author,
    published_date: req.body.published_date,
    pages: req.body.pages,
    language: req.body.language,
    publisher_id: req.body.publisher_id
  });

  res.status(201).send({
    status: "New book has been added!"
  });
});

exports.updateBook = asyncMiddleware(async (req, res) => {
  // Updating a book
  console.log("Processing func -> update");
  await Book.update(
    {
      id: req.body.id,
      title: req.body.title,
      author: req.body.author,
      published_date: req.body.published_date,
      pages: req.body.pages,
      language: req.body.language,
      publisher_id: req.body.publisher_id
    },
    { where: { id: req.params.id } }
  );
  res.status(201).send({
    status: "A book has been updated!"
  });
});

exports.getAllBooks = asyncMiddleware(async (req, res) => {
  const book = await Book.findAll({
    attributes: [
      "id",
      "title",
      "author",
      "published_date",
      "pages",
      "language",
      "publisher_id"
    ]
  });
  res.status(200).json({
    description: "All Book",
    book: book
  });
});

exports.getOneBook = asyncMiddleware(async (req, res) => {
  const book = await Book.findOne({
    where: { id: req.params.id }
  });
  if (!book) {
    return res.status(404).send({
      reason: "Book Not Found!"
    });
  }
  res.status(200).json({
    description: "Book Founded!",
    book: book
  });
});

exports.deleteBook = asyncMiddleware(async (req, res) => {
  const book = await Book.destroy({
    where: { id: req.params.id }
  });
  if (!book) {
    return res.status(404).send({
      reason: "Book Not Found!"
    });
  }
  res.status(200).json({
    description: "Book Deleted!",
    book: book
  });
});
