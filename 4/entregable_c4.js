const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  addProduct(product) {
    const products = this.getProducts();
    product.id = this._getNextId(products);
    products.push(product);
    this._saveProducts(products);
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

  updateProduct(productId, updatedProduct) {
    const products = this.getProducts();
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === productId) {
        products[i] = { ...products[i], ...updatedProduct };
        this._saveProducts(products);
        return true;
      }
    }
    return false;
  }

  deleteProduct(productId) {
    const products = this.getProducts();
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === productId) {
        products.splice(i, 1);
        this._saveProducts(products);
        return true;
      }
    }
    return false;
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

// Agregar un producto
const product1 = {
  title: 'producto prueba',
  description: 'Este es un producto prueba',
  price: 200,
  thumbnail: 'Sin imagen',
  code: 'abc123',
  stock: 25,
};
productManager.addProduct(product1);

// Obtener todos los productos
const products = productManager.getProducts();
console.log(products);

// Obtener un producto por su ID
const productId = 1;
const product = productManager.getProductById(productId);
console.log(product);

// Actualizar un producto
const updatedProduct = {
  title: 'Producto 1 Actualizado',
  price: 15.99,
};
productManager.updateProduct(productId, updatedProduct);

// Eliminar un producto
productManager.deleteProduct(productId);