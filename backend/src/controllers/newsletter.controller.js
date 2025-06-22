const db = require('../models');
const Newsletter = db.Newsletter;

exports.getAllNewsletters = async (req, res) => {
  try {
    const newsletters = await Newsletter.findAll();
    res.json(newsletters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getNewsletterById = async (req, res) => {
  try {
    const newsletter = await Newsletter.findByPk(req.params.id);
    if (!newsletter) return res.status(404).json({ message: 'Inscription non trouvée' });
    res.json(newsletter);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createNewsletter = async (req, res) => {
  try {
    const newsletter = await Newsletter.create(req.body);
    res.status(201).json(newsletter);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteNewsletter = async (req, res) => {
  try {
    const newsletter = await Newsletter.findByPk(req.params.id);
    if (!newsletter) return res.status(404).json({ message: 'Inscription non trouvée' });
    await newsletter.destroy();
    res.json({ message: 'Inscription supprimée' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 