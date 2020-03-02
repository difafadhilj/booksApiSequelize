var express = require("express");
var app = express();
var morgan = require("morgan");
var bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("common"));
require("./router/router.js")(app);

const db = require("./app/db.js");

// force: true will drop the table if it already exists (comment this part aft
// first run, to disable migration)
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and Resync with { force: true }");
// });

// Create a Server
var server = app.listen(8080, "127.0.0.1", function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("App listening at http://%s:%s", host, port);
});
