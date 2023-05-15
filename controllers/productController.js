const express = require("express");
const app = express();
const Product = require("../models/productModel");
app.use(express.json());

const getProduct = async (req, res) => {
    try {
      const id = req.params.id ?? null;
      if (id) {
        const product = await Product.findById({ _id: id });
        if (product.user_id.toString() !== req.user.id) {
          return res.status(403).json({
            message: "Unauthorized User",
          });
        }
        return res.status(200).json({
          product,
        });
      } else {
        const prod = await Product.find({ user_id: req.user.id });
        if (prod != null) {
          return res.status(200).json({
            product: prod,
          });
        } else {
          return res.status(403).json({
            message: "Unauthorized User",
          });
        }
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

const createProduct = async(req,res)=>{
    try {
        // console.log(req.body);
        req.body.user_id = req.user.id;
        const product = await Product.create(req.body);
        res.status(200).send(product);
    } catch (error) {
        res.status(500).json({message:error.message});
    }    
    
};

const updateProduct = async(req,res)=>{
    try {
        const id = req.params.id;
        const prod = await Product.findById({_id:req.params.id});
        // const prod = await Product.findByIdAndUpdate(id, req.body); RETURNS UNUPDATED PROD
        if(!prod)
        {
            return res.status(404).json({"message":`Product Doesn't exist with ID ${id}`});
        }
        if(prod.user_id.toString() !== req.user.id)
        {
            return res.status(403).json({
                    "message" : "Unauthorized User"})
        }
            
        const updatedProd = await Product.findByIdAndUpdate(id, req.body,{new : true});
        return res.status(200).json({message:"Product Updated",updatedProd});
        
    } catch (error) {
        res.status(500).json({message:error.message});
    }
    
};

const deleteProduct = async (req,res)=>{
    try {
        const id = req.params.id;
        const prod = await Product.findById(id);
        if(!prod){
            return res.status(404).json({message:`Product Doesn't Exist with ID ${id}`});
        }

        if(prod.user_id.toString() !== req.user.id)
        {
            return res.status(403).json({
                "message" : "Unauthorized User"})
        }
        
        const prodDeleted = await Product.findByIdAndDelete(id);
        
        if(prodDeleted){
        res.status(200).json({message:"Product Deleted"});
        }
    } catch (error) {
        res.status(500).json({message:error.message});
    }
    
};

module.exports = {getProduct , createProduct , updateProduct, deleteProduct};