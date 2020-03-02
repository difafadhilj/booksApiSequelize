const db = require("../app/db.js");
const Comment = db.comment;
const asyncMiddleware = require("express-async-handler");

exports.addComment = asyncMiddleware(async (req, res) => {
  console.log("Processing func -> addComment");
  await Comment.create({
    content: req.body.content,
    status: true,
    user_id: req.userId,
    article_id: req.params.id
  });
  if (res.status(201)) {
    res.status(201).send({
      status: "Comment added!"
    });
  } else {
    res.send({ error: error });
  }
});

exports.updateCommentStatus = asyncMiddleware(async (req, res) => {
  await Comment.update({ status: false }, { where: { id: req.params.id } });
  if (res.status(200)) {
    res.status(200).json({ msg: "Comment updated!" });
  } else {
    res.send({ error });
  }
});
