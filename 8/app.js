const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

// Rutas para los productos
const productsRouter = express.Router();

productsRouter.get('/', (req, res) => {
  // Obtener todos los productos de la base (archivo productos.json)
  const products = JSON.parse(fs.readFileSync('productos.json', 'utf-8'));
  // Aplicar la limitación si se proporciona el parámetro ?limit
  const limit = req.query.limit;
  const limitedProducts = limit ? products.slice(0, parseInt(limit)) : products;
  res.json(limitedProducts);
});

productsRouter.get('/:pid', (req, res) => {
  // Obtener un producto por su id
  const pid = req.params.pid;
  const products = JSON.parse(fs.readFileSync('productos.json', 'utf-8'));
  const product = products.find(p => p.id === pid);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

productsRouter.post('/', (req, res) => {
  // Agregar un nuevo producto
  const product = req.body;
  const products = JSON.parse(fs.readFileSync('productos.json', 'utf-8'));
  product.id = uuidv4(); // Generar un nuevo id único
  products.push(product);
  fs.writeFileSync('productos.json', JSON.stringify(products, null, 2));
  res.status(201).json(product);
});

productsRouter.put('/:pid', (req, res) => {
  // Actualizar un producto por su id
  const pid = req.params.pid;
  const updatedProduct = req.body;
  const products = JSON.parse(fs.readFileSync('productos.json', 'utf-8'));
  const index = products.findIndex(p => p.id === pid);
  if (index !== -1) {
    products[index] = { ...products[index], ...updatedProduct, id: pid };
    fs.writeFileSync('productos.json', JSON.stringify(products, null, 2));
    res.json(products[index]);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

productsRouter.delete('/:pid', (req, res) => {
  // Eliminar un producto por su id
  const pid = req.params.pid;
  const products = JSON.parse(fs.readFileSync('productos.json', 'utf-8'));
  const index = products.findIndex(p => p.id === pid);
  if (index !== -1) {
    const deletedProduct = products.splice(index, 1)[0];
    fs.writeFileSync('productos.json', JSON.stringify(products, null, 2));
    res.json(deletedProduct);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

app.use('/api/products', productsRouter);

// Rutas para los carritos
const cartsRouter = express.Router();

cartsRouter.post('/', (req, res) => {
  // Crear un nuevo carrito
  const cart = {
    id: uuidv4(),
    products: []
  };
  fs.writeFileSync('carrito.json', JSON.stringify(cart, null, 2));
  res.status(201).json(cart);
});

cartsRouter.get('/:cid', (req, res) => {
  // Listar los productos del carrito por su id
  const cid = req.params.cid;
  const cart = JSON.parse(fs.readFileSync('carrito.json', 'utf-8'));
  if (cart.id === cid) {
    res.json(cart.products);
  } else {
    res.status(404).json({ error: 'Carrito no encontrado' });
  }
});

cartsRouter.post('/:cid/product/:pid', (req, res) => {
  // Agregar un producto al carrito
  const cid = req.params.cid;
  const pid = req.params.pid;
  const quantity = req.body.quantity || 1;
  const cart = JSON.parse(fs.readFileSync('carrito.json', 'utf-8'));
  if (cart.id === cid) {
    const productIndex = cart.products.findIndex(p => p.product === pid);
    if (productIndex !== -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ product: pid, quantity });
    }
    fs.writeFileSync('carrito.json', JSON.stringify(cart, null, 2));
    res.json(cart);
  } else {
    res.status(404).json({ error: 'Carrito no encontrado' });
  }
});

app.use('/api/carts', cartsRouter);

// Iniciar el servidor en el puerto 8080
app.listen(8080, () => {
  console.log('Servidor iniciado en el puerto 8080');
});
