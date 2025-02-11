import mongoose from "mongoose";
import { ENV_VARS } from "./enVars.js";

export const connectdb=async()=>{
    await mongoose.connect(ENV_VARS.MONGO_URI)
    .then(()=>console.log("db connected"));
}