const db = require("../app/db.js");
const Book = db.book;
const User = db.user;
const asyncMiddleware = require("express-async-handler");

exports.addOrder = asyncMiddleware(async (req, res) => {
  // Adding a book to database
  console.log("Processing func -> addOrder");
  const user = await User.findOne({
    where: { id: req.userId }
  });
  const book = await Book.findOne({
    where: { id: req.body.id }
  });
  let orders = await user.addBooks(book);
  res.status(201).send({ orders, status: "New order has been added!" });
});

exports.getAllOrders = asyncMiddleware(async (req, res) => {
  const user = await User.findAll({
    attributes: ["id", "name"],
    include: [
      {
        model: Book,
        attributes: ["id", "title"],
        through: ["userId", "bookId"]
      }
    ]
  });
  res.status(200).json({ user });
});

exports.getOrderByUserId = asyncMiddleware(async (req, res) => {
  const user = await User.findOne({
    attributes: ["id", "name"],
    include: [
      {
        model: Book,
        attributes: ["id", "title"],
        through: ["userId", "bookId"]
      }
    ],
    where: { id: req.params.id }
  });
  res.status(200).json({ user });
});
