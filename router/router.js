const verifySignUp = require("./verifySignUp");
const authJwt = require("./verifyJwtToken");
const authController = require("../controller/authController.js");
const userController = require("../controller/userController.js");
const bookController = require("../controller/bookController.js");
const orderController = require("../controller/orderController.js");

module.exports = function(app) {
  // Auth
  app.post(
    "/register",
    [
      verifySignUp.checkDuplicateUserNameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    authController.signup
  );
  app.post("/login", authController.signin);

  // get all user
  app.get("/users", [authJwt.verifyToken], userController.users);

  // get 1 user according to roles
  app.get("/api/test/user", [authJwt.verifyToken], userController.userContent);
  app.get(
    "/api/test/pm",
    [authJwt.verifyToken, authJwt.isPmOrAdmin],
    userController.managementBoard
  );
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    userController.adminBoard
  );

  // adding a book
  app.post(
    "/books",
    [authJwt.verifyToken, authJwt.isAdmin],
    bookController.addBook
  );
  // get all book
  app.get("/books", [authJwt.verifyToken], bookController.getAllBooks);
  // get a book
  app.get("/books/:id", [authJwt.verifyToken], bookController.getOneBook);
  // delete a book
  app.delete(
    "/books/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    bookController.deleteBook
  );
  // update a book
  app.put(
    "/books/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    bookController.updateBook
  );

  // adding orders
  app.post("/orders", [authJwt.verifyToken], orderController.addOrder);
  // get all orders
  app.get("/orders", [authJwt.verifyToken], orderController.getAllOrders);
  // get one orders
  app.get(
    "/orders/:id",
    [authJwt.verifyToken],
    orderController.getOrderByUserId
  );

  // error handler 404
  app.use(function(req, res, next) {
    return res.status(404).send({
      status: 404,
      message: "Not Found"
    });
  });

  // error handler 500
  app.use(function(err, req, res, next) {
    return res.status(500).send({
      error: err
    });
  });
};
