<<<<<<< HEAD

# Fashion Paris E-commerce

Ce projet est une application web e-commerce complète pour une boutique de mode fictive appelée "Fashion Paris". Il comprend un front-end React et un back-end Node.js avec une base de données MySQL.

## Fonctionnalités

### Frontend (React)

- **Authentification des utilisateurs :** Inscription et connexion avec gestion des sessions par token JWT.
- **Catalogue de produits :** Affichage des produits par catégories, avec recherche et pagination.
- **Page de détail produit :** Vue détaillée pour chaque produit avec description, prix et avis clients.
- **Panier d'achat :** Ajout, modification et suppression de produits dans le panier.
- **Processus de commande :** Tunnel de commande sur plusieurs étapes avec simulation de paiement.
- **Espace client :** Consultation de l'historique des commandes, gestion des adresses et du profil.
- **Tableau de bord administrateur :**
  - Gestion des produits (CRUD).
  - Gestion des catégories (CRUD).
  - Gestion des commandes.
  - Gestion des utilisateurs.
- **Blog :** Section avec des articles de blog.
- **Newsletter :** Formulaire d'inscription à la newsletter.
- **Design responsive :** Interface adaptable aux différentes tailles d'écran grâce à Tailwind CSS.

### Backend (Node.js / Express)

- **API RESTful :** Endpoints clairs et structurés pour toutes les ressources (produits, utilisateurs, commandes, etc.).
- **ORM Sequelize :** Modélisation de la base de données et gestion des requêtes SQL.
- **Authentification et Autorisation :** Sécurisation des routes avec JWT. Middlewares pour vérifier les rôles (ex: `isAdmin`).
- **Gestion des utilisateurs :** Hachage des mots de passe (`bcryptjs`) pour la sécurité.
- **Gestion des images :** Upload d'images pour les produits en utilisant `multer`.
- **Logique métier :** Gestion des stocks, validation des commandes, etc.

## Stack Technique

- **Backend :** Node.js, Express.js
- **Frontend :** React, React Router, Context API
- **Base de données :** MySQL
- **ORM :** Sequelize
- **Authentification :** JSON Web Tokens (JWT)
- **Styling :** Tailwind CSS
- **Gestion des images :** Multer

## Structure du Projet

```
fashion-paris-ecommerce/
├── backend/         # Contient le code du serveur Node.js/Express
│   ├── src/
│   ├── config/
│   └── ...
├── frontend/        # Contient le code de l'application React
│   ├── src/
│   └── public/
└── database/        # Scripts SQL pour la structure et les données initiales
```

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les logiciels suivants sur votre machine :

- [Node.js](https://nodejs.org/) (v14 ou supérieur)
- [npm](https://www.npmjs.com/) (généralement inclus avec Node.js)
- Un serveur de base de données [MySQL](https://www.mysql.com/) (ou un outil comme WAMP/MAMP/XAMPP)

## Installation et Lancement

1.  **Cloner le dépôt**

    ```bash
    git clone https://github.com/Levymouzeo/fashion-paris-ecommerce.git
    cd fashion-paris-ecommerce
    ```

2.  **Configurer la base de données**

    - Assurez-vous que votre serveur MySQL est en cours d'exécution.
    - Créez une base de données nommée `fashion_paris`.
    - Vous pouvez utiliser le fichier `database/schema.sql` pour créer les tables.

3.  **Configurer et lancer le Backend**

    ```bash
    # Aller dans le dossier du backend
    cd backend

    # Installer les dépendances
    npm install

    # Créer un fichier .env à la racine de /backend et y ajouter les informations de connexion à la BDD
    # Inspirez-vous du modèle ci-dessous :
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=votremotdepasse
    DB_NAME=fashion_paris
    JWT_SECRET=votreclefsecrete

    # Lancer le serveur backend
    npm start
    ```

    Le serveur devrait tourner sur `http://localhost:3001`.

4.  **Configurer et lancer le Frontend**

        ```bash
        # Depuis la racine du projet, aller dans le dossier du frontend
        cd ../frontend

        # Installer les dépendances
        npm install

        # Lancer l'application React
        npm start
        ```

        L'application devrait s'ouvrir automatiquement sur `http://localhost:3000`.

    =======
