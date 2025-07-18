# FaceClone - Application Web Réseau Social (Frontend)

# FaceClone - Application Web Réseau Social (Frontend)

## Contexte du Projet

Ce projet est le front-end d'une application web de type réseau social, fortement inspirée du modèle Facebook. Il a été développé en utilisant HTML, CSS (avec Bootstrap 5.3.3 pour la structure et les composants de base), et JavaScript natif pour la logique client et les interactions dynamiques (SPA - Single Page Application).


## Technologies Utilisées (Frontend)

*   **HTML5**
*   **CSS3**
*   **Bootstrap 5.3.3** (via CDN) pour le layout responsive et les composants UI de base.
*   **JavaScript (ES6+)** : Pour la logique SPA (routage, manipulation du DOM, appels API simulés).
*   **Font Awesome** (via CDN) pour les icônes.

## Architecture Front-end

L'application est une **Single Page Application (SPA)** :
*   `index.html` est le seul fichier HTML chargé.
*   La navigation se fait via des changements de hash (`#`) dans l'URL.
*   Le contenu des différentes "pages" (vues) est chargé dynamiquement dans un conteneur principal (`<main id="app-container">`).
*   Les vues HTML se trouvent dans le dossier `/vues/clients/`.
*   Les scripts JavaScript principaux sont dans `/assets/js/` :
    *   `router.js` : Gère le routage et le chargement des vues.
    *   `main.js` : Contient les fonctions d'initialisation et la logique pour chaque vue.
    *   `api.js` : Centralise les appels (actuellement simulés) vers l'API backend. C'est ce fichier que l'équipe backend devra particulièrement examiner pour les endpoints.
    *   `templates.js` : Contient des fonctions pour générer des morceaux de HTML dynamiquement (ex: cartes de post, items de conversation).
*   Les styles CSS sont organisés par page/module dans `/assets/css/` (`global.css`, `login.css`, `register.css`, `home.css`, `profile.css`, `chat.css`).

## Fonctionnalités Implémentées (Frontend - Simulation)

Ce qui suit décrit les fonctionnalités du front-end et les **attentes envers l'API backend**. Toutes les interactions avec le serveur sont actuellement simulées dans `assets/js/api.js`.

### 1. Module d'Authentification Complet

*   **Inscription (`#auth/register`)**
    *   **Frontend :** Affiche un formulaire d'inscription (prénom, nom, email/mobile, mot de passe, date de naissance, genre).
    *   **Attente API (POST `/api/auth/register.php`) :**
        *   **Requête :** JSON avec `firstname`, `lastname`, `email`, `password`, `birth_day`, `birth_month`, `birth_year`, `gender`.
        *   **Réponse attendue (Succès) :** `{ "success": true, "message": "Inscription réussie. Veuillez vérifier votre email pour activer votre compte." }`
        *   **Réponse attendue (Échec) :** `{ "success": false, "message": "L'email existe déjà." }` ou autre erreur.
    *   *Note :* La confirmation par email (envoi d'un email HTML) est gérée par le backend.

*   **Connexion (`#auth/login`)**
    *   **Frontend :** Affiche un formulaire de connexion (email, mot de passe). Gère la session via `sessionStorage` après une connexion réussie.
    *   **Attente API (POST `/api/auth/login.php`) :**
        *   **Requête :** JSON avec `email`, `password`.
        *   **Réponse attendue (Succès) :** `{ "success": true, "token": "VOTRE_JWT_TOKEN", "user": { "id": 1, "firstname": "John", "lastname": "Doe", "email": "...", "avatar": "url_avatar.jpg" } }`
        *   **Réponse attendue (Échec) :** `{ "success": false, "message": "Email ou mot de passe incorrect." }`

*   **Déconnexion (`logout-btn`)**
    *   **Frontend :** Supprime le token de `sessionStorage` et redirige vers `#auth/login`.
    *   **Attente API (Optionnel POST `/api/auth/logout.php`) :**
        *   Si le backend a besoin d'invalider le token côté serveur.
        *   **Requête :** Peut inclure le token dans les headers.
        *   **Réponse attendue :** `{ "success": true, "message": "Déconnexion réussie." }`

*   **Gestion du mot de passe oublié**
    *   **Frontend :** Cette fonctionnalité a été laissée à l'implémentation complète du backend, y compris les pages HTML nécessaires (demande d'email, saisie du nouveau mot de passe).
    *   **Attente API (si le front devait initier - exemple) :**
        *   **Demande (POST `/api/auth/forgot-password.php`) :** `{ "email": "user@example.com" }`
        *   **Réponse :** `{ "success": true, "message": "Si un compte existe..." }`
        *   Le backend gérerait l'envoi de l'email et le lien de réinitialisation.

### 2. Page d'Accueil (Flux d'Articles - `#home`)

*   **Frontend :** Affiche un fil d'actualité avec les posts. Permet de créer un post (simulé), de liker/disliker (simulé), et d'afficher/ajouter des commentaires (simulé).
*   **Attente API (GET `/api/posts/read.php` ou `/api/feed.php`) :**
    *   **Requête :** Peut inclure des paramètres de pagination (ex: `?page=1&limit=10`). Nécessite le token d'authentification.
    *   **Réponse attendue :** `{ "success": true, "posts": [ { "id": 1, "user_id": 123, "author_name": "John Doe", "author_avatar": "url", "timestamp": "...", "description": "Contenu du post", "image_url": "url_optionnelle", "likes_count": 10, "comments_count": 5, "is_liked_by_user": true/false }, ... ] }`
*   **Attente API (POST `/api/posts/create.php`) :**
    *   **Requête :** JSON avec `description`, `image_file` (multipart/form-data). Nécessite token.
    *   **Réponse :** `{ "success": true, "post": { ... nouveau post ... } }`
*   **Attente API (POST `/api/posts/like.php`) :**
    *   **Requête :** JSON avec `post_id`. Nécessite token.
    *   **Réponse :** `{ "success": true, "likes_count": 11, "is_liked_by_user": true }` (ou `is_liked_by_user: false` si dislike)
*   **Attente API (GET `/api/comments/read.php?post_id=X`) :**
    *   **Réponse :** `{ "success": true, "comments": [ { "id": 1, "author_name": "Jane", "text": "...", "timestamp": "..." }, ... ] }`
*   **Attente API (POST `/api/comments/create.php`) :**
    *   **Requête :** JSON avec `post_id`, `text`. Nécessite token.
    *   **Réponse :** `{ "success": true, "comment": { ... nouveau commentaire ... } }`

### 3. Gestion des Amis (`#friends`)

*   **Frontend :** Affiche les demandes d'amitié reçues et une liste d'utilisateurs (suggestions). Permet d'accepter/refuser des demandes ou d'envoyer une nouvelle demande (simulé).
*   **Attente API (GET `/api/friends/requests.php`) :**
    *   **Requête :** Nécessite token.
    *   **Réponse :** `{ "success": true, "requests": [ { "id": 2, "user_id": 456, "name": "Alice Martin", "avatar": "url" }, ... ] }`
*   **Attente API (POST `/api/friends/respond.php`) :**
    *   **Requête :** JSON avec `request_id` (ou `user_id_from`), `action: "accept" / "refuse"`. Nécessite token.
    *   **Réponse :** `{ "success": true, "message": "Demande acceptée/refusée." }`
*   **Attente API (GET `/api/users/suggestions.php` ou `/api/users/all.php`) :**
    *   **Requête :** Nécessite token. Peut inclure un paramètre de recherche `?search=term`.
    *   **Réponse :** `{ "success": true, "users": [ { "id": 3, "name": "Bob", "avatar": "url" }, ... ] }`
*   **Attente API (POST `/api/friends/add.php`) :**
    *   **Requête :** JSON avec `user_id_to_add`. Nécessite token.
    *   **Réponse :** `{ "success": true, "message": "Demande d'ami envoyée." }`

### 4. Gestion du Profil Personnel (`#profile`)

*   **Frontend :** Affiche les informations de l'utilisateur connecté (nom, avatar, couverture, bio, posts). Permet de simuler la modification de la bio et du nom.
*   **Attente API (GET `/api/users/profile.php` ou `/api/users/me`) :**
    *   **Requête :** Nécessite token.
    *   **Réponse :** `{ "success": true, "user": { "id": 1, "firstname": "...", "lastname": "...", "email": "...", "avatar": "...", "banner": "...", "bio": "...", "friendsCount": "..." } }`
*   **Attente API (GET `/api/posts/user.php?user_id=X`) :** (Pour les posts de l'utilisateur)
    *   **Réponse :** Similaire à `/api/posts/read.php` mais filtrée par `user_id`.
*   **Attente API (POST `/api/users/update_profile.php`) :**
    *   **Requête :** JSON avec les champs à mettre à jour (ex: `firstname`, `lastname`, `bio`). Peut inclure des fichiers pour avatar/bannière (multipart/form-data). Nécessite token.
    *   **Réponse :** `{ "success": true, "user": { ... updated user data ... } }`
*   **Attente API (POST `/api/users/update_password.php`) :** (Fonctionnalité non stylée mais logique prévue)
    *   **Requête :** JSON avec `current_password`, `new_password`. Nécessite token.
    *   **Réponse :** `{ "success": true, "message": "Mot de passe mis à jour." }` ou `{ "success": false, "message": "Mot de passe actuel incorrect." }`

### 5. Module Chat (`#chat`)

*   **Frontend :** Affiche une sidebar avec les conversations et une fenêtre pour la conversation active. Permet d'envoyer des messages. Simule la réception de messages via `setInterval`.
*   **Attente API (GET `/api/chat/conversations.php`) :**
    *   **Requête :** Nécessite token.
    *   **Réponse :** `{ "success": true, "conversations": [ { "id": "conv1", "user_id": 2, "userName": "Alice", "userAvatar": "url", "lastMessage": "Salut !", "timestamp": "..." }, ... ] }`
*   **Attente API (GET `/api/chat/messages.php?conversation_id=X`) :**
    *   **Requête :** Nécessite token. Peut inclure pagination.
    *   **Réponse :** `{ "success": true, "messages": [ { "id": "msg1", "sender_id": 1, "text": "Bonjour", "timestamp": "...", "isMe": true/false (le backend peut déterminer cela) }, ... ] }`
*   **Attente API (POST `/api/chat/send_message.php`) :**
    *   **Requête :** JSON avec `conversation_id` (ou `recipient_id`), `text`, `image_file` (optionnel, multipart). Nécessite token.
    *   **Réponse :** `{ "success": true, "message": { ... nouveau message envoyé ... } }`
*   **Attente API pour le "Temps Réel" (Polling) :** Le front-end appellera périodiquement un endpoint (ex: GET `/api/chat/new_messages.php?conversation_id=X&last_message_timestamp=Y`) pour récupérer les nouveaux messages.
    *   **Réponse :** `{ "success": true, "new_messages": [ ... ] }`

## Points d'Interaction Clés pour le Backend

1.  **Authentification :**
    *   Gestion des tokens (JWT recommandé) pour les sessions utilisateur.
    *   Endpoints pour l'inscription, la connexion, la déconnexion.
    *   Processus complet de mot de passe oublié et de confirmation d'email.

2.  **Gestion des Données :** CRUD (Create, Read, Update, Delete) pour :
    *   Utilisateurs (profils, relations d'amitié)
    *   Publications (posts)
    *   Commentaires
    *   Likes
    *   Messages de Chat

3.  **Sécurité :**
    *   Validation des entrées.
    *   Protection contre les injections SQL, XSS.
    *   Hachage des mots de passe.
    *   Autorisations (vérifier que l'utilisateur a le droit de faire une action).

4.  **Gestion des Fichiers :**
    *   Upload et stockage sécurisé des images de profil, de couverture, et des images dans les posts/messages.

5.  **Temps Réel (pour le Chat) :**
    *   Si le polling est utilisé : un endpoint efficace pour récupérer uniquement les nouveaux messages.
    *   Si Node.js (WebSockets) est utilisé (comme mentionné facultativement dans le TP) : mise en place du serveur WebSocket et des événements.

## Instructions de Lancement (Frontend)

1.  Clonez le dépôt.
2.  Assurez-vous d'avoir un serveur web local (XAMPP, WAMP, MAMP, ou le Live Server de VS Code).
3.  Placez le dossier du projet à la racine de votre serveur.
4.  Accédez à `http://localhost/NOM_DU_DOSSIER_PROJET/index.html` dans votre navigateur.

## Structure des Données Attendue (Exemples)

Veuillez vous référer aux sections "Attente API" ci-dessus pour des exemples de formats JSON attendus en requête et en réponse. La cohérence de ces formats est cruciale pour l'intégration.

---

N'hésitez pas à poser des questions si des clarifications sont nécessaires sur le comportement attendu du front-end ou sur les données simulées.

Bon développement !

## API Simulée et Attentes Envers le Backend

Le fichier `assets/js/api.js` du front-end contient des fonctions qui simulent les appels à une API backend. Ces fonctions retournent des données statiques (ex: `FAKE_USER_DATA`, `FAKE_POSTS`) après un délai simulé (`FAKE_DELAY`) pour imiter la latence du réseau.

**L'objectif principal de l'équipe backend est de remplacer ces simulations par de véritables endpoints API qui interagissent avec une base de données (MySQL comme spécifié) et une logique serveur robuste.**

Ci-dessous, chaque fonctionnalité du front-end est détaillée avec :
1.  Le comportement actuel du front-end (basé sur les simulations).
2.  Les **endpoints API que le front-end s'attend à appeler**.
3.  La **structure des données attendues en requête et en réponse**.
4.  Le **travail spécifique à réaliser par l'équipe backend** pour chaque fonctionnalité.

---

### 1. Module d'Authentification

#### a. Inscription (`#auth/register`)

*   **Simulation Frontend :**
    *   Affiche un formulaire avec Prénom, Nom, Email/Mobile, Mot de passe, Date de naissance, Genre.
    *   À la soumission, la fonction `apiRegisterUser` (simulée) est appelée. Actuellement, elle affiche une alerte de succès et redirige vers la connexion.
*   **Endpoint API Attendu :** `POST /api/auth/register.php`
    *   **Requête (JSON) :**
        ```json
        {
            "firstname": "John",
            "lastname": "Doe",
            "email": "john.doe@example.com",
            "password": "securepassword123",
            "birth_day": "15",
            "birth_month": "6",
            "birth_year": "1990",
            "gender": "male" // ou "female", "custom"
        }
        ```
    *   **Réponse Attendue (Succès - HTTP 201 Created) :**
        ```json
        {
            "success": true,
            "message": "Inscription réussie. Un email de confirmation a été envoyé."
            // Optionnel: "user_id": 123 
        }
        ```
    *   **Réponse Attendue (Échec - HTTP 400 Bad Request, 409 Conflict, etc.) :**
        ```json
        {
            "success": false,
            "message": "L'adresse e-mail est déjà utilisée." // ou autre message d'erreur spécifique
        }
        ```
*   **Travail Backend :**
    1.  Créer le script `register.php`.
    2.  Valider les données reçues (longueur, format email, complexité mot de passe, date valide, etc.).
    3.  Vérifier si l'email existe déjà dans la base de données `users`.
    4.  **Hacher le mot de passe** (ex: `password_hash()`).
    5.  Insérer le nouvel utilisateur dans la table `users` (avec `is_active = 0` initialement).
    6.  Générer un token de confirmation unique.
    7.  Stocker ce token (associé à l'utilisateur, avec une date d'expiration).
    8.  **Envoyer un email de confirmation** à l'utilisateur contenant un lien avec ce token (ex: `yourdomain.com/api/auth/confirm_email.php?token=XXXXX`).
    9.  Retourner la réponse JSON appropriée.
    10. Créer le script `confirm_email.php` qui valide le token, active l'utilisateur (`is_active = 1`), et supprime/invalide le token.

#### b. Connexion (`#auth/login`)

*   **Simulation Frontend :**
    *   Affiche un formulaire Email et Mot de passe.
    *   Appelle `apiLogin(email, password)`. Si la simulation réussit (pour `test@test.com`), stocke un faux token et des infos utilisateur dans `sessionStorage`, puis redirige.
*   **Endpoint API Attendu :** `POST /api/auth/login.php`
    *   **Requête (JSON) :**
        ```json
        {
            "email": "test@test.com",
            "password": "password"
        }
        ```
    *   **Réponse Attendue (Succès - HTTP 200 OK) :**
        ```json
        {
            "success": true,
            "token": "VOTRE_JWT_OU_TOKEN_DE_SESSION_SÉCURISÉ",
            "user": {
                "id": 1,
                "firstname": "Test",
                "lastname": "User",
                "email": "test@test.com",
                "avatar": "url/vers/avatar_par_defaut.jpg" // ou l'avatar réel
            }
        }
        ```
    *   **Réponse Attendue (Échec - HTTP 401 Unauthorized, 400 Bad Request) :**
        ```json
        {
            "success": false,
            "message": "Email ou mot de passe incorrect." // ou "Compte non activé."
        }
        ```
*   **Travail Backend :**
    1.  Créer le script `login.php`.
    2.  Valider les données reçues.
    3.  Récupérer l'utilisateur de la base de données par email.
    4.  Vérifier si l'utilisateur existe et si le compte est actif (`is_active = 1`).
    5.  **Comparer le mot de passe fourni avec le mot de passe haché stocké** (ex: `password_verify()`).
    6.  Si l'authentification réussit, générer un token de session sécurisé (JWT recommandé).
    7.  Retourner la réponse JSON avec le token et les informations utilisateur de base.

#### c. Déconnexion (bouton `logout-btn`)

*   **Simulation Frontend :** Supprime `userToken` de `sessionStorage` et redirige.
*   **Endpoint API Attendu (Optionnel, pour invalidation de token côté serveur) :** `POST /api/auth/logout.php`
    *   **Requête :** Doit inclure le token d'authentification (généralement dans un header `Authorization: Bearer VOTRE_TOKEN`).
    *   **Réponse Attendue (HTTP 200 OK) :**
        ```json
        {
            "success": true,
            "message": "Déconnexion réussie."
        }
        ```
*   **Travail Backend :**
    1.  (Optionnel) Créer `logout.php`.
    2.  Si vous utilisez des tokens qui peuvent être invalidés côté serveur (ex: stockés dans une table de tokens actifs), marquer le token comme invalide.
    3.  Retourner une réponse de succès.

#### d. Gestion du mot de passe oublié

*   **Simulation Frontend :** Actuellement, cette fonctionnalité n'est **pas** implémentée côté front-end, car il a été décidé que le backend gérerait l'ensemble du flux (y compris les pages HTML).
*   **Travail Backend :**
    1.  **Endpoint pour demander la réinitialisation (ex: `POST /api/auth/request-password-reset.php`) :**
        *   Prend un email en entrée.
        *   Vérifie si l'email existe.
        *   Génère un token de réinitialisation de mot de passe unique et à durée limitée.
        *   Stocke ce token en base de données.
        *   Envoie un email à l'utilisateur avec un lien contenant ce token (ex: `yourdomain.com/reset-password.html?token=YYYYY` – cette page `reset-password.html` serait une page fournie par le backend ou une nouvelle vue front-end spécifique).
    2.  **Page/Endpoint pour réinitialiser le mot de passe (ex: `POST /api/auth/reset-password.php`) :**
        *   Prend le token et le nouveau mot de passe en entrée.
        *   Valide le token (existence, non expiré).
        *   Met à jour le mot de passe de l'utilisateur (en le hachant).
        *   Invalide le token de réinitialisation.

---

### 2. Page d'Accueil (Flux d'Articles - `#home`)

*   **Simulation Frontend :** `apiFetchPosts()` retourne une liste statique `FAKE_POSTS`. Les actions de like, commentaire, création de post sont simulées (changements locaux, pas d'appel API réel).
*   **Endpoints API Attendus :**
    *   **Lire le Fil d'Actualité :** `GET /api/posts/feed.php` (ou `/api/posts/read.php`)
        *   **Requête :** Nécessite token d'authentification. Peut accepter des paramètres de pagination (`?page=1&limit=10`).
        *   **Réponse :** `{ "success": true, "posts": [ { "id": ..., "user_id": ..., "author_name": "...", "author_avatar": "...", "timestamp": "...", "description": "...", "image_url": "...", "likes_count": ..., "comments_count": ..., "is_liked_by_user": true/false }, ... ] }`
            *   `is_liked_by_user` est crucial pour que le front-end affiche l'état correct du bouton "J'aime".
    *   **Créer un Post :** `POST /api/posts/create.php`
        *   **Requête :** Nécessite token. `multipart/form-data` si image, sinon JSON. Champs : `description` (texte), `image` (fichier optionnel).
        *   **Réponse (Succès) :** `{ "success": true, "post": { ... données du nouveau post créé ... } }`
    *   **Liker/Disliker un Post :** `POST /api/posts/like.php`
        *   **Requête (JSON) :** `{ "post_id": 123 }`. Nécessite token. L'API doit gérer si c'est un like ou un unlike.
        *   **Réponse :** `{ "success": true, "new_likes_count": 25, "is_liked_by_user": true }`
    *   **Lire les Commentaires d'un Post :** `GET /api/comments/read.php?post_id=123`
        *   **Requête :** Nécessite token.
        *   **Réponse :** `{ "success": true, "comments": [ { "id": ..., "author_id": ..., "author_name": "...", "author_avatar": "...", "text": "...", "timestamp": "..." }, ... ] }`
    *   **Ajouter un Commentaire :** `POST /api/comments/create.php`
        *   **Requête (JSON) :** `{ "post_id": 123, "text": "Super post !" }`. Nécessite token.
        *   **Réponse (Succès) :** `{ "success": true, "comment": { ... données du nouveau commentaire ... } }`
*   **Travail Backend :**
    1.  Implémenter les tables `posts`, `likes`, `comments` en base de données.
    2.  Créer les scripts PHP pour chaque endpoint listé.
    3.  Gérer la logique de récupération des posts pour le fil d'actualité (amis, posts publics, algorithme de tri si avancé).
    4.  Gérer l'upload et le stockage des images pour les posts.
    5.  Gérer la logique de like/unlike (s'assurer qu'un utilisateur ne peut liker qu'une fois).
    6.  Associer les commentaires aux posts et aux utilisateurs.
    7.  Valider toutes les entrées et gérer les autorisations (ex: un utilisateur ne peut supprimer que ses propres posts/commentaires, sauf si admin/modo).

---

### 3. Gestion des Amis (`#friends`)

*   **Simulation Frontend :** `apiFetchFriendRequests()` et `apiFetchAllUsers()` retournent des listes statiques. Les actions (accepter, refuser, ajouter) modifient l'affichage localement.
*   **Endpoints API Attendus :**
    *   **Voir les Demandes d'Amitié Reçues :** `GET /api/friends/requests_received.php`
        *   **Requête :** Nécessite token.
        *   **Réponse :** `{ "success": true, "requests": [ { "request_id": ..., "from_user_id": ..., "from_user_name": "...", "from_user_avatar": "..." }, ... ] }`
    *   **Répondre à une Demande :** `POST /api/friends/respond_request.php`
        *   **Requête (JSON) :** `{ "request_id": 789, "action": "accept" }` (ou `action: "refuse"`). Nécessite token.
        *   **Réponse :** `{ "success": true, "message": "Demande traitée." }`
    *   **Suggérer/Lister des Utilisateurs :** `GET /api/users/suggestions.php` (ou `/api/users/search.php?query=XYZ`)
        *   **Requête :** Nécessite token. Peut inclure des filtres ou un terme de recherche.
        *   **Réponse :** `{ "success": true, "users": [ { "id": ..., "name": "...", "avatar": "...", "friendship_status": "not_friends" / "request_sent" / "friends" }, ... ] }`
            *   `friendship_status` est important pour que le front-end affiche le bon bouton d'action.
    *   **Envoyer une Demande d'Ami :** `POST /api/friends/send_request.php`
        *   **Requête (JSON) :** `{ "recipient_user_id": 456 }`. Nécessite token.
        *   **Réponse :** `{ "success": true, "message": "Demande d'ami envoyée." }`
    *   **Voir ses Amis :** `GET /api/friends/list.php`
        *   **Requête :** Nécessite token.
        *   **Réponse :** `{ "success": true, "friends": [ { "id": ..., "name": "...", "avatar": "..." }, ... ] }`
*   **Travail Backend :**
    1.  Concevoir la structure de la base de données pour les relations d'amitié (ex: une table `friendships` avec `user_one_id`, `user_two_id`, `status: pending/accepted/declined/blocked`).
    2.  Implémenter la logique pour envoyer, accepter, refuser, retirer des demandes/relations.
    3.  Développer des algorithmes de suggestion d'amis (basique : amis d'amis, ou plus complexe).
    4.  Assurer la cohérence des relations (si A est ami avec B, B est ami avec A).

---

### 4. Gestion du Profil Personnel (`#profile`)

*   **Simulation Frontend :** `apiFetchUserProfile()` et `apiFetchPostsForUser()` retournent des données statiques. La modification du nom et de la bio est locale.
*   **Endpoints API Attendus :**
    *   **Voir un Profil Utilisateur (soi-même ou un autre) :** `GET /api/users/profile.php?user_id=XYZ` (si `user_id` non fourni, retourne le profil de l'utilisateur connecté).
        *   **Requête :** Nécessite token.
        *   **Réponse :** `{ "success": true, "user": { "id": ..., "firstname": "...", "lastname": "...", "email": "...", "avatar": "...", "banner": "...", "bio": "...", "friendsCount": ..., "is_own_profile": true/false, "friendship_status_with_viewer": "friends" / "request_sent" / "request_received" / "not_friends" }, "posts": [ ... posts de cet utilisateur ... ] }`
            *   `is_own_profile` et `friendship_status_with_viewer` sont cruciaux pour que le front-end affiche les bons boutons d'action sur le profil.
    *   **Mettre à Jour le Profil :** `POST /api/users/update_profile.php`
        *   **Requête :** Nécessite token. `multipart/form-data`. Champs optionnels : `firstname`, `lastname`, `bio`, `avatar_file`, `banner_file`.
        *   **Réponse :** `{ "success": true, "message": "Profil mis à jour.", "updated_data": { "avatar_url": "new_url", "banner_url": "new_url" } }`
    *   **Mettre à Jour le Mot de Passe :** `POST /api/users/update_password.php`
        *   **Requête (JSON) :** `{ "current_password": "...", "new_password": "..." }`. Nécessite token.
        *   **Réponse :** `{ "success": true, "message": "Mot de passe mis à jour." }` ou `{ "success": false, "message": "Mot de passe actuel incorrect." }`
*   **Travail Backend :**
    1.  Permettre la récupération des données d'un profil spécifique, en indiquant la relation avec l'utilisateur consultant.
    2.  Gérer la mise à jour des informations textuelles du profil.
    3.  Gérer l'upload et la mise à jour des images d'avatar et de couverture.
    4.  Implémenter la logique sécurisée de changement de mot de passe.

---

### 5. Module Chat (`#chat`)

*   **Simulation Frontend :** `apiFetchConversations` et `apiFetchMessagesForConversation` retournent des données statiques. L'envoi de message est local. La réception est simulée avec `setInterval` et `apiGetNewMessage`.
*   **Endpoints API Attendus :**
    *   **Lister les Conversations :** `GET /api/chat/conversations.php`
        *   **Requête :** Nécessite token.
        *   **Réponse :** `{ "success": true, "conversations": [ { "conversation_id": "...", "other_user_id": ..., "other_user_name": "...", "other_user_avatar": "...", "last_message_text": "...", "last_message_timestamp": "...", "unread_count": ... }, ... ] }`
    *   **Lire les Messages d'une Conversation :** `GET /api/chat/messages.php?conversation_id=XYZ`
        *   **Requête :** Nécessite token. Peut inclure pagination (`&before_timestamp=...` ou `&page=...`).
        *   **Réponse :** `{ "success": true, "messages": [ { "message_id": "...", "sender_id": ..., "text": "...", "timestamp": "...", "is_me": true/false (déterminé par le backend) }, ... ] }`
    *   **Envoyer un Message :** `POST /api/chat/send_message.php`
        *   **Requête (JSON ou multipart si image) :** `{ "recipient_user_id": 789 (ou "conversation_id": "ABC"), "text": "Salut !", "image_file": (optionnel) }`. Nécessite token.
        *   **Réponse (Succès) :** `{ "success": true, "message": { ... données du message envoyé ... } }`
    *   **(Pour Polling) Récupérer les Nouveaux Messages :** `GET /api/chat/poll_new_messages.php?conversation_id=XYZ&last_seen_message_timestamp=TIMESTAMP`
        *   **Requête :** Nécessite token.
        *   **Réponse :** `{ "success": true, "new_messages": [ ... ] }`
*   **Travail Backend :**
    1.  Concevoir les tables `conversations`, `conversation_participants`, `messages`.
    2.  Logique pour créer/récupérer des conversations entre deux utilisateurs.
    3.  Stocker les messages avec leur expéditeur, destinataire/conversation, et timestamp.
    4.  Marquer les messages comme lus/non lus.
    5.  Gérer l'upload d'images dans les messages.
    6.  Implémenter l'endpoint de polling de manière efficace pour ne retourner que les messages réellement nouveaux.
    7.  (Optionnel avancé) Mettre en place des WebSockets avec Node.js pour un chat véritablement temps réel, comme alternative au polling.

---

## Recommandations Générales pour le Backend

*   **Structure des Réponses JSON :** Adopter une structure cohérente pour toutes les réponses, incluant systématiquement un champ `success: true/false` et un champ `message` pour les retours utilisateur ou les erreurs. Les données sont retournées dans un champ dédié (ex: `user`, `posts`, `conversations`).
*   **Codes de Statut HTTP :** Utiliser les codes de statut HTTP appropriés (200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Server Error).
*   **Authentification par Token :** Toutes les routes nécessitant une authentification doivent valider le token envoyé par le front-end (généralement dans le header `Authorization: Bearer VOTRE_TOKEN`).
*   **Validation et Sécurité :** Valider toutes les données en entrée. Se prémunir contre les injections SQL, XSS. Utiliser des requêtes préparées.
*   **Documentation API :** Fournir une documentation claire des endpoints (ex: avec Postman, Swagger/OpenAPI) pour faciliter l'intégration avec le front-end.

Ce document devrait donner une feuille de route claire à l'équipe backend pour développer l'API nécessaire au bon fonctionnement de l'application FaceClone.



