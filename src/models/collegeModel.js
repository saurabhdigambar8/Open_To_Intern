const mongoose=require("mongoose")

const collegeSchema=new mongoose.Schema({
   name:{type:String,require:true,unique:true},
   fullName:{type:String,require:true},
   logoLink:{type:String,require:true},
   isDeleted:{type:Boolean,default:false}
})
module.exports=mongoose.model("College",collegeSchema)
