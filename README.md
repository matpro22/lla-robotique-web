# LLA Robotique - Site Portfolio

Site web moderne et interactif pour le club de robotique LLA Robotique, créé avec React.js et de nombreuses animations.

## 🚀 Fonctionnalités

### ✨ Caractéristiques Principales

- **Launch Screen** : Écran de démarrage animé avec effets visuels
- **Animations au Scroll** : Animations fluides lors du défilement
- **Transitions de Pages** : Transitions élégantes entre les différentes pages
- **Système de Traduction** : Support multilingue (Français/Anglais)
- **Accessibilité** : Panel d'accessibilité avec options de contraste, taille de police et réduction d'animations
- **Section Privée** : Galerie de photos protégée par mot de passe (mot de passe: `LLA2024`)
- **Design Moderne** : Interface fraîche et tendance avec couleurs pâles

### 📄 Pages

1. **Accueil** : Présentation du club avec statistiques et raisons de nous rejoindre
2. **Résultats** : Présentation des résultats des deux années précédentes (2022-2023 et 2023-2024)
3. **Notre Robot** : Présentation technique interactive du robot avec visualisation 3D
4. **Photos Privées** : Section protégée pour les photos privées des membres

## 🛠️ Technologies Utilisées

- **React 18** : Framework JavaScript
- **Vite** : Build tool rapide
- **Framer Motion** : Animations fluides et performantes
- **React Router** : Navigation entre les pages
- **i18next** : Internationalisation
- **Lucide React** : Icônes modernes
- **React Intersection Observer** : Détection de scroll pour animations

## 📦 Installation

1. Installer les dépendances :
```bash
npm install
```

2. Lancer le serveur de développement :
```bash
npm run dev
```

3. Ouvrir le navigateur à l'adresse indiquée (généralement `http://localhost:3000`)

## 🏗️ Build de Production

Pour créer une version de production :

```bash
npm run build
```

Les fichiers seront générés dans le dossier `dist/`.

## 🎨 Personnalisation

### Couleurs

Les couleurs principales sont définies dans `src/index.css` via les variables CSS :
- `--color-primary` : Couleur primaire pâle
- `--color-secondary` : Couleur secondaire pâle
- `--color-accent` : Couleur d'accentuation
- `--color-text` : Couleur du texte

### Traductions

Les traductions sont dans `src/i18n/locales/` :
- `fr.json` : Traductions françaises
- `en.json` : Traductions anglaises

### Mot de Passe Privé

Le mot de passe pour la section privée est défini dans `src/pages/Private.jsx` (ligne avec `correctPassword`).

## 📱 Responsive

Le site est entièrement responsive et s'adapte à tous les écrans (mobile, tablette, desktop).

## ♿ Accessibilité

Le site inclut :
- Support du mode contraste élevé
- Ajustement de la taille de police
- Option de réduction des animations
- Navigation au clavier
- Attributs ARIA appropriés

## 🎯 Objectifs

Ce site a été conçu pour :
- Attirer les nouvelles classes à rejoindre le club
- Présenter les réalisations du club
- Mettre en valeur le robot et les compétences techniques
- Créer une expérience utilisateur mémorable

## 📝 Notes

- Les images dans la section privée sont des placeholders. Remplacez-les par vos propres images.
- Le mot de passe est stocké en clair dans le code (comme demandé, pas besoin d'être très sécurisé).
- Toutes les animations respectent les préférences de réduction de mouvement de l'utilisateur.

## 👥 Crédits

Développé pour LLA Robotique - Projet d'école

---

Fait avec ❤️ pour LLA Robotique

