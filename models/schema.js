const mongoose = require("mongoose");

// move priorities to the const folder/file a separate one please
const priorities = ["low", "medium", "high"];
const todoSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    priority: {
      type: String,
      enum: priorities,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
todoSchema.index({ text: "text" });
const Todo = mongoose.model("Todo", todoSchema);
Todo.init()
  .then(() => console.log("Text index created successfully"))
  .catch((err) => console.log("Error creating text index", err));

module.exports = {
  Todo,
  priorities,
};
