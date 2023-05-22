const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const productManager = new ProductManager('products.json');

app.get('/products', async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productManager.getProducts();
    
    if (limit) {
      const limitedProducts = products.slice(0, parseInt(limit));
      res.json(limitedProducts);
    } else {
      res.json(products);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve products.' });
  }
});

app.get('/products/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductById(parseInt(pid));

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve product.' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
