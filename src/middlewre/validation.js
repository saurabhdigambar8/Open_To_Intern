const collegeValidation=async function (req,res){
    try{
    let data=req.body
    if(!data){
        return res.status(400).send({status:false,message:"please provide the details"})
    }
    const checkNaming=function(inp){
        if(typeof inp != "string"){
            return false
        }
    }
    let {name,fullName,logoLink}=data
    let a=checkNaming(name)
    if(a==false){
        return res.send("nae mot valid")
    }
    else{
        return res.send("okk")
    }
    // checkNaming(fullName)
    // checkNaming(logoLink)
    
}catch(err){
  return res.send(err.message)
}
}
module.exports.collegeValidation=collegeValidation