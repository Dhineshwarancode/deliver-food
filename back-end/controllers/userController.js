import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"
import { ENV_VARS } from "../config/enVars.js";

//login
const loginUser=async (req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"user doesnot exist"})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({success:false,message:"invalid password"});
        }
        const token=await createToken(user._id);
        return res.json({success:true,message:"Login success",token})
    }
    catch(err){
        console.log(err)
        return res.json({success:false,message:"Error"})
    }
}

const createToken=async(id)=>{
    return jwt.sign({id},ENV_VARS.JWT_SECRET)
}
//register user
const registerUser=async(req,res)=>{
    try{
        const {name,password,email}=req.body;
        const exists=await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"user already exist"})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"please enter a valid email"})
        }
        if(password.length<8){
            return res.json({success:false,message:"please enter strong password"})
        }
        const salt =await bcrypt.genSalt(10);
        const hassedPassword=await bcrypt.hash(password,salt);

        const newUser=new userModel({
            name:name,
            email:email,
            password:hassedPassword
        })
        const user=await newUser.save()
        const token= await createToken(user._id);
        return res.json({success:true,message:"Accound created successfully",token});
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"Error"});
    }

}

export {loginUser,registerUser};