var bodyParser = require("body-parser");
var mongoose = require("mongoose");
// connect
const uri =
  "mongodb+srv://dbUser:dbUserPassword@todo.hqcl0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri);
// Create a Schema

var todoSchema = new mongoose.Schema({
  item: String,
});

var Todo = mongoose.model("Todo", todoSchema);

// var item1 = Todo({ item: "Learn ReactJS" }).save((err) => {
//   if (err) throw err;
//   console.log("Item Saved");
// });

// var data = [{ item: "Get milk" }, { item: "Walk my dog" }, { item: "Go gym" }];
var urlencodedParser = bodyParser.urlencoded({ extended: false });
module.exports = function (app) {
  app.get("/todo", (req, res) => {
    // get data from Monog DB and render view
    Todo.find({}, (err, data) => {
      if (err) throw err;
      res.render("todo", { todos: data });
    });
  });
  app.post("/todo", urlencodedParser, (req, res) => {
    // get data from the view and add to Mongo DB

    var newTodo = Todo(req.body).save((err, data) => {
      if (err) throw err;
      res.json(data);
    });
  });

  app.delete("/todo/:item", (req, res) => {
    // delete the item from Mongo DB

    Todo.find({ item: req.params.item.replace(/\-/g, "") }).remove(
      (err, data) => {
        if (err) throw err;
        res.json(data);
      }
    );
    // data = data.filter(
    //   (todo) => todo.item.replace(/ /g, "-") !== req.params.item
    // );

    // res.json(data);
  });
};
