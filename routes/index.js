import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.render('home', { products });
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).render('home', { products: [], error: 'Erro ao carregar produtos' });
  }
});

// Rota temporária para adicionar um produto de teste
router.get('/add-test-product', async (req, res) => {
  try {
    const testProduct = new Product({
      title: "Produto de Teste",
      description: "Este é um produto de teste.",
      price: 19.99,
      thumbnail: "https://via.placeholder.com/150",
      code: "TEST_PRODUCT",
      stock: 10
    });
    await testProduct.save();
    res.send('Produto de teste adicionado com sucesso!');
  } catch (error) {
    console.error('Erro ao adicionar produto de teste:', error);
    res.status(500).send('Erro ao adicionar produto de teste');
  }
});

export default router;