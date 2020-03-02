const db = require("../app/db.js");
const config = require("../app/config.js");
const User = db.user;
const asyncMiddleware = require("express-async-handler");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

emailHandler = () => {
  let sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(
    "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"
  );

  let msg = {
    to: "dfjknight55@gmail.com",
    from: "dfjknight55@gmail.com",
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>"
  };
  sgMail.send(msg, (error, result) => {
    if (error) res.send({ error: error });
    else
      res.status(201).send({ status: "User registered successfully!", user });
  });
  sgMail.send(msg);
};

exports.signup = asyncMiddleware(async (req, res) => {
  // Save User to Database
  console.log("Processing func -> SignUp");
  let user = await User.create({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    admin: req.body.admin,
    status: req.body.status
  });
  if (res.status(201)) {
    res.status(201).send({ status: "User registered successfully!", user });
  } else {
    res.send({ error: error });
  }
});

exports.signin = asyncMiddleware(async (req, res) => {
  console.log("Sign-In");
  const user = await User.findOne({
    where: {
      username: req.body.username
    }
  });
  if (!user) {
    return res.status(404).send({
      auth: false,
      accessToken: null,
      reason: "User Not Found!"
    });
  }
  const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
  if (!passwordIsValid) {
    return res.status(401).send({
      auth: false,
      accessToken: null,
      reason: "Invalid Password!"
    });
  }

  const token = jwt.sign({ id: user.id }, config.secret, {
    expiresIn: 86400 // expires in 24 hours
  });

  if (user.status) {
    res.status(200).send({
      id: user.id,
      auth: true,
      type: "Bearer",
      accessToken: token,
      msg: "Login Successfully!"
    });
  } else {
    res.status(401).send({ msg: "Account blocked!" });
  }
});
