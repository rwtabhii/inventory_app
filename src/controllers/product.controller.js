import path from 'path';
import ProductModel from '../models/product.model.js';

export default class ProductController{

    getProducts(req,res){
        let products = ProductModel.get()
        console.log(products);
        return res.render("products",{products: products})
        // return res.sendFile(path.join(path.resolve(),"src",'views',"products.html" ));
    }

    getaddProduct(req,res){
       return  res.render("addProductForm");
    }
    showNewProductsList(req,res){
      console.log(req.body);
      ProductModel.addProduct(req.body);
      let products = ProductModel.get()
      return res.render("products",{products:products});
     }
}