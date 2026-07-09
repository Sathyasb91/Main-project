const prodSchema = require("../model/prod-schema");
const express = require("express");
const multer = require("multer");
const route = express.Router();
const path = require("path");

const storage = multer.diskStorage({
  destination: './imageupload',
  filename: (req, file, cb)=> cb(null, file.originalname)
  });

const upload = multer({ storage: storage }).single('image');

const productcontrol = async (req, res) => {
  try {
    const { productid, productname, quantity, price, category} = req.body;
    const image = req.file || null;

    if (!productid || !productname || !quantity || !price || !category) {
      return res.status(400).json({
        msg: "Required",
      });
    }

    const existing = await prodSchema.findOne({ productid });
    if (existing) {
      return res.status(400).json({
        msg: "Product ID already exists",
      });
    }

    const newProd = new prodSchema({
      productid,
      productname,
      quantity,
      price,
      image,
      category,
    });
    await newProd.save();
    return res.status(200).json({
      status: "200",
      msg: "Product details entered successfully",
    });
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};

//find all products
const productlist = async (req, res) => {
  try {
    const prodlist = await prodSchema.find();
    console.log(prodlist);
    res.status(200).json(prodlist);
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

//find all by id
const findprodbyid = (req, res) => {
  const productlist = req.params.id;
  prodSchema
    .findById({ _id: productlist })
    .then((output) => {
      res.status(200).json({
        data: output,
      });
    })
    .catch((error) => {
      res.status(500).json({
        data: error,
      });
    });
};

//find by id and update
const findprodbyidandupdate = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedprod = await prodSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedprod)
      return res.status(400).json({
        msg: "Product not found",
      });
    res.json(updatedprod);
  } catch (err) {
    res.status(500).json({
      data: err,
    });
  }
};

//find by id and delete
const findprodbyidanddelete = (req, res) => {
  const findbyidanddelete = req.params.id;
  prodSchema
    .findByIdAndDelete({ _id: findbyidanddelete })
    .then((output2) => {
      res.status(200).json({
        msg: "Product deleted successfully",
      });
    })
    .catch((error) => {
      res.status(500).json({
        data: error,
      });
    });
};


const getByCategory = async(req,res) => {


  try{
    let {category} =req.params;

     category = category.charAt(0).toUpperCase() + category.slice(1);
    const products = await prodSchema.find({category});
     res.status(200).json(products);
  }catch(error) {
    res.status(500).json({msg: "Error while fetching category"});
  }
};

module.exports = {
  upload,
  productcontrol,
  productlist,
  findprodbyid,
  findprodbyidandupdate,
  findprodbyidanddelete,
  getByCategory,
};
