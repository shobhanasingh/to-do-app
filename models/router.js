const { router } = require("./todo");
const { Todo, priorities } = require("./schema");
const mongoose = require("mongoose");
const {
  createTodoValidator,
  updateTodoValidator,
  todoQueryValidator,
} = require("../middleware/validators/todoValidator");
const validate = require("../middleware/validators/validate");
const auth = require("../middleware/auth");

//Get todo
// router.get('/',auth, async(req,res) => {
//     try{
//             const todos = await Todo.find({user:req.userId})
//             res.status(200).json(todos)
//             }
//             catch(err){
//                 console.log(err)
//                 res.status(500).json({error:'Server Error'})
//             }
//         })

//Get todo with pagination

router.get("/", auth, todoQueryValidator, validate, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const filter = { user: req.userId };
    if (req.query.priority) {
      filter.priority = req.query.priority.toLowerCase();
    }
    const total = await Todo.countDocuments(filter);
    const todos = await Todo.find(filter).limit(limit).skip(skip);

    res.status(200).json({
      totalItems: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      todos,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
});
//Create TODO
router.post("/", auth, createTodoValidator, validate, async (req, res) => {
  try {
    if (!req.body.task) {
      return res.status(400).json({ message: "Task can not be blank" });
    }
    const newtodo = new Todo({
      text: req.body.task,
      user: req.userId,
      priority: req.body?.priority || priorities[0],
    });
    const savedtodo = await newtodo.save();
    res.status(201).json(savedtodo);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});
//Search To-Dos
router.get("/search", auth, async (req, res) => {
  const query_term = req.query.query;
  if (!query_term) {
    res.status(400).send("Search query is required ");
  }
  try {
    const results = await Todo.find({
      $text: { $search: query_term },
      user: req.userId,
    });
    res.status(200).json(results);
  } catch (err) {
    console.log("Error during search", err);
    res.status(500).json({ message: "Error performing search", error: err });
  }
});

//Get todo by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "not a valid id" });
    }
    const todo = await Todo.findOne({ _id: id, user: req.userId });
    if (!todo) {
      return res.status(404).json({ error: "To-do item not found" }); // If no todo is found, return a 404 Not Found error
    }
    res.status(200).json(todo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err, message: "Service error" });
  }
});

//Update To-Do
router.put("/:id", auth, updateTodoValidator, validate, async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "not a valid id" });
    }

    const { text, completed, priority } = req.body;
    const todo = await Todo.findOneAndUpdate(
      { _id: id, user: req.userId },
      { text: text, completed: completed, priority: priority },
      { new: true },
    );
    if (!todo)
      return res
        .status(404)
        .json({ message: "to-do not found or not authorized" });
    res.status(200).json(todo);
  } catch (err) {
    console.log("Error Updating Task", err);
    res.status(500).json({ error: err.message });
  }
});

//Delete TODO
router.delete("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "not a valid id" });
    }
    const todo = await Todo.findOneAndDelete({ _id: id, user: req.userId });
    if (!todo) {
      return res.status(404).json({ error: "To-do item not found" });
    }
    return res.status(204).send();
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e, message: "Server error" });
  }
});
module.exports = {
  router,
};
