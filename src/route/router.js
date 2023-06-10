const express=require("express")
const Router=express.Router()
const clgController=require("../controller/collegeController")
const internController=require("../controller/internController")
const clgcheck=require("../middlewre/validation")
Router.post("/functionup/colleges",clgcheck.collegeValidation,clgController.createCollege)
Router.post("/functionup/interns",internController.createInterns)
Router.get("/functionup/collegeDetails",clgController.collegeDetails)
Router.use("*",(req,res)=>{
    res.status(404).send("Invalid request")
})
module.exports=Router