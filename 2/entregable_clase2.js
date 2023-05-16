class ProductManager {
    constructor(products = []) {
      this.products = products;
      this.currentId = 1;
    }
  
    addProduct(product) {
      if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
        return("Error: Todos los campos son obligatorios.");
      }
      if (this.products.some(p => p.code === product.code)) {
        return("Error: El código del producto ya existe.");
      }
      product.id = this.currentId++;
      this.products.push(product);
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const product = this.products.find(p => p.id === id);
      if (!product) {
        return("Not found");
      }
      return product;
    }
  }

  const productManager = new ProductManager();

  const products = productManager.getProducts();
  console.log(products);

  productManager.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25
  });

  console.log(products);
  
  productManager.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba2",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc12322",
    stock: 25
  });
  
  const nonExistentProduct = productManager.getProductById(567);
  