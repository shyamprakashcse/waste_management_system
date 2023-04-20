const express = require("express")
const path = require("path")


// Multer File Upload. 
const multer = require('multer');
const fs = require('fs'); 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/prod_docs/') // Specify the upload directory
  },
  filename: function (req, file, cb) {  
    // create a folder which name is user code 
    const folderName = req.body.code;
    const location = path.join(process.cwd(), "./uploads/prod_docs", folderName, "/");
    
    fs.mkdir(location, (err) => {
        if (err) {
        console.error(err);
    } else {
          console.log('Folder created successfully');
        }
    }); 

    // changing the filename of the file for maintaining the uniqueness. 
    const parsedFilename = path.parse(file.originalname); 
    const filenameWithoutExt = parsedFilename.name; 

    var filepath = folderName+"/"+filenameWithoutExt + '_' + Date.now() + path.extname(file.originalname)
    file.originalname = filenameWithoutExt + '_' + Date.now() + path.extname(file.originalname)
    cb(null, filepath); // Specify the filename format
  }
});

const upload = multer({ storage: storage });
const products = require("../controller/product") 
const marketplaceRouter = express.Router() 
marketplaceRouter.get("/",products.listProducts) 
marketplaceRouter.post("/sellproduct",upload.array('files'),products.addProduct)
marketplaceRouter.post("/deleteproduct",upload.none(),products.deleteProduct)
marketplaceRouter.post("/fileupload",upload.array('files'),products.uploadTest)
module.exports = marketplaceRouter