import express from 'express'
import ProductController from './src/controllers/product.controller.js';
import ejslayouts from "express-ejs-layouts"

import path from 'path';

const server = express();
 
// setup view engine settings
server.set("view engine", "ejs");
// path of our views
server.set("views", path.join(path.resolve(),"src",'views')); 
server.use(ejslayouts);

// create an instance of ProductController
const productController = new ProductController(); 
server.get('/', (productController.getProducts));
server.get("/productForm",productController.getaddProduct);

server.use(express.static('src/views'));
// middleware for new product list post req
server.use(express.urlencoded({extended : true})); 
server.post("/",productController.showNewProductsList);

server.listen(3000);
console.log('Server is listening on port 3000');