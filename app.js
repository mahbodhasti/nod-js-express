const { urlencoded } = require('express');
const express = require('express');
const app = express();
let users = require('./users')

const { body, validationResult } = require('express-validator');
const { users } = require('./users');


app.use(express.urlencoded({extended:true}))

global.config = require('./config') 

app.use(express.static(__dirname + "/public"))
//restful api
app.get('/',(req,res)=>{
res.status(200).json({
    data:users,
    success:true
})})
app.get('/:id',(req,res)=>{
const user =users.find(user=> user.id == req.params.id )
res.status(200).json({
    data:user,
    success:true
})})

app.post('/',[
    body('username').isEmail(),
    body('password').isLength({min:5})
],(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    req.body.id = parseInt(req.body.id)
        users.push(req.body)
        res.status(200).json({
            data:users,
            success:true
        })
    })
app.put('/:id',(req,res)=>{
  users =  users.map(user=>{
        // req.body.id = parseInt(req.body.id)
        if (user.id == req.params.id){
         return req.body
        }else{
            return user
        }
        })
        
        res.status(200).json({
            data:users,
            success:true
        })

    })
    app.delete('/:id',(req,res)=>{
        const user =users.find(user=> user.id == req.params.id )
        const index = users.indexOf(user)
        users.splice(index,1)
        res.status(200).json({
            data:users,
            success:true
        })
    })
    

app.listen(3000,()=>{
   
    console.log(`port on  ${config.port}`);
})
