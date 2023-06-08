const express=require("express")
const Router=express.Router()
const clgController=require("../controller/collegeController")
const internController=require("../controller/internController")
Router.post("/functionup/colleges",clgController.createCollege)
Router.post("/functionup/interns",internController.createInterns)
Router.get("/functionup/collegeDetails",clgController.collegeDetails)
Router.use("*",(req,res)=>{
    res.status(404).send("Invalid request")
})
module.exports=Router