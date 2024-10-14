import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

router.post('/add', async (req, res) => {
  const { productId, quantity } = req.body;
  
  if (!req.session.cart) {
    req.session.cart = [];
  }

  const existingItem = req.session.cart.find(item => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += parseInt(quantity);
  } else {
    req.session.cart.push({ productId, quantity: parseInt(quantity) });
  }

  res.redirect('/cart');
});

router.get('/', async (req, res) => {
  if (!req.session.cart) {
    return res.render('cart', { items: [] });
  }

  try {
    const cartItems = await Promise.all(req.session.cart.map(async (item) => {
      const product = await Product.findById(item.productId);
      return {
        ...product._doc,
        quantity: item.quantity
      };
    }));

    res.render('cart', { items: cartItems });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao carregar o carrinho');
  }
});

router.post('/remove', (req, res) => {
  const { productId } = req.body;
  
  if (req.session.cart) {
    req.session.cart = req.session.cart.filter(item => item.productId !== productId);
  }

  res.redirect('/cart');
});

export default router;