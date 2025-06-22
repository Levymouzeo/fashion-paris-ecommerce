/fashion-paris-ecommerce
│
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── middlewares/
│ │ ├── services/
│ │ ├── utils/
│ │ └── app.js
│ ├── config/
│ ├── migrations/
│ ├── seeders/
│ ├── uploads/
│ ├── .env
│ ├── package.json
│ └── README.md
│
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ │ ├── common/
│ │ │ ├── product/
│ │ │ ├── cart/
│ │ │ ├── user/
│ │ │ └── admin/
│ │ ├── pages/
│ │ │ ├── index.js # Accueil
│ │ │ ├── catalogue/
│ │ │ ├── produit/
│ │ │ ├── panier.js
│ │ │ ├── commande.js
│ │ │ ├── compte/
│ │ │ ├── blog/
│ │ │ └── admin/
│ │ ├── styles/
│ │ ├── utils/
│ │ ├── hooks/
│ │ └── context/
│ ├── .env
│ ├── package.json
│ └── README.md
│
├── database/
│ ├── schema.sql
│ └── seed.sql
│
├── docs/
│ ├── wireframes/
│ ├── specifications.md
│ └── formation/
│
├── scripts/
│ └── backup.sh
│
├── .gitignore
├── README.md
└── docker-compose.yml

backend/ : Code serveur, API, gestion des données, sécurité, intégrations.
frontend/ : Application React/Next.js, pages, composants, styles.
database/ : Scripts SQL pour la structure et les données de base.
docs/ : Documentation, wireframes, guides de formation.
scripts/ : Scripts utilitaires (sauvegarde, maintenance).
docker-compose.yml : Pour lancer facilement l’ensemble en local ou en production.
