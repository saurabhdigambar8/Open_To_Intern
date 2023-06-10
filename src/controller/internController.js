const collegeModel=require("../models/collegeModel")
const internModel=require("../models/internModel")

const isEmpty=function(value){
    return Object.keys(value).length.length>0   
 }
 
 const isValid=function(value){
     if(value==undefined|| value==null) return false
     if(typeof value =="string" && value.trim().length==0)return false
     return true
 }
 
 const nameRegx=/^[A-Za-z\s-]{1,}$/

const createInterns=async function(req,res){
    try{
        const data=req.body
        if(!isEmpty(data)){
            return res.status(400).send({status:false,message:"please provide the details"})
        }
        const {name,mobile,email,collegeName}=data
        if(!isValid(name)){
            return res.status(400).send({status:false,message:"please provide the name"})
        }
        if(!nameRegx.test(name)){
            return res.status(400).send({status:false,message:"please provide the valid name"})
        }

        if(!isValid(mobile)){
            return res.status(400).send({status:false,message:"please provide the mobile"})
        }
        if(/^\d{10}$/.test(mobile)){ //doubt
            return res.status(400).send({status:false,message:"please enter 10 digits valid  mobile number"})
        }
        const checkMobile=await internModel.findOne(mobile)
        if(checkMobile){
            return res.status(400).send({status:false,message:"this phone no is already register"})//dount in status code
        }
        
        if(!isValid(email)){
            return res.status(400).send({status:false,message:"please provide the email"})
        }
        if (!/^[a-z0-9]{1,}@g(oogle)?mail\.com$/.test(email)) {
           return  res.status(400).send({ status: false, message: "Email should be in valid format" })//status code
           
        }
        const checkemail=await internModel.findOne(email)
        if(checkemail){
            return res.send({status:false,message:"this email is already register"})
        }

        if(!isValid(collegeName)){
            return res.status(400).send({status:false,message:"please provide the college name"})
        }
        if(!nameRegx.test(collegeName)){
            return res.status(400).send({status:false,message:"please provide the valid college name"})
        }
        const checkClg=await collegeModel.findOne({collegeName:collegeName})//doubt
        if(!checkClg){
            return res.status(400).send({status:false,message:"this college is not register"})//status code
        }

        const internCreated=await internModel.create(name,mobile,{collegeId:checkClg._id},email)//doubt
        return res.status(201).send({status:true,data:internCreated,message:"created succesfull"})

    }catch(err){
        return res.status(500).send(err.messege)
    }
}

module.exports={createInterns}