let express = require("express");
let logger = require("morgan");
let bodyParser = require("body-parser");
let app = express();
app.use(logger("dev"));

app.use(bodyParser.json());
require("./routes/bookAPI.js")(app);

// Create a Server
var server = app.listen(8080, "127.0.0.1", function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("App listening at http://%s:%s", host, port);
});