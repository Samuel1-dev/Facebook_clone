// assets/js/main.js

// Ce fichier contient la logique à exécuter pour chaque page.
// Ces fonctions sont appelées par le routeur après avoir chargé une vue.
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

async function initHomePage() {
 if (!sessionStorage.getItem('userToken')) { logout(); return; }
    document.body.classList.add('app-active');
    attachLogoutEvent();
    updateActiveHeaderTab('home');

 if (!sessionStorage.getItem('userToken')) {
        logout(); 
        return;
    }
    document.body.classList.add('app-active');
    console.log("Page d'accueil initialisée.");
    
    // --- PARTIE EXISTANTE : CHARGER LE FIL D'ACTUALITÉ ---
    const feedContainer = document.getElementById('feed-container');
    feedContainer.innerHTML = "Chargement des articles...";
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

    // --- NOUVELLE PARTIE : CHARGER LES CONTACTS DANS LA SIDEBAR ---
    const contactsContainer = document.getElementById('chat-contacts-container');
    if (contactsContainer) { // On vérifie que le conteneur existe bien
        contactsContainer.innerHTML = "Chargement...";
        const convosResponse = await apiFetchConversations();
        if (convosResponse.success) {
            contactsContainer.innerHTML = '';
            convosResponse.conversations.forEach(convo => {
                // On crée un lien direct vers la page de chat pour chaque contact
                contactsContainer.innerHTML += `
                    <a href="#chat" class="chat-contact-item" data-conv-id="${convo.id}" style="display: flex; align-items: center; gap: 10px; text-decoration: none; color: black; padding: 8px; border-radius: 8px;">
                        <img src="${convo.userAvatar}" alt="${convo.userName}" style="width: 36px; height: 36px; border-radius: 50%;">
                        <strong>${convo.userName}</strong>
                    </a>
                `;
            });
        } else {
            contactsContainer.innerHTML = 'Erreur chargement contacts.';
        }
    }
    
    attachLogoutEvent();
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





// NOUVELLE FONCTION pour gérer toute l'interactivité des posts
function attachPostEventListeners() {
    const feedContainer = document.getElementById('feed-container');

    feedContainer.addEventListener('click', (event) => {
        const target = event.target; // L'élément précis sur lequel on a cliqué

        // --- GESTION DU BOUTON "J'AIME" ---
        const likeButton = target.closest('.like-btn');
        if (likeButton) {
            likeButton.classList.toggle('liked'); // Ajoute ou enlève une classe 'liked'
            const icon = likeButton.querySelector('.icon');
            if (likeButton.classList.contains('liked')) {
                likeButton.style.color = 'blue'; // Simulation du changement de couleur de l'icône
                icon.textContent = '❤️';
                console.log(`Vous aimez le post #${likeButton.dataset.postId}`);
            } else {
                likeButton.style.color = 'black';
                icon.textContent = '👍';
                console.log(`Vous n'aimez plus le post #${likeButton.dataset.postId}`);
            }
        }

        // --- GESTION DU BOUTON "COMMENTER" (pour afficher/cacher) ---
        const commentButton = target.closest('.comment-btn');
        if (commentButton) {
            const postId = commentButton.dataset.postId;
            const commentsSection = document.getElementById(`comments-for-${postId}`);
            // On inverse l'affichage
            const isVisible = commentsSection.style.display === 'block';
            commentsSection.style.display = isVisible ? 'none' : 'block';
        }

        // --- GESTION DE L'AJOUT D'UN NOUVEAU COMMENTAIRE ---
        const addCommentButton = target.closest('.add-comment-btn');
        if (addCommentButton) {
            const postId = addCommentButton.dataset.postId;
            const postCard = document.getElementById(`post-${postId}`);
            const input = postCard.querySelector('.comment-form input');
            const commentText = input.value.trim();

            if (commentText) {
                console.log(`Nouveau commentaire sur le post #${postId}: "${commentText}"`);
                const commentsList = postCard.querySelector('.comments-list');
                
                // Si c'est le premier commentaire, on enlève le message "Aucun commentaire"
                if (commentsList.querySelector('em')) {
                    commentsList.innerHTML = '';
                }
                
                // Création du HTML pour le nouveau commentaire (on simule l'auteur)
                const newComment = { author: "Vous", text: commentText };
                commentsList.innerHTML += createCommentHTML(newComment);
                
                // On vide le champ de saisie
                input.value = '';
            }
        }
    });
}

// assets/js/main.js

// ... (les autres fonctions comme initLoginPage, initHomePage, attachPostEventListeners, etc. restent identiques)

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
// ... (le reste du fichier)

// assets/js/main.js

// ... (fonctions existantes)

async function initFriendsPage() {
 if (!sessionStorage.getItem('userToken')) { logout(); return; }
    document.body.classList.add('app-active');
    attachLogoutEvent();
    updateActiveHeaderTab('friends');

    console.log("Page des amis initialisée.");
    attachLogoutEvent();

    const requestsList = document.getElementById('friend-requests-list');
    const allUsersList = document.getElementById('all-users-list');

    // --- 1. Charger les demandes d'amitié ---
    requestsList.innerHTML = 'Chargement...';
    const requestsResponse = await apiFetchFriendRequests();
    if (requestsResponse.success && requestsResponse.requests.length > 0) {
        requestsList.innerHTML = '';
        requestsResponse.requests.forEach(user => {
            requestsList.innerHTML += createUserCardHTML(user, 'request');
        });
    } else {
        requestsList.innerHTML = '<p>Aucune nouvelle demande d\'amitié.</p>';
    }

    // --- 2. Charger tous les utilisateurs ---
    allUsersList.innerHTML = 'Chargement...';
    const usersResponse = await apiFetchAllUsers();
    if (usersResponse.success) {
        allUsersList.innerHTML = '';
        usersResponse.users.forEach(user => {
            allUsersList.innerHTML += createUserCardHTML(user, 'user');
        });
    } else {
        allUsersList.innerHTML = '<p>Impossible de charger les utilisateurs.</p>';
    }
    
    // --- 3. Ajouter l'interactivité ---
    attachFriendsPageEventListeners();
}

function attachFriendsPageEventListeners() {
    const container = document.getElementById('friends-page-container');
    
    container.addEventListener('click', (event) => {
        const target = event.target;
        
        // Accepter une demande
        const acceptBtn = target.closest('.accept-friend-btn');
        if (acceptBtn) {
            const userId = acceptBtn.dataset.userId;
            console.log(`Demande d'ami de l'utilisateur #${userId} acceptée.`);
            const card = document.getElementById(`user-card-${userId}`);
            card.innerHTML = `<p style="color: green;">Vous êtes maintenant amis.</p>`;
            setTimeout(() => card.remove(), 2000); // Fait disparaître la carte après 2s
        }

        // Refuser une demande
        const refuseBtn = target.closest('.refuse-friend-btn');
        if (refuseBtn) {
            const userId = refuseBtn.dataset.userId;
            console.log(`Demande d'ami de l'utilisateur #${userId} refusée.`);
            const card = document.getElementById(`user-card-${userId}`);
            card.style.opacity = '0.5';
            card.innerHTML += `<p style="color: red;">Demande refusée.</p>`;
            setTimeout(() => card.remove(), 2000);
        }

        // Ajouter un ami
        const addBtn = target.closest('.add-friend-btn');
        if (addBtn) {
            const userId = addBtn.dataset.userId;
            console.log(`Demande d'ami envoyée à l'utilisateur #${userId}.`);
            addBtn.textContent = 'Demande envoyée';
            addBtn.disabled = true; // Désactive le bouton pour ne pas cliquer 2 fois
        }
    });

    // Filtre de recherche
    const searchInput = document.getElementById('search-users-input');
    searchInput.addEventListener('keyup', () => {
        const filter = searchInput.value.toLowerCase();
        const userCards = document.querySelectorAll('#all-users-list .user-card');
        
        userCards.forEach(card => {
            const userName = card.querySelector('strong').textContent.toLowerCase();
            if (userName.includes(filter)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
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