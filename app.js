const express = require('express');
const app = express();
app.get('/',(req,res)=>{
res.send("it's all good");
})

app.listen(3000,()=>{
    console.log('port on 3000');
})