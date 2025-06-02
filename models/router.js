const {router} = require('./todo')
const {Todo} = require('./schema')
const mongoose  = require('mongoose')


//Get todo
router.get('/', async(req,res) => {
    try{
            const todos = await Todo.find({})
            res.status(200).json(todos)
            }
            catch(err){
                console.log(err)
                res.status(500).json({error:'Server Error'})
            }
        })

//Create TODO
router.post('/', async(req,res) => {
try {
    if(!req.body.task){
        return res.status(400).json({message:'Task can not be blank'})
    }
    const newtodo =  new Todo({text: req.body.task});
    const savedtodo = await newtodo.save();
    res.status(201).json(savedtodo)
}catch(err){
    console.log(err)
    res.status(400).json({error:err.message})
}
})
//Search To-Dos
router.get('/search',async(req,res)=>{
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

//Get todo by ID
router.get('/:id',async(req,res) =>{
    try{
    const id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message: 'not a valid id'})
}
const todo = await Todo.findById({_id:id})
if (!todo) {
    return res.status(404).json({ error: 'To-do item not found' }); // If no todo is found, return a 404 Not Found error
  }
    res.status(200).json(todo)
    }catch(err){
console.log(err)
res.status(500).json({error:err,message: "Service error"})
    }
})

//Update To-Do
router.put('/:id',async(req,res) =>{
    try{
    const id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message: 'not a valid id'})
    }
    const {text,completed} = req.body
    const todo = await Todo.findByIdAndUpdate(id,
        { text : text , completed: completed},
        {new :true}
    )
    res.status(200).json(todo)
}
    catch(err){
        console.log("Error Updating Task",err)
        res.status(500).json({error:err.message})
    } 
})

//Delete TODO
router.delete('/:id',async(req,res)=>{
    try{
    const id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message: 'not a valid id'})
    }
        const todo = await Todo.findByIdAndDelete(id)
        if(!todo){
            return res.status(404).json({error:'To-do item not found'})
        }
        return res.status(204).send()
    }catch(e)
    {
        console.log(e)
        res.status(500).json({error:e,message : 'Server error'})
    }
})
module.exports = {
    router
}

/**
 * module.exports = {
 * fff:router
 * }
 * 
 */

    