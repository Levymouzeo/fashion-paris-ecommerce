const db = require('../models');
const Address = db.Address;
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');

exports.getAllAddresses = async (req, res) => {
  try {
    const addresses = await Address.findAll();
    res.json(addresses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAddressById = async (req, res) => {
  try {
    const address = await Address.findByPk(req.params.id);
    if (!address) return res.status(404).json({ message: 'Adresse non trouvée' });
    res.json(address);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createAddress = async (req, res) => {
  try {
    const address = await Address.create(req.body);
    res.status(201).json(address);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const address = await Address.findByPk(req.params.id);
    if (!address) return res.status(404).json({ message: 'Adresse non trouvée' });
    await address.update(req.body);
    res.json(address);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const address = await Address.findByPk(req.params.id);
    if (!address) return res.status(404).json({ message: 'Adresse non trouvée' });
    await address.destroy();
    res.json({ message: 'Adresse supprimée' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};