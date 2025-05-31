const express = require('express')
const mongoose = require('mongoose')
const {Todo} = require("./models/todo")

const app = express()
const port = 3000
app.use(express.json())
mongoose.connect('mongodb://127.0.0.1:27017/todo',{
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.then(()=> console.log("Connected to MongoDB"))
.catch((err)=> console.log("Connection error",err))

//Create TODO
app.post("/todos",(req,res) => {
    const newtodo = new Todo({
        text: req.body.task,
    })
    newtodo.save()
    .then(todo => console.log("todo Created"))
    .catch(err=> console.log("Error creating to do",err))
    res.status(201).json(newtodo)
})

//Get todo
app.get("/todos",(req,res)=>{
    Todo.find({})
    .then(todos => {
        res.status(200).json(todos)
    })
    .catch(err => console.log("Error finding todos",err))
})

//Delete TODO
app.delete('/todos/:id',(req,res)=>{
    const id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message: 'not a valid id'})
    }
    Todo.deleteOne({_id : id }).then(mongoResult => {
        return res.status(200).json({message:'deleted'})
    }).catch(e => {
        console.log(e);
        return res.status(500).json({message: 'not deleted'})
    })
})

//Update To-Do
app.put('/todos/:id',(req,res) =>{
    const id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message: 'not a valid id'})
    }
    const {text,completed} = req.body
    const todo = Todo.findByIdAndUpdate(id,
        { text : text , completed: completed},
        {new :true}
    )
    .then(updated_todo =>{
        console.log("todo has been updated",updated_todo)
        res.status(200).json(updated_todo)
    })
    .catch(err => console.log("Error Updating Task",err))
    })
    
//Search To-Dos
app.get('/todos/search',async(req,res)=>{
     const query_term  = req.query.query
    if(!query_term){
        res.status(400).send("Search query is required ")
    }
    try{
    const results = await Todo.find({$text:{$search:query_term}})
    res.status(200).json(results)
    
}catch(err){
    console.log("Error during search",err)
    res.status(500).json({message:"Error performing search",error:err})
}
})
app.listen(port,()=>{
    console.log("Server is listening at http://localhost:",port)
})