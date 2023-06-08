const express=require("express")
const app=express()
const mongoose=require('mongoose')
const route=require("./route/router")
require("dotenv").config()
const {MongoDB,PORT}=process.env
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/",route)
mongoose.connect(MongoDB,{useNewUrlParser:true})
.then(()=>console.log("MongoDB is Connected"))
.catch(err=>console.log(err))
app.listen( PORT,()=>{console.log(`Application is running  on port ${PORT}`)})