import foodModel from "../models/foodModel.js";
import fs from 'fs';

const addFood=async(req,res)=>{
    try{
        let image_filename=`${req.file.filename}`;
        const {name,description,price,category}=req.body;
        if(!name || !description ||!price ||!category){
           return res.json({success:false,message:"all fields are mandatory"});
        }
        const food= new foodModel({
            name:name,
            description:description,
            price:price,
            category:category,
            image:image_filename,
        })
        await food.save();
        return res.json({success:true,message:"success"})
    }
    catch(error){
        console.log(error);
        return res.json({success:false,message:"Error"})
    }

}
const foodList=async(req,res)=>{
    try{
        const foods=await foodModel.find({});
        res.json({success:true,data:foods})
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"error"})
    }
}
const removeFood=async(req,res)=>{
    try{
        const food=await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"food removed"})
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:Error});
    }
}
export {addFood,foodList,removeFood}