export default class ProductModel {

  constructor(_id, _name, _desc, _price, _imageUrl) {
    this.id = _id;
    this.name = _name;
    this.desc = _desc;
    this.price = _price;
    this.imageUrl = _imageUrl
  }
  static get() {
    return products;
  }
  static addProduct(name, desc, price, imageUrl) {

    let newProduct = new ProductModel(products.length + 1, name, desc, price, imageUrl)
    return products.push(newProduct);
  }
  static getByid(id) {
    return products.find(p => p.id == id);
  }
  static updateData(product) {
    let { id, name, desc, price, imageUrl } = product;

    id = Number(id);  // Convert id to a number to match stored IDs

    const existingProduct = products.find(p => p.id === id);

    if (!existingProduct) {
      console.log("⚠️ Product not found, update failed.");
      return false;  // Return false if product is not found
    }

    // Modify the existing object (this updates the original array)
    existingProduct.name = name;
    existingProduct.desc = desc;
    existingProduct.price = price;
    existingProduct.imageUrl = imageUrl;

    console.log("✅ Product updated successfully:", existingProduct);
    return true;
  }
  static deleteData(id) {
    let index = products.findIndex(p => p.id == id);
    products.splice(index, 1)

  }
}

var products = [
  new ProductModel(
    1,
    'Product 1',
    'Description for Product 1',
    19.99,
    'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
  ),
  new ProductModel(
    2,
    'Product 2',
    'Description for Product 2',
    29.99,
    'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
  ),
  new ProductModel(
    3,
    'Product 3',
    'Description for Product 3',
    39.99,
    'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
  ),
]

// login data
  export  class userData {
    constructor(_id,_name,_email,_password){
      this.id = _id;
      this.name = _name;
      this.email = _email;
      this.password = _password;
    }
    static add(name,email,password){
    const newUser = new userData(users.length+1 , name,email,password)
    users.push(newUser);
    }
  static validUser(user){
  const result =  users.find(u=> u.email == user.email && u.password == user.password)
  return result;
  }
 

}
const users = [];