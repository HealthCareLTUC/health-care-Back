module.exports=( req,res,next)=>{
    res.status(404).send({
    massage:"Not Found",
    code :404,
    method: req.method,
    endpoint:req.url
    })}