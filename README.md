# mon-portfolio

Portfolio fullstack de SORO Lamoussa, Data Scientist / Développeur IA.

## Stack
- Laravel (backend API)
- React.js + Vite (frontend)
- MySQL (base de données)
- Vercel (déploiement du frontend)

## Déploiement sur Vercel

Le frontend React est prêt à être déployé sur Vercel.

### Avec le tableau de bord Vercel

1. Connectez-vous à [vercel.com](https://vercel.com).
2. Cliquez sur **Add New Project**.
3. Importez `soro-gif/mon-portfolio`.
4. Conservez la configuration détectée depuis `vercel.json`.
5. Ajoutez la variable d’environnement suivante si l’API Laravel est déjà déployée :

```env
VITE_API_URL=https://votre-api-laravel.example.com/api
```

6. Cliquez sur **Deploy**.

### Avec Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

Le fichier `vercel.json` configure automatiquement :

- l’installation des dépendances dans `frontend/` ;
- la commande `npm run build` ;
- le répertoire de sortie `frontend/dist` ;
- le fallback SPA vers `index.html`.

## Important : API Laravel et MySQL

Vercel convient au déploiement du frontend React, mais l’API Laravel et MySQL doivent être déployés séparément. Vous pouvez héberger le backend Laravel sur Laravel Cloud, Render, Railway ou un serveur VPS, et MySQL sur un service compatible.

Après le déploiement Laravel, définissez `VITE_API_URL` dans Vercel avec l’URL publique de l’API, puis relancez le déploiement frontend.

## Développement local

### Base de données MySQL

```bash
docker compose up -d
```

### Backend Laravel

```bash
cd backend
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate
php artisan serve
```

### Frontend React

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```
