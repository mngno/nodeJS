const express = require('express')
const colors = require('colors')
const connection = require('./db')
require('dotenv').config()
const port = 3001;
const app = express()

connection()

app.get('/',(req,res)=>{
    res.send('hello world')
})


app.listen(port,()=>{
    console.log(`server aslaa${port}` .bgGreen.white)
})