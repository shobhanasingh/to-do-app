const express = require('express')
const app = express();
const port = 3000
const path = require('path')
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON data (optional, for JSON requests)
app.use(express.json());

app.set('view engine','ejs')
app.set('views', path.join(__dirname,'views'))

app.get('/',(req,res) => {
    const formdata = {
        name : 'shobhana singh',
         age : 34,
        occupation : "Not employed"
    }
    res.render('index',{formdata:formdata})
})

app.get('/form',(req,res) =>
{
    res.render('form',{formdata:null})
})

app.post('/submit',(req,res)=>{
    const formdata = {
        name : req.body.name,
        email : req.body.email
    };
    console.log(formdata)
    res.render('form',{formdata:formdata})
})

app.listen(3000,()=>
{
    console.log("Server is running on port",port)
})