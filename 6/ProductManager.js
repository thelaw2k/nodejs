const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  getProducts() {
    if (!fs.existsSync(this.path)) {
      return [];
    }
    try {
      const fileData = fs.readFileSync(this.path, 'utf-8');
      return JSON.parse(fileData);
    } catch (error) {
      return [];
    }
  }

  getProductById(productId) {
    const products = this.getProducts();
    for (const product of products) {
      if (product.id === productId) {
        return product;
      }
    }
    return null;
  }

  _getNextId(products) {
    if (products.length === 0) {
      return 1;
    } else {
      return products[products.length - 1].id + 1;
    }
  }

  _saveProducts(products) {
    const data = JSON.stringify(products, null, 2);
    fs.writeFileSync(this.path, data);
  }
}

// Crear una instancia de ProductManager con la ruta del archivo
const productManager = new ProductManager('products.json');

//// Obtener todos los productos
const products = productManager.getProducts();
//console.log(products);

//// Obtener un producto por su ID
//const productId = 1;
//const product = productManager.getProductById(productId);
//console.log(product);

module.exports = ProductManager;