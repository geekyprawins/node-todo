var express = require("express");
var app = express();
var todoController = require("./controllers/todoController");
// set up templates engine

app.set("view engine", "ejs");
// static files

app.use(express.static("./public"));

// fire controller
todoController(app);

// listen to port

app.listen(3000, () => {
  console.log("Listening to port 3000");
});
