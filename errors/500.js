module.exports =(error,req,res,next)=>{
    res.status(500).send({
      massage:"Internet Server Error"  ,
      code: 500,
      Error:error
    })
}