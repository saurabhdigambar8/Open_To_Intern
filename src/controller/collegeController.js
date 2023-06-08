const collegeModel=require("../models/collegeModel")
const internModel=require("../models/internModel")

const createCollege=async function(req,res){
   try{
        const data=req.body
        data.logoLink="https://functionup-stg.s3.ap-south-1.amazonaws.com/thorium/iitd.png"
        const collegeCreated=await collegeModel.create(data)
        return res.status(201).send({status:true,mesaage:"college created",data:collegeCreated})
   }catch(err){
    return res.status(500).send(err.message)
   }
}

const collegeDetails=async function(req,res){
    try{
         let clgName=req.query.collegeName
         const clgFind=await collegeModel.findOne(clgName)
         const findIntern=await internModel.find({collegeId:clgFind})
         clgFind.intern=findIntern
         return res.send({data:clgfind})
    }catch(err){
        return res.status(500).send(err.message)
    }
}
module.exports={createCollege,collegeDetails}