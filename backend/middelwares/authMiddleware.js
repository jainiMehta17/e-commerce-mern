const jsonWebToken = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")

const authMiddleware = asyncHandler(async(req,res, next)=>{
    let token;
    if(req?.headers?.authorization?.startsWith("Bearer")){
        token = req?.headers?.authorization.split(" ")[1];
        if(token){
            try {
                const decoded = jsonWebToken.verify(token, process.env.JWT_SECRET);
                const user = await User.findById(decoded?.id);
                req.user = user;
                next()
            } catch (error) {
                throw new Error("Not Authorized, may be token expires, Login Again")
            }
        }else{
            throw new Error("No Token Attached to header")
        }
    }
})

const isAdmin = asyncHandler(async(req,res,next)=>{
    const {role} = req.user;
    if(role!=='admin'){
        res.json("You are not an admin")
    }else{
        next()
    }
})

module.exports = {authMiddleware, isAdmin}