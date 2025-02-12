import path from 'path';
import ProductModel, { userData } from '../models/product.model.js';


export default class ProductController {

  getProducts(req, res) {
    let products = ProductModel.get()
    //   console.log(products);

    return res.render("products", { products: products ,useremail : req.session.userEmail})
    // return res.sendFile(path.join(path.resolve(),"src",'views',"products.html" ));
  }

  getaddProduct(req, res) {
    return res.render("addProductForm", { errorMessage: null,useremail : req.session.userEmail });
  }
  showNewProductsList(req, res) {
    console.log(req.body);
    const { name, desc, price } = req.body;
    const imageUrl = "images/" + req.file.filename;
    ProductModel.addProduct(name, desc, price, imageUrl);
    let products = ProductModel.get()
    return res.render("products", { products: products,useremail : req.session.userEmail });
  }
  getUpdateProductform(req, res) {
    const id = req.params.id
    //   console.log(id);
    const productFound = ProductModel.getByid(id);
    //   console.log(productFound)
    if (productFound) {
      return res.render("updateProduct", { products: productFound, errorMessage: null,useremail : req.session.userEmail });
    } else {
      return res.send("Product Not Found")
    }
  }
  updateProductList(req, res) {
    console.log("🟡 Incoming Data for Update:", req.body);

    const updated = ProductModel.updateData(req.body);

    if (!updated) {
      return res.send("⚠️ Product not found. Unable to update.");
    }

    let products = ProductModel.get();
    console.log("🟢 Updated Products List:", products);

    return res.render("products", { products, errorMessage: null,useremail : req.session.userEmail });
  }
  deleteProduct(req, res) {
    const id = req.params.id
    ProductModel.deleteData(id);
    let products = ProductModel.get();
    return res.render("products", { products ,useremail : req.session.useremail});

  }

  RegisterForm(req, res) {
    return res.render("register",{ errorMessage: null });
  }
  loginForm(req, res) {
    return res.render("login", { errorMessage: null })
  }

  submitRegisterForm(req, res) {
    console.log(req.body)
    const {name , email,password } = req.body
    userData.add(name,email, password);
    return res.render("login", { errorMessage: null });
  }

  userLoginAuth(req, res) {
    console.log(req.body)
    const {email} = req.body
   const final =   userData.validUser(req.body);
   if(final){
    req.session.useremail = email;
   let products= ProductModel.get();
    return res.render("products",{products,errorMessage : null, useremail : req.session.useremail})
   }
   else{
    let error = "login Failed If you're a new user then register First";
    return res.render("login",{errorMessage: error})
   }
  }

  logout(req,res){
    
     req.session.destroy(err=>{
      if(err){
        console.log(err);
      } else{
        res.clearCookie("lastVisit");
        res.redirect("/login");
      }
       
    });
  }




}