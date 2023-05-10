class ProductManager {
    constructor(products = []) {
      this.products = products;
      this.currentId = 1;
    }
  
    addProduct(product) {
      if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
        console.log("Error: Todos los campos son obligatorios.");
        return;
      }
      if (this.products.some(p => p.code === product.code)) {
        console.log("Error: El código del producto ya existe.");
        return;
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
        console.log("Not found");
        return;
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
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25
  });
  
  const nonExistentProduct = productManager.getProductById(567);
  