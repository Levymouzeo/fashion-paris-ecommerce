const db = require('../models');
const Product = db.Product;
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');
const upload = require('../middlewares/upload');
const { Op } = require("sequelize");
const seedProducts = require('../utils/seedProducts');

exports.getAllProducts = async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
};

exports.getProductById = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ message: 'Produit non trouvé' });
  res.json(product);
};

exports.createProduct = async (req, res) => {
  const image = req.file ? req.file.filename : null;
  const product = await Product.create({ ...req.body, image });
  res.status(201).json(product);
};

exports.updateProduct = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ message: 'Produit non trouvé' });
  await product.update(req.body);
  res.json(product);
};

exports.deleteProduct = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ message: 'Produit non trouvé' });
  await product.destroy();
  res.json({ message: 'Produit supprimé' });
};

exports.searchProducts = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ message: "Le terme de recherche est manquant." });
    }

    const products = await Product.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${q}%` } },
          { description: { [Op.like]: `%${q}%` } }
        ]
      }
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.seedSampleProducts = async (req, res) => {
  try {
    await seedProducts();
    res.json({ message: 'Produits d\'exemple ajoutés avec succès !' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

router.post('/', auth, isAdmin, upload.single('image'), exports.createProduct);
router.post('/seed', exports.seedSampleProducts);
