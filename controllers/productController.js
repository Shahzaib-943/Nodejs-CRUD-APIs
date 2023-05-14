const express = require("express");
const app = express();
const Product = require("../models/productModel");
app.use(express.json());

const getProduct = async(req,res)=>{
    try {
        const id = req.params.id ?? null;
        const products = id ? await Product.findById(id) : await Product.find();
        res.status(200).json({products});
    } catch (error) {
        res.status(500).json({message:error.message})
    }
    
};

const createProduct = async(req,res)=>{
    try {
        // console.log(req.body);
        const product = await Product.create(req.body);
        res.status(200).send(product);
    } catch (error) {
        res.status(500).json({message:error.message});
    }    
    
};

const updateProduct = async(req,res)=>{
    try {
        const id = req.params.id;
        // const prod = await Product.findByIdAndUpdate(id, req.body); RETURNS UNUPDATED PROD
        const prod = await Product.findByIdAndUpdate(id, req.body,{new : true});
        if(!prod){
            res.status(404).json({"message":`Product Doesn't exist with ID ${id}`});
        }
        else{
        res.status(200).json({message:"Product Updated",prod});
        }
    } catch (error) {
        res.status(500).json({message:error.message});
    }
    
};

const deleteProduct = async (req,res)=>{
    try {
        const id = req.params.id;
        const prod = await Product.findByIdAndDelete(id);
        if(!prod){
            res.status(404).json({message:`Product Doesn't Exist with ID ${id}`});
        }
        else{
        res.status(200).json({message:"Product Deleted"});
        }
    } catch (error) {
        res.status(500).json({message:error.message});
    }
    
};

module.exports = {getProduct , createProduct , updateProduct, deleteProduct};