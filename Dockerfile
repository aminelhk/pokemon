# Étape 1 : Construction de l'application
FROM node:14-alpine AS build

# Créer et définir le répertoire de travail
WORKDIR /app

# Copier uniquement les fichiers nécessaires pour l'installation des dépendances
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier le reste de l'application
COPY . .

# Construire l'application React
RUN npm run build

# Étape 2 : Image finale
FROM node:14-alpine

# Installer un serveur léger pour servir l'application
RUN npm install -g serve

# Créer et définir le répertoire de travail
WORKDIR /app

# Copier uniquement les fichiers de build depuis l'étape de construction
COPY --from=build /app/build /app/build

# Exposer le port sur lequel l'application sera accessible
EXPOSE 3000

# Démarrer l'application avec 'serve'
CMD ["serve", "-s", "build", "-l", "3000"]
