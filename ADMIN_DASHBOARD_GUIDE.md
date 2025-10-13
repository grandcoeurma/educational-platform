# Admin Dashboard - Guide d'utilisation

## 🎯 Vue d'ensemble

Le tableau de bord d'administration vous permet de visualiser et gérer tous les formulaires de contact soumis via le site web Grand Cœur.

## 🔐 Accès au Dashboard

### URL d'accès
```
http://localhost:3000/admin
```

En production:
```
https://votre-domaine.com/admin
```

### Identifiants de connexion

Les identifiants sont définis dans le fichier `.env`:

```env
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="grandcoeur2025"
```

⚠️ **IMPORTANT**: Changez ces identifiants par défaut avant de déployer en production!

## 📊 Fonctionnalités

### 1. Tableau de bord principal

**Statistiques affichées:**
- **Total Contacts**: Nombre total de soumissions dans la base de données
- **Cette page**: Nombre de contacts affichés sur la page actuelle
- **Pages totales**: Nombre total de pages de résultats

### 2. Recherche

Utilisez la barre de recherche pour filtrer les contacts par:
- Nom complet
- Numéro de téléphone
- Type de condition

La recherche est instantanée et fonctionne sur la page actuelle.

### 3. Liste des contacts

**Colonnes affichées:**
- **Date**: Date et heure de soumission
- **Nom**: Nom complet avec avatar coloré
- **Téléphone**: Numéro de téléphone
- **Condition**: Type de condition de l'enfant
- **Actions**: Bouton pour voir les détails complets

### 4. Détails du contact

Cliquez sur "Voir détails" pour afficher:
- Nom complet
- Numéro de téléphone
- Type de condition
- Adresse complète
- Message intégral
- Date de création
- Date de dernière modification

### 5. Export CSV

Cliquez sur le bouton "Exporter CSV" pour télécharger:
- Tous les contacts de la page actuelle
- Format compatible Excel/Google Sheets
- Nom du fichier: `contacts_YYYY-MM-DD.csv`

### 6. Pagination

- Affiche 10 contacts par page
- Boutons précédent/suivant pour naviguer
- Indicateur de page actuelle

## 🎨 Design

Le dashboard utilise la même palette de couleurs que le site principal:
- **Dégradés**: Rouge → Orange → Jaune
- **Style**: Moderne avec glassmorphism
- **Animations**: Framer Motion pour fluidité
- **Icons**: Lucide React

## 🔒 Sécurité

### Authentification
- Session cookie sécurisée (8 heures)
- HttpOnly (protection XSS)
- SameSite protection (protection CSRF)
- Auto-déconnexion après expiration

### Protection API
- Endpoints `/api/contacts` GET protégés
- Vérification de session sur chaque requête
- Erreur 401 si non authentifié

### Bonnes pratiques

**En développement:**
```env
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="dev123"
```

**En production:**
```env
ADMIN_USERNAME="admin_grandcoeur"
ADMIN_PASSWORD="Un_Mot_De_Passe_Tres_Fort_123!"
```

⚠️ Utilisez un mot de passe:
- Au moins 16 caractères
- Mélange majuscules/minuscules
- Chiffres et caractères spéciaux
- Unique (pas réutilisé ailleurs)

## 🚀 Utilisation

### Première connexion

1. Ajoutez les variables d'environnement dans `.env`:
   ```env
   ADMIN_USERNAME="admin"
   ADMIN_PASSWORD="votre_mot_de_passe_securise"
   ```

2. Redémarrez le serveur de développement:
   ```bash
   npm run dev
   ```

3. Accédez à `http://localhost:3000/admin`

4. Connectez-vous avec vos identifiants

### Consulter les contacts

1. Une fois connecté, vous voyez automatiquement la liste
2. Utilisez la recherche pour filtrer
3. Cliquez sur "Voir détails" pour plus d'informations
4. Utilisez la pagination pour naviguer

### Exporter les données

1. Recherchez/filtrez les contacts si nécessaire
2. Cliquez sur "Exporter CSV"
3. Le fichier se télécharge automatiquement
4. Ouvrez avec Excel, Google Sheets, etc.

### Se déconnecter

1. Cliquez sur "Déconnexion" en haut à droite
2. Vous êtes redirigé vers la page de connexion
3. La session est immédiatement invalidée

## 📱 Responsive Design

Le dashboard est entièrement responsive:
- **Desktop**: Vue tableau complète
- **Tablet**: Tableau avec scroll horizontal
- **Mobile**: Cartes empilées (optimisé pour mobile)

## 🔧 Personnalisation

### Changer le nombre d'items par page

Dans `app/admin/page.tsx`, ligne ~42:
```typescript
const itemsPerPage = 10  // Changez cette valeur
```

### Changer la durée de session

Dans `app/api/admin/login/route.ts`, ligne ~27:
```typescript
maxAge: 60 * 60 * 8,  // 8 heures (en secondes)
```

### Ajouter des colonnes au CSV

Dans `app/admin/page.tsx`, fonction `exportToCSV`:
```typescript
const headers = ['Date', 'Nom', 'Téléphone', 'Condition', 'Adresse', 'Message', 'Votre Colonne']
```

## 🐛 Dépannage

### Impossible de se connecter

**Vérifiez:**
- Les variables `ADMIN_USERNAME` et `ADMIN_PASSWORD` sont définies dans `.env`
- Le serveur a été redémarré après modification de `.env`
- Les identifiants correspondent exactement (sensible à la casse)

**Console navigateur:**
```javascript
// Ouvrez la console (F12) et vérifiez les erreurs réseau
```

### "Non autorisé" lors de l'accès aux contacts

**Causes possibles:**
- Session expirée (reconnectez-vous)
- Cookie bloqué (vérifiez les paramètres navigateur)
- Problème serveur (vérifiez les logs)

**Solution:**
```bash
# Redémarrez le serveur
npm run dev
# Videz le cache navigateur
# Reconnectez-vous
```

### Les contacts ne s'affichent pas

**Vérifiez:**
```bash
# 1. La base de données est accessible
npx prisma studio

# 2. Des contacts existent
SELECT COUNT(*) FROM contacts;

# 3. L'API fonctionne
curl http://localhost:3000/api/contacts \
  -H "Cookie: admin_session=YOUR_SESSION"
```

### Erreur lors de l'export CSV

**Cause commune:** Bloqueur de pop-ups activé

**Solution:**
- Autorisez les téléchargements pour votre site
- Vérifiez les paramètres de sécurité du navigateur

## 🎓 Cas d'usage

### Exemple 1: Consulter les nouvelles demandes

```
1. Connectez-vous au dashboard
2. Les contacts sont triés par date (plus récents en premier)
3. Consultez la première page pour voir les nouvelles soumissions
4. Cliquez sur "Voir détails" pour lire les messages complets
```

### Exemple 2: Rechercher un contact spécifique

```
1. Un parent a appelé et mentionné avoir soumis le formulaire
2. Utilisez la recherche avec son nom ou téléphone
3. Trouvez sa soumission et consultez les détails
4. Notez les informations pour le suivi
```

### Exemple 3: Exporter pour analyse

```
1. Exportez toutes les données en CSV
2. Ouvrez dans Excel/Sheets
3. Créez des graphiques:
   - Répartition par type de condition
   - Volume de demandes par mois
   - Zones géographiques principales
```

### Exemple 4: Suivi hebdomadaire

```
1. Chaque lundi, connectez-vous au dashboard
2. Notez le nombre total de nouveaux contacts
3. Exportez les données de la semaine
4. Transmettez aux équipes concernées
```

## 📊 Métriques disponibles

Le dashboard affiche automatiquement:
- Nombre total de contacts
- Répartition par page
- Historique des soumissions (via dates)

**Pour des analyses avancées:**
1. Exportez en CSV
2. Utilisez Excel/Sheets pour:
   - Graphiques en camembert (par condition)
   - Graphiques temporels (évolution)
   - Tableaux croisés dynamiques

## 🔄 Mises à jour futures possibles

Fonctionnalités qui pourraient être ajoutées:

- [ ] Filtres avancés (par date, condition)
- [ ] Graphiques et statistiques intégrés
- [ ] Marquage de contacts comme "traités"
- [ ] Notes internes sur les contacts
- [ ] Export PDF des détails
- [ ] Notifications email pour nouvelles soumissions
- [ ] Gestion multi-utilisateurs
- [ ] Logs d'activité admin
- [ ] Recherche en texte intégral
- [ ] Archivage de contacts anciens

## 🆘 Support

En cas de problème:

1. **Consultez les logs serveur**
   ```bash
   # Dans le terminal où tourne npm run dev
   # Cherchez les erreurs en rouge
   ```

2. **Vérifiez la console navigateur**
   ```
   F12 → Console → Cherchez les erreurs
   ```

3. **Testez la connexion DB**
   ```bash
   npx prisma studio
   # Devrait ouvrir l'interface Prisma
   ```

4. **Vérifiez le fichier .env**
   ```bash
   cat .env
   # Vérifiez que toutes les variables sont définies
   ```

## 🎯 Checklist de déploiement

Avant de mettre en production:

- [ ] Changez `ADMIN_USERNAME` et `ADMIN_PASSWORD`
- [ ] Utilisez un mot de passe fort (16+ caractères)
- [ ] Activez HTTPS sur votre domaine
- [ ] Configurez les variables d'environnement sur votre hébergeur
- [ ] Testez la connexion en production
- [ ] Vérifiez que les cookies fonctionnent
- [ ] Documentez les identifiants en lieu sûr (gestionnaire mots de passe)
- [ ] Testez l'export CSV en production
- [ ] Vérifiez la pagination avec données réelles
- [ ] Configurez les backups de base de données

---

**Dernière mise à jour:** 13 octobre 2025  
**Version:** 1.0  
**Compatibilité:** Next.js 15+, React 19
