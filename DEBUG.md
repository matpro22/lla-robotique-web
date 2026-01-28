# 🔍 Guide de Débogage - Page Blanche

Si vous voyez une page blanche, suivez ces étapes :

## 1. Vérifier la Console du Navigateur

1. Ouvrez les outils de développement (F12)
2. Allez dans l'onglet "Console"
3. Cherchez les erreurs en rouge
4. Notez le message d'erreur exact

## 2. Vérifier les Dépendances

Assurez-vous que toutes les dépendances sont installées :

```bash
npm install
```

## 3. Vérifier que le Serveur Tourne

Le terminal devrait afficher quelque chose comme :
```
  VITE v5.0.8  ready in XXX ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

## 4. Erreurs Courantes et Solutions

### Erreur : "Cannot find module"
**Solution** : Supprimez `node_modules` et `package-lock.json`, puis réinstallez :
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erreur : "i18n is not initialized"
**Solution** : Vérifiez que `src/i18n/config.js` est bien importé dans `src/main.jsx`

### Erreur : "window is not defined"
**Solution** : Déjà corrigé dans le code, mais si cela persiste, vérifiez `src/components/LaunchScreen.jsx`

### Erreur : "Cannot read property of undefined"
**Solution** : Vérifiez les fichiers JSON de traduction dans `src/i18n/locales/`

## 5. Test Minimal

Pour tester si React fonctionne, créez temporairement un fichier `src/App.jsx` simple :

```jsx
function App() {
  return <div style={{ padding: '2rem', fontSize: '2rem' }}>Test - React fonctionne !</div>
}

export default App
```

Si cela fonctionne, le problème vient d'un composant spécifique.

## 6. Vérifier les Fichiers JSON

Les fichiers de traduction doivent être valides JSON. Vérifiez :
- `src/i18n/locales/fr.json`
- `src/i18n/locales/en.json`

## 7. Vider le Cache

1. Videz le cache du navigateur (Ctrl+Shift+Delete)
2. Ou testez en navigation privée
3. Redémarrez le serveur Vite

## 8. Vérifier la Version de Node

Vite nécessite Node.js 14.18+ ou 16+ :

```bash
node --version
```

## 9. Logs Détaillés

Pour voir plus de détails, modifiez temporairement `src/main.jsx` :

```jsx
console.log('React is loading...')
import React from 'react'
// ... reste du code
```

## 10. Contacter pour Aide

Si le problème persiste, notez :
- Le message d'erreur exact de la console
- La version de Node.js
- Le système d'exploitation
- Les étapes exactes pour reproduire le problème

