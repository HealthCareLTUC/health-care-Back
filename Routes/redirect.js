


const express=require('express')
const RouteRedirect=express.Router()


RouteRedirect.get("/pricename/:drug", (req, res) => {


    res.redirect(`https://www.goodrx.com/${req.params.drug}`);
}
)


module.exports=RouteRedirect