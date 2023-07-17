const generateToken = require("../config/jwtToken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler") 
const createUser = asyncHandler(async(req,res)=>{
    const email = req.body
    const findUser = await User.findOne(email);
    if(findUser){
        throw new Error("User Already Exists")
    }else{
        const createOneUser = await User.create(req.body);
        res.json({
            _id:createOneUser?._id,
            name:createOneUser?.firstName + " " + createOneUser?.lastName,
            email:createOneUser?.email,
            role:createOneUser?.role
        })
    }
})
const loginUser = asyncHandler(async(req,res)=>{
    const {email, password} = req.body;
    const findUser = await User.findOne({email})
    if(findUser && await findUser.isPasswordMatched(password)){
        console.log(findUser);
        res.json({
            _id:findUser?._id,
            name:findUser?.firstName + " " + findUser?.lastName,
            email:findUser?.email,
            token:generateToken(findUser?._id),
            role:findUser?.role
        })
    }else{
        throw new Error("Invalid Credentials")
    }
})

const getAllUsers = asyncHandler(async(req,res)=>{
    try {
        const getUsers = await User.find();
        res.json({getUsers})
    } catch (error) {
        throw new Error(error)
    }
    
})

const getUser = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    try{
        const user = await User.findById(id)
        res.json({user})
    }catch(error){
        throw new Error("User Not Found")
    }
})

const deleteUser  = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    try{
        const deletedUser = await User.findByIdAndDelete(id)
        res.json({deletedUser})
    }catch(err){
        throw new Error(err)
    }
})

const updateUser = asyncHandler(async(req,res)=>{
    const {_id} = req.user
    try{
        const updatedUser = await User.findByIdAndUpdate(_id, {
            firstName:req?.body?.firstName,
            lastName:req?.body?.lastName,
            email:req?.body?.email,
            mobile:req?.body?.mobile
        },{
            new:true
        })
        res.json({updatedUser})
    }catch(error){
        throw new Error(error)
    }
})

const blockUser = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    try {
        const blockedUser = await User.findByIdAndUpdate(id, {
            isBlocked:true
        }, {
            new:true
        })
        res.json({
            msg:"User Blocked"
        })
    } catch (error) {
        throw new Error(error)
    }

})

const unBlockUser = asyncHandler(async(req,res)=>{
    console.log("------",req.params.id);
    const {id} = req.params;
    try{
        const unBlockedUser = await User.findByIdAndUpdate(id, {
            isBlocked:false
        }, {
            new:true
        })
        res.json({
            msg:"User Unblocked"
        })
    } catch (error) {
        throw new Error(error)
    }

})


module.exports = {createUser, loginUser, getAllUsers, getUser, deleteUser, updateUser, blockUser, unBlockUser}