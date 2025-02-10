export const auth = (req,res,next)=>{
    // console.log(req.session)
    if(req.session.useremail){
    next();
 }else{
     res.redirect("/login")
 }

}