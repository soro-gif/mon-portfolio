# mon-portfolio

Portfolio fullstack pour SORO Lamoussa, Data Scientist / Développeur IA.

## Stack
- Laravel (backend API)
- React.js + Vite (frontend)
- MySQL (base de données)

## Structure
- `backend/` : API Laravel
- `frontend/` : application React
- `docker-compose.yml` : instance MySQL locale

## Démarrage rapide

### 1) Base de données MySQL
```bash
docker compose up -d
```

### 2) Backend Laravel
```bash
cd backend
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate
php artisan serve
```

### 3) Frontend React
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

## API
- `GET /api/portfolio`
- `GET /api/portfolio/projects`
- `GET /api/portfolio/experiences`
- `GET /api/portfolio/skills`
- `POST /api/contact`

## Personnalisation
Modifiez les données dans :
- `backend/database/migrations/...` pour les schémas
- `backend/routes/api.php` pour l’API
- `frontend/src/data/portfolio.js` pour le contenu du portfolio

## Déploiement
Le projet est prêt pour un déploiement sur un serveur avec PHP, Node.js et MySQL.
