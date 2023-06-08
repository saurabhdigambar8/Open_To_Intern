const collegeModel=require("../models/collegeModel")
const internModel=require("../models/internModel")

const createInterns=async function(req,res){
    try{
        const data=req.body
        const {name,mobile,email,collegeName}=data
        const collegeId=await collegeModel.findOne(collegeName)
        if(!collegeId){
            return res.status(404).send({sataus:false,message:"college not found"})
        }
        const internCreated=await internModel.create(name,mobile,collegeId,email)
        return res.status(201).send({status:true,data:internCreated,message:"created succesfull"})

    }catch(err){
        return res.status(500).send(err.messege)
    }
}

module.exports={createInterns}