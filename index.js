import express from 'express'
import ProductController from './src/controllers/product.controller.js';
import ejslayouts from "express-ejs-layouts"
import { validationRequest } from './src/middleware/formValidation.js';
import { uploadFile } from './src/middleware/fileUploadmiddleware.js';

import path from 'path';
import session from 'express-session';
import { auth } from './src/middleware/loginauth.js';

const server = express();
 
// setup view engine settings
server.set("view engine", "ejs");
// path of our views
server.set("views", path.join(path.resolve(),"src",'views')); 
server.use(ejslayouts);
server.use(express.static("src/public"));

// session
server.use(session({
    secret : "Secretkey",
    resave : false,
    saveUninitialized : true,
    cookie : {secure : false},
}));
// create an instance of ProductController
const productController = new ProductController(); 
server.get('/',auth,(productController.getProducts));
server.get("/productForm",auth,productController.getaddProduct);

server.use(express.static('src/views'));
// middleware for new product list post req
// server.use(express.urlencoded({extended : true})); 
server.post("/",auth,uploadFile.single("imageUrl"),validationRequest,productController.showNewProductsList);

// updated products
server.get("/updateProduct/:id",auth,productController.getUpdateProductform);
server.post("/updateProduct",auth,validationRequest,productController.updateProductList);

// deletion product 
server.post("/deleteProduct/:id",auth,productController.deleteProduct);
// for this data i have to use the url encoded data to parse the data
server.use(express.urlencoded({extended:true}));
server.get("/register",productController.RegisterForm);
server.get("/login",productController.loginForm);
server.post("/register",productController.submitRegisterForm);
server.post("/register",productController.submitRegisterForm);
server.post("/login",productController.userLoginAuth);


server.listen(3000);
console.log('Server is listening on port 3000');