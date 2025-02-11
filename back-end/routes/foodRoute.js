import express from "express"
import { addFood ,foodList, removeFood} from "../controllers/foodController.js"
import multer from "multer"
import path from 'path';

const foodRouter=express.Router();
//storage

const storage=multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, 'uploads/');
    },
    filename:(req,file,cb)=>{
        return cb(null, `${Date.now()}_${file.originalname}`);
    }
})
const upload=multer({storage:storage})

foodRouter.post("/add",upload.single("image"),addFood);
foodRouter.get("/list",foodList);
foodRouter.post("/remove",removeFood);

export default foodRouter;