const db = require('../models');
const sampleProducts = require('./sampleProducts');

const seedProducts = async () => {
  try {
    // Vérifier si les catégories existent, sinon les créer
    const categories = await db.Category.findAll();
    if (categories.length === 0) {
      await db.Category.bulkCreate([
        { name: 'Vêtements', description: 'Vêtements élégants et tendance' },
        { name: 'Accessoires', description: 'Accessoires de mode et bijoux' },
        { name: 'Chaussures', description: 'Chaussures confortables et stylées' }
      ]);
      console.log('Catégories créées');
    }

    // Vérifier si des produits existent déjà
    const existingProducts = await db.Product.findAll();
    if (existingProducts.length === 0) {
      // Ajouter les produits d'exemple
      await db.Product.bulkCreate(sampleProducts);
      console.log('Produits d\'exemple ajoutés avec succès !');
    } else {
      console.log('Des produits existent déjà dans la base de données.');
    }

    // Afficher le nombre de produits
    const productCount = await db.Product.count();
    console.log(`Nombre total de produits dans la base : ${productCount}`);

  } catch (error) {
    console.error('Erreur lors de l\'ajout des produits :', error);
  }
};

module.exports = seedProducts; 