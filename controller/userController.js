const db = require("../app/db.js");
const User = db.user;
const asyncMiddleware = require("express-async-handler");

exports.users = asyncMiddleware(async (req, res) => {
  const user = await User.findAll();
  res.status(200).json(user);
});

exports.oneUser = asyncMiddleware(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.userId }
  });
  if (res.status(200)) {
    res.status(200).json({
      description: "User Content Page",
      user
    });
  } else {
    res.send({
      error: error
    });
  }
});

exports.deleteUser = asyncMiddleware(async (req, res) => {
  await User.destroy({
    where: { id: req.params.id }
  });
  if (res.status(200)) {
    res.status(200).json({
      msg: "User successfully deleted!"
    });
  } else {
    res.send({
      error: error
    });
  }
});

exports.updateStatus = asyncMiddleware(async (req, res) => {
  // Updating user status
  console.log("Processing func -> update");
  await User.update(
    { status: req.body.status },
    { where: { id: req.params.id } }
  );
  if (res.status(201)) {
    res.status(201).send({
      status: "This user has been released!"
    });
  } else {
    res.send({
      error: error
    });
  }
});

exports.adminBoard = asyncMiddleware(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.userId }
  });
  res.status(200).json({
    description: "Admin Board",
    user
  });
});
