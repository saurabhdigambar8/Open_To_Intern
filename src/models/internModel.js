const mongoose=require("mongoose")
const { validate } = require("./collegeModel")
const internSchema=new mongoose.Schema({
 name:{type:String,required:true},
 email:{type:String,required:true,unique:true},
 mobile:{type:String,required:true,unique:true},
 collegeId:{type:mongoose.Schema.Types.ObjectId,ref:"College"},
 isDeleted:{type:Boolean,default:false}
})
module.exports=mongoose.model("intern",internSchema)
// { name: {mandatory}, email: {mandatory, valid email, unique}, mobile: {mandatory, valid mobile number, unique}, collegeId: {ObjectId, ref to college model, isDeleted: {boolean, default: false}}