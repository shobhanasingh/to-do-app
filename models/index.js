// // practing on direct db collections

// const mongoose = require('mongoose')
// mongoose.connect('mongodb://127.0.0.1:27017/todo',{
//     useNewUrlParser : true,
//     useUnifiedTopology : true
// })
// .then(()=> console.log("Connected to MongoDB"))
// .catch((err)=> console.log("Connection error",err))

// const todoSchema = new mongoose.Schema({
//     text:{type:String , required:true},
//     completed : {type:Boolean , default: false },
//     createdAt : {type:Date , default: Date.now()},
//     dueDate : {type:Date , default : Date.now()+1}
// })

// const Todo = mongoose.model("Todo",todoSchema)

// const newTodo = new Todo({text: 'Buy domain'})
// newTodo.save()
// .then(todo => console.log("todo Created:",todo))
// .catch(err=> console.log("Error creating to do",err))

// // Todo.find({})
// //     .then(todos => console.log("Todos:",todos))
// //     .catch(err => console.log("Error finding todos",err))

// Todo.findOne({text: "Buy Groceries"})
// .then(todo => console.log('Todo:',todo))
// .catch(err => console.log("error finding todo",err))

// Todo.updateOne({text: 'Buy Groceries'},{completed : true})
// .then(todo => console.log("todo updated",todo))
// .catch(err => console.log("Error updating todo",err))

// Todo.deleteOne({text:"Buy Groceries"})
// .then(todo => console.log("todo deleted",todo))
// .catch(err => console.log("Error deleting todo",err))
