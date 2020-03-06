const verifySignUp = require("./verifySignUp");
const authJwt = require("./verifyJwtToken");
const authController = require("../controller/authController.js");
const userController = require("../controller/userController.js");
const articleController = require("../controller/articleController.js");
const commentController = require("../controller/commentController.js");

module.exports = function(app) {
  // ----- Auth -----
  // register
  app.post(
    "/register",
    [verifySignUp.checkDuplicateUserNameOrEmail],
    authController.signup
  );
  //login
  app.post("/login", authController.signin);

  // ----- User -----
  // get all user
  app.get(
    "/users",
    [authJwt.verifyToken, authJwt.isAdmin],
    userController.users
  );
  // get user by id
  app.get(
    "/users/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    userController.oneUser
  );
  // update user status
  app.put(
    "/users/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    userController.updateStatus
  );
  // delete user
  app.delete(
    "/users/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    userController.deleteUser
  );

  // ----- Article -----
  // adding an article
  app.post("/articles", [authJwt.verifyToken], articleController.addArticle);

  // getting all articles
  app.get("/articles", articleController.getAllArticles);

  // get article by id
  app.get("/articles/:id", articleController.getArticleById);

  // get article by user id
  app.get(
    "/articles/user/:id",
    [authJwt.verifyToken],
    articleController.getArticleByUserId
  );

  // update an article
  app.put(
    "/articles/:id",
    [authJwt.verifyToken],
    articleController.updateStatus
  );

  // delete an article
  app.delete(
    "/articles/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    articleController.deleteArticle
  );

  // ----- Comment -----
  // Adding a comment
  app.post(
    "/comments/:id",
    [authJwt.verifyToken],
    commentController.addComment
  );
  // Update comment status
  app.put(
    "/comments/:id",
    [authJwt.verifyToken],
    commentController.updateCommentStatus
  );
  // Get all comments
  app.get("/comments", commentController.getAllComments);
  // Get all comments based on article_id
  app.get("/comments/:id", commentController.getCommentsByArticleId);
  // Delete comment
  app.delete("/comments/:id", commentController.deleteComment);

  // ---- SEARCH HANDLER ----
  app.get(
    "/articles/search",
    [authJwt.verifyToken],
    articleController.searchArticle
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
