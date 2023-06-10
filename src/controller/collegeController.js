const collegeModel=require("../models/collegeModel")
const internModel=require("../models/internModel")
const validUrl=require("valid-url")

const isEmpty=function(value){
   return Object.keys(value).length.length>0   
}

const isValid=function(value){
    if(value==undefined|| value==null) return false
    if(typeof value =="string" && value.trim().length==0)return false
    return true
}

const nameRegx=/^[A-Za-z\s-]{1,}$/

//create college ApI
const createCollege=async function(req,res){
   try{
        const data=req.body
        if(!isEmpty(data)){
            return res.status(400).send({status:false,message:"please provise the details"})
        }
        if(!isValid(data.name)){
            return res.status(400).send({status:false,message:"please give the college name"})
        }
        if(!nameRegx.test(data.name)){
            return res.status(400).send({status:400,message:"please provide the valid name"})
        }
        
        const clgExist=await collegeModel.findOne({name:data.name})
        if(clgExist){
            return res.status(400).send({status:false,message:"college is already register"})
        }

        if(!isValid(data.fullName)){
            return res.status(400).send({status:false,message:"please give the college fullName"})
        }
        if(!nameRegx.test(data.fullName)){
            return res.status(400).send({status:400,message:"please provide the valid FullName"})
        }
        if(!validUrl.isWebUri(data.logoLink)){
            return res.status(400).send({status:false,message:"please give the valid link"})
        }
       
     //created the college
        const collegeCreated=await collegeModel.create(data)
        return res.status(201).send({status:true,mesaage:"college is  created",data:collegeCreated})
   }catch(err){
    return res.status(500).send(err.message)
   }
}

//get collwgw details
const collegeDetails=async function(req,res){
    try{
         let name=req.query.collegeName
         const clgFind=await collegeModel.findOne({name:name,isDeleted:false},{_id:0,name:1,fullName:1,logoLink:1}) //doubt
         const findIntern=await internModel.find({collegeId:clgFind,isDeleted:false},{_id:1,name:1,email:1,mobile:1})
         clgFind.interns=findIntern
         return res.status(200).send({status:true,data:clgfind})
    }catch(err){
        return res.status(500).send(err.message)
    }
}
module.exports={createCollege,collegeDetails}