var model = require("../models/index");
const { check, validationResult } = require("express-validator");

module.exports = function(app) {

    let sudahValid = [
        check('title').isString().notEmpty().withMessage("Tidak boleh kosong").isLength({min:5}),
        check('author').isLength({min:2}).isString().notEmpty().withMessage("Tidak boleh kosong"),
        check('published_date').notEmpty().withMessage("Tidak boleh kosong").isISO8601(),
        check('pages').isNumeric().notEmpty().withMessage("Tidak boleh kosong"),
        check('language').isString().notEmpty().withMessage("Tidak boleh kosong"),
        check('publisher_id').isString().notEmpty().withMessage("Tidak boleh kosong")
    ];

    // GET users listing.
    app.get('/books', function(req, res, next) {

            model.Book.findAll({})
            .then(books =>
                res.json({
                    error: false,
                    data: books
                })
            )
            .catch(error => res.json({
                    error: true,
                    data: [],
                    error: error
                })
            );

    });

    // Get by ID
    app.get('/books/:id', function(req, res, next) {
        const book_id = req.params.id;

        model.Book.findOne({
            where: {
                id: book_id
            }
        })

        .then(books =>
            res.json({
                data: books,
                error: false,
                message: "Data Founded!",
            })
        )
        .catch(error =>
            res.json({
                error: true,
                error: error
            })
        );

    });

    // POST users
    app.post('/books', sudahValid, function(req, res, next) {
        const errors = validationResult(req);
        const { title, author, published_date, pages, language, publisher_id } = req.body;
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        model.Book.create({
            title: title,
            author: author,
            published_date: published_date,
            pages: pages,
            language: language,
            publisher_id: publisher_id
        })
        .then(book =>
            res.status(201).json({
                error: false,
                data: book,
                message: "New book has been created."
            })
        )
        .catch(error =>
            res.json({
                error: true,
                data: [],
                error: error
            })
        );
    });
    // UPDATE users
    app.patch('/books/:id', sudahValid, function(req, res, next) {

        const book_id = req.params.id;
        const { title, author, published_date, pages, language, publisher_id } = req.body;
        model.Book.update(
        {
            title: title,
            author: author,
            published_date: published_date,
            pages: pages,
            language: language,
            publisher_id: publisher_id
        },
            {
                where: {
                    id: book_id
                }
            }
        )
        .then(book =>
            res.json({
                    error: false,
                    message: "The book has been updated."
                })
            )
            .catch(error =>
                res.json({
                    error: true,
                    error: error
                })
            );

    });
    // DELETE users
    app.delete('/books/:id', function(req, res, next) {

        const book_id = req.params.id;
        model.Book.destroy({
            where: {
                id: book_id
            }
        })
        .then(books =>
            res.json({
                error: false,
                message: "The book has been delete."
            })
        )
        .catch(error =>
            res.json({
                error: true,
                error: error
            })
        );

    });

};