const express = require('express');
const cors = require('cors');
const app = express();

// Configuration CORS pour permettre l'accès depuis le frontend
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use('/api/products', require('./routes/product.routes'));
app.use('/api/address', require ('./routes/address.routes'));
app.use('/api/blogposts', require('./routes/blogPost.routes'));
app.use('/api/categories', require('./routes/category.routes'));
app.use('/api/newsletters', require('./routes/newsletter.routes'));
app.use('/api/orders', require('./routes/order.routes'));
app.use('/api/orderitems', require('./routes/orderItem.routes'));
app.use('/api/reviews', require('./routes/review.routes'));
app.use('/api/users', require('./routes/user.routes'));

const db = require('./models'); // adapte le chemin si besoin
db.sequelize.sync({ alter: true })
  .then(() => console.log('Tables synchronisées avec la base de données !'))
  .catch(err => console.error('Erreur de synchronisation :', err));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
