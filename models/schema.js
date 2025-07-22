const mongoose = require("mongoose");

// move priorities to the const folder/file a separate one
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
todoSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    const pad = (num) => String(num).padStart(2, "0");
    const formatDateTime = (date) => {
      const yyyy = date.getFullYear();
      const mm = pad(date.getMonth() + 1);
      const dd = pad(date.getDate());
      const hh = pad(date.getHours());
      const min = pad(date.getMinutes());
      const sec = pad(date.getSeconds());
      return {
        date: `${yyyy}-${mm}-${dd}`,
        time: `${hh}.${min}.${sec}`,
      };
    };
    if (ret.createdAt) {
      const { date, time } = formatDateTime(new Date(ret.createdAt));
      ret.createDate = date;
      ret.createTime = time;
    }
    if (ret.updatedAt) {
      const { date, time } = formatDateTime(new Date(ret.updatedAt));
      ret.updateDate = date;
      ret.updateTime = time;
    }
    delete ret.createdAt;
    delete ret.updatedAt;
    return ret;
  },
});
todoSchema.index({ text: "text" });
const Todo = mongoose.model("Todo", todoSchema);
Todo.init()
  .then(() => console.log("Task index created successfully"))
  .catch((err) => console.log("Error creating text index", err));

module.exports = {
  Todo,
  priorities,
};
