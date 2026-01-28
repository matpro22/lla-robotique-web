# 🚀 Guide de Démarrage Rapide

## Installation et Lancement

1. **Installer les dépendances**
   ```bash
   npm install
   ```

2. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

3. **Ouvrir dans le navigateur**
   - Le site s'ouvrira automatiquement à `http://localhost:3000`
   - Sinon, ouvrez manuellement cette adresse

## 🎯 Fonctionnalités à Tester

### 1. Launch Screen
- Au chargement, vous verrez un écran de démarrage animé (3 secondes)

### 2. Navigation
- Cliquez sur les liens dans la barre de navigation
- Testez les transitions fluides entre les pages
- Changez la langue avec le bouton globe (FR/EN)

### 3. Page d'Accueil
- Faites défiler pour voir les animations au scroll
- Observez les statistiques qui s'animent
- Testez les cartes interactives

### 4. Page Résultats
- Découvrez les résultats des deux années
- Les cartes s'animent au scroll

### 5. Page Robot
- Cliquez sur les différentes parties du robot
- Utilisez le bouton "Animer" pour voir les animations
- Explorez les spécifications techniques

### 6. Section Privée
- Allez sur "Photos Privées" dans le menu
- Mot de passe : `LLA2024`
- Explorez la galerie de photos
- Cliquez sur une image pour l'agrandir

### 7. Accessibilité
- Cliquez sur l'icône d'engrenage en bas à droite
- Testez le contraste élevé
- Changez la taille de police
- Activez la réduction des animations

## 🎨 Personnalisation Rapide

### Changer le Mot de Passe Privé
Éditez `src/pages/Private.jsx` ligne ~10 :
```javascript
const correctPassword = 'VOTRE_MOT_DE_PASSE'
```

### Modifier les Couleurs
Éditez `src/index.css` et modifiez les variables CSS :
```css
:root {
  --color-primary: #E8F4F8;
  --color-secondary: #F5E6D3;
  --color-accent: #D4A5A5;
  /* ... */
}
```

### Ajouter des Images Privées
Remplacez les URLs dans `src/pages/Private.jsx` dans le tableau `privateImages`

### Modifier les Traductions
Éditez les fichiers dans `src/i18n/locales/` :
- `fr.json` pour le français
- `en.json` pour l'anglais

## 📦 Build de Production

Pour créer une version optimisée pour la production :

```bash
npm run build
```

Les fichiers seront dans le dossier `dist/` que vous pouvez déployer sur n'importe quel serveur web.

## 🐛 Problèmes Courants

### Le site ne se charge pas
- Vérifiez que vous avez bien installé les dépendances : `npm install`
- Assurez-vous que le port 3000 n'est pas déjà utilisé

### Les animations ne fonctionnent pas
- Vérifiez que toutes les dépendances sont installées
- Essayez de vider le cache du navigateur

### Les images ne s'affichent pas
- Les images dans la section privée utilisent des URLs externes (Unsplash)
- Pour utiliser vos propres images, remplacez les URLs ou ajoutez vos images dans `public/`

## 💡 Astuces

- Utilisez les DevTools du navigateur (F12) pour inspecter les animations
- Les animations respectent les préférences d'accessibilité du système
- Le site est entièrement responsive - testez sur mobile !

---

Bon développement ! 🎉

