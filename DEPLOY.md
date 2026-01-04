# 🚀 ASH Talents Marketplace - Guide de Déploiement Simple

## ⚠️ IMPORTANT: Tous les fichiers ne sont pas encore créés!

Ce repository contient seulement la structure de base. Pour compléter le projet:

## 📋 Étapes Simples (AUCUNE connaissance technique requise)

### ÉTAPE 1: Télécharger GitHub Desktop
1. Allez sur: https://desktop.github.com/
2. Téléchargez et installez GitHub Desktop
3. Connectez-vous avec votre compte GitHub (EliZQSD)

### ÉTAPE 2: Cloner ce Repository
1. Ouvrez GitHub Desktop
2. Cliquez sur "File" → "Clone Repository"
3. Cherchez "ash-talents-marketplace" dans la liste
4. Cliquez "Clone"
5. GitHub Desktop va télécharger le projet sur votre ordinateur

### ÉTAPE 3: Ouvrir le Dossier
1. Dans GitHub Desktop, cliquez sur "Repository" → "Show in Explorer" (Windows) ou "Show in Finder" (Mac)
2. Vous verrez le dossier du projet

### ÉTAPE 4: Ajouter Tous les Fichiers Manquants
**JE VAIS VOUS ENVOYER UN FICHIER ZIP COMPLET PAR MESSAGE**

Ce fichier ZIP contiendra:
- ✅ Tous les fichiers backend (NestJS)
- ✅ Tous les fichiers frontend (Next.js)
- ✅ Toutes les configurations

Vous devrez simplement:
1. Extraire le ZIP
2. Copier tous les fichiers dans le dossier ash-talents-marketplace
3. Dans GitHub Desktop, vous verrez tous les nouveaux fichiers
4. Écrire un message de commit: "Add all project files"
5. Cliquer sur "Commit to main"
6. Cliquer sur "Push origin" (en haut)

### ÉTAPE 5: Déployer le Backend sur Railway

1. **Créer un compte Railway:**
   - Allez sur https://railway.app
   - Cliquez "Login with GitHub"
   - Autorisez Railway

2. **Déployer:**
   - Cliquez "New Project"
   - Sélectionnez "Deploy from GitHub repo"
   - Cherchez "ash-talents-marketplace"
   - Railway va détecter automatiquement le backend NestJS

3. **Ajouter la Base de Données:**
   - Dans votre projet Railway, cliquez "+ New"
   - Sélectionnez "Database" → "PostgreSQL"
   - Railway va créer automatiquement la base de données

4. **Configurer les Variables:**
   - Cliquez sur votre service backend
   - Allez dans "Variables"
   - Ajoutez ces variables (Railway remplira automatiquement les valeurs de la DB):
     ```
     DATABASE_URL=(Railway le remplit automatiquement)
     JWT_SECRET=ash-talents-secret-key-2024
     STRIPE_SECRET_KEY=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
     PORT=3001
     NODE_ENV=production
     ```

5. **Copier l'URL du Backend:**
   - Une fois déployé, Railway vous donnera une URL comme:
   - `https://votre-app.up.railway.app`
   - **COPIEZ CETTE URL** (vous en aurez besoin pour le frontend)

### ÉTAPE 6: Déployer le Frontend sur Vercel

1. **Créer un compte Vercel:**
   - Allez sur https://vercel.com
   - Cliquez "Sign Up with GitHub"
   - Autorisez Vercel

2. **Déployer:**
   - Cliquez "Add New..." → "Project"
   - Cherchez "ash-talents-marketplace"
   - Cliquez "Import"

3. **Configurer le Projet:**
   - **Root Directory:** Tapez `frontend` (IMPORTANT!)
   - **Framework Preset:** Next.js (auto-détecté)

4. **Ajouter les Variables d'Environnement:**
   - Dans "Environment Variables", ajoutez:
     ```
     NEXT_PUBLIC_API_URL = https://votre-backend-railway.up.railway.app
     NEXT_PUBLIC_STRIPE_PUBLIC_KEY = pk_live_51SljWtJXIISTBfU2W1Ho10T6obQuWBCqFcnpuHT8CkJn15XWCC43lnRHmq4i3iE8f8xCJrFAFUIBwGFclC729uU400HNwcJC4e
     ```
   - **Remplacez l'URL par celle de votre backend Railway!**

5. **Cliquer sur "Deploy"**
   - Vercel va construire et déployer votre frontend
   - Vous aurez une URL comme: `https://votre-app.vercel.app`

### ÉTAPE 7: Tester l'Application

1. Ouvrez l'URL Vercel dans votre navigateur
2. Vous devriez voir la page de login
3. Utilisez ces identifiants de test:
   - **Email:** admin@ashtalents.com
   - **Mot de passe:** admin123

4. Si ça fonctionne, vous verrez le dashboard! 🎉

## 🆘 En Cas de Problème

Si quelque chose ne fonctionne pas:

1. **Backend ne démarre pas sur Railway:**
   - Vérifiez que toutes les variables d'environnement sont bien ajoutées
   - Regardez les logs dans Railway (onglet "Deployments")

2. **Frontend ne se connecte pas au backend:**
   - Vérifiez que `NEXT_PUBLIC_API_URL` dans Vercel pointe vers la bonne URL Railway
   - L'URL doit se terminer SANS `/` à la fin

3. **Erreur de base de données:**
   - Assurez-vous que PostgreSQL est bien créé dans Railway
   - Vérifiez que le backend peut y accéder

## 📞 Contact

Si vous avez besoin d'aide, contactez-moi!

## 🎯 Résumé Rapide

1. ✅ Repository GitHub créé
2. ⏳ Ajouter tous les fichiers (via ZIP que je vais vous fournir)
3. ⏳ Déployer backend sur Railway
4. ⏳ Déployer frontend sur Vercel
5. ⏳ Tester l'application

---

**Fait avec ❤️ par ASH Talents**
