import express from 'express';
import Product from '../models/Product.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/login', (req, res) => {
  res.render('admin/login');
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'bolinho') {
    req.session.isAdmin = true;
    res.redirect('/admin/dashboard');
  } else {
    res.render('admin/login', { error: 'Credenciais inválidas' });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

router.get('/dashboard', auth, async (req, res) => {
  try {
    const products = await Product.find();
    res.render('admin/dashboard', { products });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao carregar produtos');
  }
});

router.get('/product/add', auth, (req, res) => {
  res.render('admin/product-form');
});

router.post('/product/add', auth, async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao adicionar produto');
  }
});

router.get('/product/edit/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render('admin/product-form', { product });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao carregar produto');
  }
});

router.post('/product/edit/:id', auth, async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao editar produto');
  }
});

router.post('/product/delete/:id', auth, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao excluir produto');
  }
});

export default router;