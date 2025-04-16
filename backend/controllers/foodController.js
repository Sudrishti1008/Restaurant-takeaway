import foodModel from "../models/foodModel.js";
import fs from 'fs'

// add food

const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
        status: req.body.status,
    })

    try {
        await food.save();
        res.json({ success: true, message: "Food Added" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

//All food list

const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// remove food item

const removeFood = async (req,res)=> {
try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`,()=>{})

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({success:true,message:"Food Removed"})
} catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
    
}
}
const updateFood = async (req, res) => {
    try {
      const updated = await foodModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(updated);
    } catch (err) {
      res.status(500).json({ message: 'Update failed', error: err.message });
    }
  };

  

export { addFood, listFood,removeFood,updateFood }