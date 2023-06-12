const collegeModel=require("../models/collegeModel")
const internModel=require("../models/internModel")
const emailChecker=require("email-validator")
const isEmpty=function(value){
    return Object.keys(value).length>0   
 }
 
 const isValid=function(value){
     if(value==undefined|| value==null) return false
     if(typeof value =="string" && value.trim().length==0)return false
     return true
 }
 
 //const nameRegx=/^[A-Za-z\s-]{1,}$/

const createInterns=async function(req,res){
    try{
        const data=req.body
        if(!isEmpty(data)){
            return res.status(400).send({status:false,message:"please provide the details"})
        }
        if(!isValid(data.name)){
            return res.status(400).send({status:false,message:"please provide the name"})
        }
        // if(!nameRegx.test(name)){
        //     return res.status(400).send({status:false,message:"please provide the valid name"})
        // }

        if(!isValid(data.mobile)){
            return res.status(400).send({status:false,message:"please provide the mobile"})
        }
        let mobileReg=/^\d{10}$/
        if(!mobileReg.test(data.mobile)){ 
            return res.status(400).send({status:false,message:"please enter 10 digits valid  mobile number"})
        }
        const checkMobile=await internModel.findOne({mobile:data.mobile})
        if(checkMobile){
            return res.status(400).send({status:false,message:"this phone no is already register"})
        }
        
        if(!isValid(data.email)){
            return res.status(400).send({status:false,message:"please provide the email"})
        }
        // if (!/^[a-z0-9]{1,}@g(oogle)?mail\.com$/.test(data.email)) {
        //    return  res.status(400).send({ status: false, message: "Email should be in valid format" })
           
        // }
        if (!emailChecker.validate(data.email)) {
            return  res.status(400).send({ status: false, message: "Email should be in valid format" })
            
         }

        const checkemail=await internModel.findOne({email:data.email})
        if(checkemail){
            return res.send({status:false,message:"this email is already register"})
        }

        if(!isValid(data.collegeName)){
            return res.status(400).send({status:false,message:"please provide the college name"})
        }
        // if(!nameRegx.test(collegeName)){
        //     return res.status(400).send({status:false,message:"please provide the valid college name"})
        // }
        const checkClg=await collegeModel.findOne({name:data.collegeName,isDeleted:false})
        if(!checkClg){
            return res.status(400).send({status:false,message:"this college is not register"})//status code
        }
        data.collegeId=checkClg._id
        const internCreated=await internModel.create(data)
        let {name,fullName,email,mobile,collegeId,isDeleted}=internCreated
        let dataSend={name,fullName,email,mobile,collegeId,isDeleted}
        return res.status(201).send({status:true,data:dataSend})

    }catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}

module.exports={createInterns}