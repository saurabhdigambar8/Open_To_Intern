const collegeModel=require("../models/collegeModel")
const internModel=require("../models/internModel")
const validUrl=require("valid-url")

const isEmpty=function(value){
   return Object.keys(value).length>0   
}

const isValid=function(value){
    if(value==undefined|| value==null) return false
    if(typeof value =="string" && value.trim().length==0)return false
    return true
}

//const nameRegx=/^[A-Za-z\s-]{1,}$/

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
        // if(!nameRegx.test(data.name)){
        //     return res.status(400).send({status:400,message:"please provide the valid name"})
        // }
        
        const clgExist=await collegeModel.findOne({name:data.name})
        if(clgExist){
            return res.status(400).send({status:false,message:"college is already register"})
        }

        if(!isValid(data.fullName)){
            return res.status(400).send({status:false,message:"please give the college fullName"})
        }
        // if(!nameRegx.test(data.fullName)){
        //     return res.status(400).send({status:400,message:"please provide the valid FullName"})
        // }
        if(!validUrl.isWebUri(data.logoLink)){
            return res.status(400).send({status:false,message:"please give the valid link"})
        }
       
     //created the college
        const collegeCreated=await collegeModel.create(data)
       // console.log("college created data"+collegeCreated);
        const {name,fullName,logoLink,isDeleted}=collegeCreated
        let resData={name,fullName,logoLink,isDeleted}
        return res.status(201).send({status:true,data:resData})
   }catch(err){
    return res.status(500).send(err.message)
   }
}


//=========================================================================
//get collwgw details
const collegeDetails=async function(req,res){
    try{
         let name=req.query.collegeName
         
         const clgFind=await collegeModel.findOne({name:name,isDeleted:false})
         //console.log("college finding data"+clgFind);
         if(!clgFind){
            return res.status(404).send({status:false,message:"There is no college exist by this name"})

         }
         const findIntern=await internModel.find({collegeId:clgFind._id,isDeleted:false},{_id:1,name:1,email:1,mobile:1})
         let data={
            name:clgFind.name,
            fullName:clgFind.fullName,
            logoLink:clgFind.logoLink,
            interns:findIntern
         }
         return res.status(200).send({status:true,data:data})
    }catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}
module.exports={createCollege,collegeDetails}