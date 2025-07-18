// assets/js/main.js

// Ce fichier contient la logique à exécuter pour chaque page.
// Ces fonctions sont appelées par le routeur après avoir chargé une vue.

// Page d'inscription

function initRegisterPage() {
console.log("Page d'inscription initialisée.");
     document.body.classList.remove('app-active');

  document.getElementById("register-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const messageBox = document.getElementById("register-message");
    messageBox.innerText = "Veuillez patienter...";
    messageBox.style.color = "black";

    const form = new FormData(this);

    try {
        const response = await fetch("/facebook_clone/Api/registerApi.php", {
            method: "POST",
            body: form
        });

        const result = await response.json();

        if (result.success) {
                document.body.classList.add('app-active'); // <<< AJOUTER LA CLASSE ICI, APRÈS SUCCÈS
                window.location.hash = '#auth/login';
            } else {
                alert(response.message || "Email ou mot de passe incorrect.");
            }
        
    } catch (error) {
        messageBox.innerText = "❌ Une erreur réseau est survenue.";
        messageBox.style.color = "red";
        console.error("Erreur fetch :", error);
    }
});  
}

//page de login
function initLoginPage() {
    console.log("Page de Connexion initialisée.");
    document.body.classList.remove('app-active'); // On enlève la classe au cas où

    // Nettoyage de l'intervalle de chat si besoin
    if (typeof chatInterval !== 'undefined' && chatInterval) {
        clearInterval(chatInterval);
        chatInterval = null;
    }

    const form = document.getElementById('login-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const emailInput = document.getElementById('login-email');
            const passwordInput = document.getElementById('login-password');
            const messageBox = document.getElementById('login-message'); 


            const email = emailInput.value.trim();
            const password = passwordInput.value;

            if (!email || !password) {
                alert("Veuillez entrer votre email et votre mot de passe.");
                return;
            }

            try {
                const response = await fetch("/facebook_clone/Api/loginApi.php", {
                    method: "POST",
                    body: new FormData(form)
                });

                const result = await response.json();

                if (result.success) {
                    console.log("Connexion réussie, token:", result.token);
                    sessionStorage.setItem('userToken', result.token);
                    document.body.classList.add('app-active');
                    window.location.hash = '#home';
                } else {
                    alert(result.message || "Email ou mot de passe incorrect.");
                    if (messageBox) {
                        messageBox.innerText = result.message;
                        messageBox.style.color = "red";
                    }
                }
            } catch (error) {
                console.error("Erreur réseau :", error);
                if (messageBox) {
                    messageBox.innerText = "❌ Une erreur réseau est survenue.";
                    messageBox.style.color = "red";
                }
            }
        });
    } else {
        console.error("Formulaire de login (#login-form) non trouvé.");
    }
}

// Fonction  pour la déconnexion
function logout() {
    if (typeof chatInterval !== 'undefined' && chatInterval) {
        clearInterval(chatInterval);
        chatInterval = null;
    }
    sessionStorage.removeItem('userToken');
    document.body.classList.remove('app-active'); // <<< ENLEVER LA CLASSE ICI
    window.location.hash = '#auth/login';
}

function attachLogoutEvent() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
}

async function apiCreatePost(description, imageFile = null) {
    const token = sessionStorage.getItem('userToken');
    const formData = new FormData();
    formData.append('description', description);
    if (imageFile) formData.append('image', imageFile);

    const response = await fetch('/facebook_clone/Api/post/create.php', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        body: formData
    });

    return await response.json();
}

async function apiFetchPosts() {
    try {
        const token = sessionStorage.getItem('userToken');
        const response = await fetch('/facebook_clone/Api/post/feed.php', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('userToken'),
            'Accept': 'application/json'
        }
        });

        const data = await response.json();
        return data; 
    } catch (error) {
        console.error("Erreur lors du chargement des posts :", error);
        return { success: false, error: "Erreur réseau" };
    }
}


function createPostHTML(post) {
    // Avatar par défaut si aucun n'est fourni
    const avatar = post.author_avatar 
        ? `/facebook_clone/${post.author_avatar}` 
        : '/facebook_clone/assets/default-avatar.jpg'; 

    // Image du post si présente
    const imageSection = post.image_url 
        ? `<img src="/facebook_clone/${post.image_url}" alt="Image du post" class="img-fluid rounded mb-3 mt-2">` 
        : '';

    return `
        <article class="post-card bg-dark text-white p-3 rounded mb-4" id="post-${post.id}">
        <header class="d-flex align-items-center mb-2">
            <img src="${avatar}" alt="Avatar" class="rounded-circle me-2" style="width: 50px; height: 50px;">
            <strong>${post.author_name}</strong>
        </header>
        <p>${post.description}</p>
        ${imageSection}
        <footer class="post-actions d-flex justify-content-between align-items-center mt-3">
            <button class="btn btn-outline-light like-btn ${post.is_liked_by_user ? 'liked' : ''}" 
                data-post-id="${post.id}" 
                onclick="toggleLike(${post.id}, this)">
                <span class="icon">${post.is_liked_by_user ? '❤️' : '👍'}</span>
                <span class="like-count ms-1">${post.likes_count}</span>
                <span class="ms-1">J'aime</span>
            </button>

            <button class="btn btn-outline-light comment-btn" data-post-id="${post.id}">
                💬 Commenter
            </button>
        </footer>
        <div class="comments-section mt-3 border-top pt-3" id="comments-for-${post.id}" style="display: none;">
        
            <!-- Zone où s’afficheront les commentaires -->
            <div class="comments-list mb-3">
                <p class="text-muted"><em>Aucun commentaire pour l'instant.</em></p>
            </div>

            <!-- Formulaire d’ajout de commentaire -->
            <div class="comment-form d-flex align-items-center">
                <img src="${avatar}" alt="Votre avatar" class="rounded-circle me-2" style="width: 36px; height: 36px;">
                <input type="text" class="form-control me-2 comment-input" placeholder="Écrivez un commentaire..." data-post-id="${post.id}">
                <button class="btn btn-primary add-comment-btn" data-post-id="${post.id}">Envoyer</button>
            </div>
        </div>
    </article>`;
}

async function initHomePage() {
    const token = sessionStorage.getItem('userToken');
    if (!token) {
        logout();
        return;
    }

    document.body.classList.add('app-active');
    attachLogoutEvent();
    updateActiveHeaderTab('home');

    console.log("Page d'accueil initialisée.");

    const feedContainer = document.getElementById('feed-container');
    feedContainer.innerHTML = "Chargement des articles...";

    // Création de post (au clavier)
   const input = document.querySelector('.create-post-input');
    const imageInput = document.getElementById('imageInput');
    const photoBtn = document.getElementById('photoBtn');
    let selectedImage = null; // image temporairement stockée

    // 1. Clique sur le bouton "Photo/Vidéo" → ouvre le sélecteur de fichier
    photoBtn.addEventListener('click', () => {
    imageInput.click();
    });

    // 2. Lorsqu'une image est choisie, on la stocke
    imageInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        selectedImage = e.target.files[0];
        console.log("Image sélectionnée :", selectedImage.name);
    }
    });

    // 3. Entrée dans le champ de texte → envoie le texte + image si présente
    input.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter' && e.target.value.trim() !== "") {
        const description = e.target.value.trim();
        const imageFile = selectedImage;

        const result = await apiCreatePost(description, imageFile);

        if (result.success) {
        const postHTML = createPostHTML(result.post);
        feedContainer.insertAdjacentHTML('afterbegin', postHTML);

        // Réinitialisation
        e.target.value = "";
        selectedImage = null;
        imageInput.value = ""; // vide le champ file
        } else {
        alert(result.error || "Erreur lors de la création du post.");
        }
    }
    });


    // Charger le fil d’actualité
    const postsResponse = await apiFetchPosts();
    if (postsResponse.success) {
        feedContainer.innerHTML = "";
        postsResponse.posts.forEach(post => {
            feedContainer.innerHTML += createPostHTML(post);
        });
        attachPostEventListeners();
    } else {
        feedContainer.innerHTML = "Impossible de charger les articles.";
    }
}


function updateActiveHeaderTab(activeItemName) {
    const navIcons = document.querySelectorAll('.fb-header-center .fb-header-icon');
    navIcons.forEach(iconLink => {
        iconLink.classList.remove('active');
        if (iconLink.dataset.navItem === activeItemName) {
            iconLink.classList.add('active');
        }
    });
}


function updateHeaderAvatar(avatarUrl) {
    const headerAvatarImg = document.getElementById('header-user-avatar');
    if (headerAvatarImg && avatarUrl) {
        headerAvatarImg.src = avatarUrl;
    }
}
// cette fonction recupère l'evenement like et envoie id du post a l'Api qui revoie une reponse json qui comporte is_like_by_user qui est soit trueou false si true on ajoute un like si false on retire 
async function toggleLike(postId, buttonElement) {
    const token = sessionStorage.getItem('userToken');

    const response = await fetch('/facebook_clone/Api/post/like.php', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ post_id: postId })
    });

    const result = await response.json();

    if (result.success) {
        const icon = buttonElement.querySelector('.icon');
        const likeCountSpan = buttonElement.querySelector('.like-count');

        if (result.is_liked_by_user) {
            buttonElement.classList.add('liked');
            icon.textContent = '❤️';
            buttonElement.style.color = 'blue';
        } else {
            buttonElement.classList.remove('liked');
            icon.textContent = '👍';
            buttonElement.style.color = 'white';
        }

        likeCountSpan.textContent = result.new_likes_count;
    } else {
        alert(result.error || "Erreur lors du like.");
    }
}
// Fonction pour charger les commentaires d'un post spécifique depuis read.php
async function loadCommentsForPost(postId) {
    
    const token = sessionStorage.getItem('userToken');

    const response = await fetch(`/facebook_clone/Api/comments/read.php?post_id=${postId}`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    const result = await response.json();

    const commentsList = document.querySelector(`#comments-for-${postId} .comments-list`);
    commentsList.innerHTML = ""; 

    if (result.success) {
        if (result.comments.length === 0) {
            commentsList.innerHTML = `<p style="color: white;"><em>Aucun commentaire pour l'instant.</em></p>`;
        } else {
            result.comments.forEach(comment => {
                const commentHTML = createCommentHTML(comment);
                commentsList.insertAdjacentHTML('beforeend', commentHTML);
            });
        }
    } else {
        commentsList.innerHTML = `<p class="text-danger">${result.error}</p>`;
    }
}
// Fonction pour obtenir l'ID de l'utilisateur actuel à partir du token
function getCurrentUserId() {
    const token = sessionStorage.getItem('userToken');
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token));
        return payload.id || null;
    } catch (e) {
        console.error("Token invalide :", e);
        return null;
    }
}

// Fonction pour créer le HTML d'un commentaire
function createCommentHTML(comment) {
    const isAuthor = (comment.author_id === getCurrentUserId()); 
    const authorLabel = isAuthor ? ' <span class="badge bg-secondary">Auteur</span>' : '';
    const avatar = comment.author_avatar || '/facebook_clone/assets/default-avatar.jpg';

    return `
        <div class="d-flex align-items-start mb-2">
            <img src="${avatar}" class="rounded-circle me-2" style="width: 32px; height: 32px;">
            <div>
                <strong>${comment.author_name}</strong>${authorLabel}<br>
                <span>${comment.text}</span>
            </div>
        </div>
    `;
}






// NOUVELLE FONCTION pour gérer toute l'interactivité des posts
function attachPostEventListeners() {
    const feedContainer = document.getElementById('feed-container');

    feedContainer.addEventListener('click', (event) => {
        // --- GESTION DU BOUTON "COMMENTER" (pour afficher/cacher) ---
        document.addEventListener('click', async (e) => {
    const commentBtn = e.target.closest('.comment-btn');
    if (commentBtn) {
        const postId = commentBtn.dataset.postId;
        const section = document.getElementById(`comments-for-${postId}`);
        section.style.display = section.style.display === 'none' ? 'block' : 'none';

        

        if (section.style.display === 'block') {
            await loadCommentsForPost(postId); // charge les commentaires
        }
    }
            commentBtn.disabled = true;

    });

        // --- GESTION DE L'AJOUT D'UN NOUVEAU COMMENTAIRE ---
        document.addEventListener('click', async function (event) {
        const btn = event.target.closest('.add-comment-btn');
        if (!btn) return;

        const postId = btn.dataset.postId;
        const commentForm = btn.closest('.comment-form');
        const commentInput = commentForm.querySelector('.comment-input');
        const commentText = commentInput.value.trim();
        const commentsList = btn.closest('.comments-section').querySelector('.comments-list');
            
        if (!commentText) return;

        const token = sessionStorage.getItem('userToken');
        btn.disabled = true;

        try {
            const response = await fetch('/facebook_clone/Api/comments/create.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    post_id: postId,
                    text: commentText
                })
            });

            const data = await response.json();

            if (data.success) {
                const emptyText = commentsList.querySelector('p');
                if (emptyText) emptyText.remove();

                const commentHTML = createCommentHTML(data.comment);
                commentsList.insertAdjacentHTML('beforeend', commentHTML);
                commentInput.value = '';
            } else {
                alert(data.error || "Erreur lors de l'ajout du commentaire.");
            }
        } catch (error) {
            console.error("Erreur réseau :", error);
        } finally {
            btn.disabled = false;
        }
    });
    });
}




// VERSION COMPLÈTE ET CORRIGÉE de initProfilePage
async function initProfilePage() {
   if (!sessionStorage.getItem('userToken')) { logout(); return; }
    document.body.classList.add('app-active');
    attachLogoutEvent();
    updateActiveHeaderTab('profile');

    console.log("Page de profil initialisée.");
    attachLogoutEvent(); 

    const profileNameEl = document.getElementById('profile-name'); // Pour le nom
    const profileAvatarImgEl = document.getElementById('profile-avatar-img'); // CORRIGÉ
    const profileCoverImgEl = document.getElementById('profile-cover-img'); // CORRIGÉ
    const profileFriendsCountEl = document.getElementById('profile-page-friends-count'); // CORRIGÉ

    // --- 1. Charger et afficher les informations de l'utilisateur ---
    try {
        const profileResponse = await apiFetchUserProfile(); // Assurez-vous que cette fonction existe et est correcte
        if (profileResponse.success) {
            const user = profileResponse.user;
            if (profileNameEl) profileNameEl.textContent = `${user.firstname} ${user.lastname}`;
            if (profileAvatarImgEl) {
                profileAvatarImgEl.src = user.avatar;
                profileAvatarImgEl.alt = `Avatar de ${user.firstname}`;
            }
            if (profileCoverImgEl && user.banner) profileCoverImgEl.src = user.banner; // Vérifier si user.banner existe
            if (profileFriendsCountEl) profileFriendsCountEl.textContent = `${user.friendsCount} ami(e)s`;
        } else {
            if (profileNameEl) profileNameEl.textContent = 'Erreur chargement profil';
            console.error("Échec du chargement du profil:", profileResponse.message);
        }
    } catch (error) {
        console.error("Erreur lors de apiFetchUserProfile:", error);
        if (profileNameEl) profileNameEl.textContent = 'Erreur chargement profil';
    }
    

    // --- 2. Charger et afficher les publications spécifiques à l'utilisateur ---
    const feedContainer = document.getElementById('profile-feed-container');
    if (feedContainer) {
        feedContainer.innerHTML = 'Chargement des publications...';
        try {
            const postsResponse = await apiFetchPostsForUser(1); // Assurez-vous que cette fonction existe et est correcte
            if (postsResponse.success) {
                feedContainer.innerHTML = ''; 
                if (postsResponse.posts && postsResponse.posts.length > 0) { // Vérifier que posts existe
                    postsResponse.posts.forEach(post => {
                        feedContainer.innerHTML += createPostHTML(post); // Assurez-vous que createPostHTML existe
                    });
                    // if (typeof attachProfilePostEventListeners === 'function') { // Vérifier si la fonction existe
                    //    attachProfilePostEventListeners();
                    // } else {
                    //    console.warn("Fonction attachProfilePostEventListeners non définie.");
                    // }
                } else {
                    feedContainer.innerHTML = '<p class="text-center p-3" style="color: #B0B3B8;">Vous n\'avez encore rien publié.</p>';
                }
            } else {
                feedContainer.innerHTML = '<p class="text-center p-3" style="color: #B0B3B8;">Erreur lors du chargement des publications.</p>';
                console.error("Échec du chargement des posts:", postsResponse.message);
            }
        } catch (error) {
            console.error("Erreur lors de apiFetchPostsForUser:", error);
            feedContainer.innerHTML = '<p class="text-center p-3" style="color: #B0B3B8;">Erreur lors du chargement des publications.</p>';
        }
    } else {
        console.warn("Conteneur 'profile-feed-container' non trouvé.");
    }
    

    // --- 3. Ajouter l'interactivité aux boutons de la page de profil ---
    const editProfileButton = document.getElementById('edit-profile-btn');
    if (editProfileButton) {
        if (!editProfileButton.hasAttribute('data-listener-attached-prof')) {
            editProfileButton.addEventListener('click', () => {
                const currentName = profileNameEl ? profileNameEl.textContent : "";
                const newName = prompt("Entrez votre nouveau nom complet :", currentName);
                if (newName && newName.trim() !== "" && profileNameEl) {
                    profileNameEl.textContent = newName;
                    console.log("Profil mis à jour (simulation)");
                    // Mettre à jour FAKE_USER_DATA si vous l'utilisez pour la persistance simulée
                     if (typeof FAKE_USER_DATA !== 'undefined') {
                        const nameParts = newName.trim().split(' ');
                        FAKE_USER_DATA.firstname = nameParts[0] || "";
                        FAKE_USER_DATA.lastname = nameParts.slice(1).join(' ') || "";
                    }
                } else if (newName !== null) {
                    alert("Le nom ne peut pas être vide.");
                }
            });
            editProfileButton.setAttribute('data-listener-attached-prof', 'true');
        }
    } else {
        console.warn("Bouton 'edit-profile-btn' non trouvé pour attacher l'événement.");
    }

    const editBannerButton = document.getElementById('edit-banner-btn');
    if (editBannerButton) {
         if (!editBannerButton.hasAttribute('data-listener-attached-banner')) {
            editBannerButton.addEventListener('click', () => {
                alert("La modification de la bannière n'est pas encore implémentée.");
            });
            editBannerButton.setAttribute('data-listener-attached-banner', 'true');
        }
    } else {
        console.warn("Bouton 'edit-banner-btn' non trouvé pour attacher l'événement.");
    }

    // Logique pour le bouton "Ajouter une bio" (si vous l'avez gardé)
    const editBioBtn = document.getElementById('edit-bio-btn');
    if(editBioBtn){
        if(!editBioBtn.hasAttribute('data-listener-bio')){
            editBioBtn.addEventListener('click', () => {
                const profileBioContent = document.getElementById('profile-bio-content');
                const currentBio = profileBioContent ? profileBioContent.textContent : "";
                const newBio = prompt("Entrez votre bio :", currentBio);
                if (newBio !== null && profileBioContent) {
                    profileBioContent.textContent = newBio;
                    if (typeof FAKE_USER_DATA !== 'undefined') FAKE_USER_DATA.bio = newBio;
                    editBioBtn.textContent = newBio.trim() !== "" ? "Modifier la bio" : "Ajouter une bio";
                }
            });
            editBioBtn.setAttribute('data-listener-bio', 'true');
        }
    } else {
        console.warn("Bouton 'edit-bio-btn' non trouvé.");
    }
}

// NOTE : On crée une nouvelle fonction pour les posts du profil pour ne pas interférer
// avec celle de la page d'accueil, au cas où les logiques deviendraient différentes.
function attachProfilePostEventListeners() {
    const feedContainer = document.getElementById('profile-feed-container');
    if (!feedContainer) return; // Sécurité si le conteneur n'existe pas

    // Pour l'instant, on peut simplement réutiliser la même logique que la page d'accueil.
    // On pourrait copier/coller la logique de `attachPostEventListeners` ici,
    // ou mieux, la rendre plus générique. Pour l'instant, faisons simple :
    feedContainer.addEventListener('click', (event) => {
        const target = event.target;
        // La logique des boutons like/comment est la même, donc on peut la factoriser plus tard.
        // Pour l'instant, on la duplique pour que ça fonctionne.

        // GESTION DU BOUTON "J'AIME"
        const likeButton = target.closest('.like-btn');
        if (likeButton) {
            likeButton.classList.toggle('liked');
            likeButton.style.color = likeButton.classList.contains('liked') ? 'blue' : 'black';
        }

        // GESTION DU BOUTON "COMMENTER"
        const commentButton = target.closest('.comment-btn');
        if (commentButton) {
            const postId = commentButton.dataset.postId;
            const commentsSection = document.getElementById(`comments-for-${postId}`);
            commentsSection.style.display = commentsSection.style.display === 'block' ? 'none' : 'block';
        }

        // GESTION DE L'AJOUT D'UN NOUVEAU COMMENTAIRE
        const addCommentButton = target.closest('.add-comment-btn');
        if (addCommentButton) {
            // (Même logique que dans attachPostEventListeners)
            const postId = addCommentButton.dataset.postId;
            const postCard = document.getElementById(`post-${postId}`);
            const input = postCard.querySelector('.comment-form input');
            if (input.value.trim()) {
                const commentsList = postCard.querySelector('.comments-list');
                if (commentsList.querySelector('em')) commentsList.innerHTML = '';
                commentsList.innerHTML += createCommentHTML({ author: "Vous", text: input.value.trim() });
                input.value = '';
            }
        }
    });
}

// Génère le HTML d'une carte utilisateur selon le type (demande ou simple utilisateur)
function createUserCardHTML(user, type = 'user') {
    let buttons = '';
    
    if (type === 'request') {
        buttons = `
            <button class="accept-friend-btn" data-user-id="${user.id}">Accepter</button>
            <button class="refuse-friend-btn" data-user-id="${user.id}">Refuser</button>
        `;
    } else if (type === 'user') {
        // Ici pas de onclick inline : gestion via event listener
        buttons = `<button class="add-friend-btn" data-user-id="${user.id}">Ajouter en ami</button>`;
    }

    return `
        <div class="user-card" id="user-card-${user.id}" style="display: flex; align-items: center; justify-content: space-between; border: 1px solid #ddd; padding: 10px; margin-bottom: 10px;">
            <div style="display: flex; align-items: center; gap: 15px;">
                <img src="${user.avatar || 'default-avatar.png'}" alt="Avatar de ${user.name}" style="width: 60px; height: 60px; border-radius: 50%;">
                <strong>${user.name}</strong>
            </div>
            <div class="user-card-actions">
                ${buttons}
            </div>
        </div>
    `;
}

// Initialise la page "Amis" : charge données et attache événements
async function initFriendsPage() {
    if (!sessionStorage.getItem('userToken')) { logout(); return; }

    document.body.classList.add('app-active');
    attachLogoutEvent();
    updateActiveHeaderTab('friends');
    console.log("Page des amis initialisée.");

    const requestsList = document.getElementById('friend-requests-list');
    const allUsersList = document.getElementById('all-users-list');
    const searchInput = document.getElementById('search-users-input');

    // 1. Charger les demandes d'amitié
    async function fetchPendingRequests() {
        const token = sessionStorage.getItem('userToken');
        const response = await fetch('/facebook_clone/Api/friend/requests_received.php', {
            headers: { 'Authorization': 'Bearer ' + token }
        });
        const data = await response.json();
        if (data.success) {
            requestsList.innerHTML = '';
            data.requests.forEach(user => {
                requestsList.innerHTML += createUserCardHTML(user, 'request');
            });
        } else {
            alert("Erreur : " + data.error);
        }
    }
    await fetchPendingRequests();

    // 2. Charger tous les utilisateurs
    async function fetchAllUsers() {
        allUsersList.innerHTML = 'Chargement...';
        const token = sessionStorage.getItem('userToken');

        try {
            const response = await fetch('/facebook_clone/Api/friend/usersApi.php', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            });
            const usersResponse = await response.json();
            if (usersResponse.success) {
                allUsersList.innerHTML = '';
                usersResponse.users.forEach(user => {
                    allUsersList.innerHTML += createUserCardHTML(user, 'user');
                });
                return usersResponse.users; // on retourne la liste complète pour la recherche
            } else {
                allUsersList.innerHTML = '<p>Impossible de charger les utilisateurs.</p>';
                return [];
            }
        } catch (error) {
            allUsersList.innerHTML = `<p>Erreur réseau : ${error.message}</p>`;
            return [];
        }
    }

    // Stocke tous les utilisateurs pour le filtre
    let allUsers = await fetchAllUsers();

    // 3. Attacher les événements (clics boutons, recherche)
    attachFriendsPageEventListeners();

    // 4. Gestion de la recherche sur le nom utilisateur
    searchInput.addEventListener('keyup', () => {
        const filter = searchInput.value.toLowerCase().trim();

        // On vide la liste pour reconstruire
        allUsersList.innerHTML = '';

        // Filtrer les utilisateurs par nom qui contient le texte recherché
        const filteredUsers = allUsers.filter(user => user.name.toLowerCase().includes(filter));

        if (filteredUsers.length === 0) {
            allUsersList.innerHTML = '<p>Aucun utilisateur trouvé.</p>';
        } else {
            filteredUsers.forEach(user => {
                allUsersList.innerHTML += createUserCardHTML(user, 'user');
            });
        }
    });
}

// Fonction globale pour envoyer une demande d'amitié
async function sendFriendRequest(userId) {
    const token = sessionStorage.getItem('userToken');
    const btn = document.querySelector(`.add-friend-btn[data-user-id="${userId}"]`);

    try {
        const response = await fetch('/facebook_clone/Api/friend/send_request.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ recipient_user_id: userId })
        });
        const data = await response.json();

        if (data.success) {
            alert(data.message || 'Demande d\'ami envoyée avec succès.');
            if (btn) {
                btn.disabled = true;
                btn.textContent = 'Demande envoyée';
            }
        } else {
            alert('Erreur : ' + (data.error || 'Erreur inconnue'));
        }
    } catch (error) {
        alert('Erreur réseau ou serveur : ' + error.message);
    }
}

// Attacher les événements liés aux boutons d’amitié
function attachFriendsPageEventListeners() {
    const container = document.getElementById('friends-page-container');

    container.addEventListener('click', async function (e) {
        const token = sessionStorage.getItem('userToken');

        // Accepter une demande d'amitié
        if (e.target.classList.contains('accept-friend-btn')) {
            const userId = e.target.getAttribute('data-user-id');

            const res = await fetch('/facebook_clone/Api/friend/respond_request.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    target_user_id: userId,
                    action: 'accept'
                })
            });

            const data = await res.json();
            if (data.success) {
                e.target.textContent = 'Acceptée';
                e.target.disabled = true;
                if (e.target.nextElementSibling) e.target.nextElementSibling.disabled = true; // désactiver "Refuser"
            } else {
                alert(data.error || "Erreur lors de l'acceptation");
            }
        }

        // Refuser une demande d'amitié
        if (e.target.classList.contains('refuse-friend-btn')) {
            const userId = e.target.getAttribute('data-user-id');

            const res = await fetch('/facebook_clone/Api/friend/respond_request.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    target_user_id: userId,
                    action: 'refuse'
                })
            });

            const data = await res.json();
            if (data.success) {
                e.target.textContent = 'Refusée';
                e.target.disabled = true;
                if (e.target.previousElementSibling) e.target.previousElementSibling.disabled = true; // désactiver "Accepter"
            } else {
                alert(data.error || "Erreur lors du refus");
            }
        }

        // Envoyer une demande d'amitié
        if (e.target.classList.contains('add-friend-btn')) {
            const userId = e.target.getAttribute('data-user-id');
            sendFriendRequest(userId);
        }
    });
}

async function initChatPage() {
    console.log("Page de Chat initialisée.");
    attachLogoutEvent();
    
    const conversationsList = document.getElementById('conversations-list');
    conversationsList.innerHTML = 'Chargement...';

    const response = await apiFetchConversations();
    if (response.success) {
        conversationsList.innerHTML = '';
        response.conversations.forEach(convo => {
            conversationsList.innerHTML += createConversationItemHTML(convo);
        });
    } else {
        conversationsList.innerHTML = '<p>Impossible de charger les discussions.</p>';
    }

    attachChatEventListeners();
}

function attachChatEventListeners() {
  if (!sessionStorage.getItem('userToken')) { logout(); return; }
    document.body.classList.add('app-active');
    attachLogoutEvent();
    updateActiveHeaderTab('chat');

    const conversationsList = document.getElementById('conversations-list');
    
    // Gérer le clic sur une conversation dans la sidebar
    conversationsList.addEventListener('click', async (event) => {
        const conversationItem = event.target.closest('.conversation-item');
        if (conversationItem) {
            const convId = conversationItem.dataset.convId;
            const userName = conversationItem.dataset.userName;
            const userAvatar = conversationItem.dataset.userAvatar;
            
            // Afficher la fenêtre de chat et masquer le message de bienvenue
            document.getElementById('welcome-message').style.display = 'none';
            document.getElementById('active-chat-area').style.display = 'flex';
            
            // Mettre à jour l'entête du chat
            document.getElementById('chat-with-name').textContent = userName;
            document.getElementById('chat-with-avatar').src = userAvatar;
            
            // Charger et afficher les messages
            const messagesContainer = document.getElementById('messages-container');
            messagesContainer.innerHTML = 'Chargement des messages...';
            
            const response = await apiFetchMessagesForConversation(convId);
            messagesContainer.innerHTML = ''; // Vider le conteneur
            if (response.success) {
                response.messages.forEach(msg => {
                    messagesContainer.innerHTML += createMessageHTML(msg);
                });
            }
        }
    });

    // Gérer l'envoi d'un message (logique simple pour l'instant)
    document.getElementById('send-message-btn').addEventListener('click', () => {
        const input = document.getElementById('message-input');
        const text = input.value.trim();

        if (text) {
            const messagesContainer = document.getElementById('messages-container');
            const newMessage = { text: text, isMe: true };
            messagesContainer.insertAdjacentHTML('afterbegin', createMessageHTML(newMessage));
            input.value = '';
            input.focus();
        }
    });
    
    // Permettre l'envoi avec la touche "Entrée"
    document.getElementById('message-input').addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            document.getElementById('send-message-btn').click();
        }
    });
}

// assets/js/main.js

// ... (fonctions existantes)

// On déclare une variable globale pour garder une référence à notre intervalle
let chatInterval = null;





// Nous devons aussi nettoyer l'intervalle quand on quitte la page de chat.
// On peut modifier le routeur pour ça, mais une solution plus simple est de le faire
// au début de chaque initialisation de page.

// Modifiez le début des autres fonctions init...




// ===========================================
// === FONCTIONS D'INITIALISATION DE L'ADMIN ===
// ===========================================

function initAdminLoginPage() {
    // On s'assure de nettoyer les intervalles du chat si un admin se connecte
    if (chatInterval) clearInterval(chatInterval);

    const form = document.getElementById('admin-login-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Simulation de connexion admin
        const email = document.getElementById('admin-email').value;
        if (email === 'admin@faceclone.com') {
            console.log("Connexion admin réussie (simulation)");
            sessionStorage.setItem('adminToken', 'un_super_token_secret_admin_789');
            window.location.hash = '#admin/dashboard';
        } else {
            alert('Email ou mot de passe administrateur incorrect.');
        }
    });
}

function initAdminDashboardPage() {
    console.log("Dashboard admin initialisé.");
    const logoutBtn = document.getElementById('admin-logout-btn');
    logoutBtn.addEventListener('click', () => {
        sessionStorage.removeItem('adminToken');
        window.location.hash = '#admin/login';
    });
}

function logout() {
    if (chatInterval) clearInterval(chatInterval);
    sessionStorage.removeItem('userToken');
    document.body.classList.remove('app-active'); // ENLEVER LA CLASSE ICI
    window.location.hash = '#auth/login';
}