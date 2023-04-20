const model_product = require("../models/product") 
const model_category = require("../models/category");
const mongoose = require("mongoose");
const path = require("path")
const fs = require("fs")



// Seller Post the details of the products which he/she wants to sell in the market place. 

const  addProduct = async (req,res,next)=>{
   
    // Reading the uploaded file in the middleware 
   var product_files = []

   req.files.forEach((file) => { 
       const parsedFilename = path.parse(file.originalname); 
       const filenameWithoutExt = parsedFilename.name; 
       let fileObj = {"file_name":filenameWithoutExt,"file_type":path.extname(file.originalname)}
       product_files.push(fileObj)
   }); 


    // fetching the category code from category name . 
   var category_name  = req.body.category; 
   var result = await model_category.findOne({category_name:category_name})
   if(result==null){
      product_files.forEach((fileObj)=>{
        filepath = "uploads/prod_docs/"+req.body.code+"/"+fileObj["file_name"]+fileObj["file_type"] 
        fs.unlink(filepath,(err)=>{
            if(err){
                console.log("Error while deleting a file"); 
                console.log(err)
            }
            else{
                console.log("file deleted successfully")
            }
        })
      })
      res.status(400).send({"code":400,"message":"Invalid Category Name. No data found error occurs while fetching"}); 
  
   } 

   if(result===null){
    return; 
   }

   // assigning the category_name to category code and available date. Date is not in the object type for testing we are modified.if it connect to frontend changes it mandatory.
   modified_category_name = result.category_name 
   modified_available_date = new Date()  

   
    
   const newProduct = new model_product({
    seller_id: req.body.seller_id,
    product_name: req.body.product_name,
    unit: req.body.unit,
    condition : req.body.condition,
    quantity: req.body.quantity,
    description: req.body.description,
    category: modified_category_name,
    currency: req.body.currency,
    price: req.body.price,
    pricing_term: req.body.pricing_term,
    location: req.body.location,
    available_date: modified_available_date,
    address_line_1: req.body.address_line_1,
    address_line_2: req.body.address_line_2,
    city: req.body.city,
    zip_code: req.body.zip_code,
    country: req.body.country,
    product_files: product_files,
    // auction_id: mongoose.Schema.Types.ObjectId
   })
  
  newProduct.save().then((resp)=>{
     console.log(resp); 
     res.status(200).send({"code":200,"message":"Product Inserted Successfully."})
  }).catch((err)=>{ 
    console.log("********************************************************")
    console.log()
    console.log()
    console.log(err); 
    console.log("********************************************************")
    console.log()
    console.log()

    // Deleting a uploaded file 
    product_files.forEach((fileObj)=>{
        filepath = "uploads/prod_docs/"+req.body.code+"/"+fileObj["file_name"]+fileObj["file_type"] 
        console.log(filepath)
        fs.unlink(filepath,(err)=>{
            if(err){
                console.log("Error while deleting a file"); 
                console.log(err)
            }
            else{
                console.log("file deleted successfully")
            }
        })
      }) 

    res.status(400).send({"code":400,"message":"Error occurs while inserting a product"})
  })
  

} 

// Display all the products in the Market Place for buyers
const listProducts = async (req,res)=>{
    try{
        var respdata = await model_product.find()
        console.log(respdata)
        if(respdata.length===0){
            res.status(200).send({"code":200,"message":"No Items found","res":{"items":respdata}})
        }
        else{
            res.status(200).send({"code":200,"message":"Fetched Successfully.","res":{"items":respdata}})
        }
    }
    catch{
        console.log(err); 
        res.status(400).send({"code":400,"message":"Error occurs while fetching the data"})
    }
   
}

// Delete a product in Market place UI . 
const deleteProduct = async (req,res)=>{
    const id = req.body.id; 
    model_product.findOneAndDelete({"_id":id}).then((deleted_item)=>{
        console.log(deleted_item)
        if(deleted_item === null){
            res.status(400).send({"code":400,"message":"Invalid Item ID to delete . No Items found."}) 

        }
        else{
        var product_files = deleted_item["product_files"]
        // Deleting a uploaded file 
        product_files.forEach((fileObj)=>{
        filepath = "uploads/prod_docs/"+req.body.code+"/"+fileObj["file_name"]+fileObj["file_type"] 
        console.log(filepath)
        fs.unlink(filepath,(err)=>{
            if(err){
                console.log("Error while deleting a file"); 
                console.log(err)
            }
            else{
                console.log("file deleted successfully")
            }
        })
      }) 
        res.status(200).send({"code":200,"message":"Deleted an Item Successfully."}) 
        }

    }).catch((err)=>{
        console.log(err); 
        res.status(400).send({"code":400,"message":"Error occurs while deleting an item"})
    })
}

// Testing API 
const uploadTest =  (req,res,next)=>{
    var product_files = []

    req.files.forEach((file) => { 
        const parsedFilename = path.parse(file.originalname); 
        const filenameWithoutExt = parsedFilename.name; 
        let fileObj = {"file_name":filenameWithoutExt,"file_type":path.extname(file.originalname)}
        product_files.push(fileObj)
    });
    
   res.status(200).send({"res":product_files})
}
module.exports = {addProduct,listProducts,deleteProduct,uploadTest}