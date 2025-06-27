<!-- vues/clients/profile.html -->

<!-- VOTRE HEADER DE NAVIGATION SIMPLE QUE VOUS SOUHAITEZ CONSERVER -->
<!-- HEADER PRINCIPAL DE L'APPLICATION (STYLE FACEBOOK SOMBRE) -->
<header class="main-app-header fb-dark-header">
    <div class="fb-header-left">
        <a href="#home" class="fb-logo-link"> <!-- Lien sur le logo -->
            <i class="fab fa-facebook fa-2x fb-icon-logo"></i> <!-- Logo F bleu de Font Awesome -->
        </a>
        <div class="fb-search-bar">
            <i class="fas fa-search fb-search-icon"></i>
            <input type="text" placeholder="Rechercher sur Facebook" class="fb-search-input">
        </div>
    </div>

    <nav class="fb-header-center">
        <a href="#home" class="fb-header-icon" data-nav-item="home"><i class="fas fa-home fa-lg"></i></a>
        <a href="#friends" class="fb-header-icon" data-nav-item="friends"><i class="fas fa-user-friends fa-lg"></i></a>
        <a href="#watch" class="fb-header-icon" data-nav-item="watch"><i class="fas fa-tv fa-lg"></i></a> <!-- Placeholder pour Watch -->
        <a href="#marketplace" class="fb-header-icon" data-nav-item="marketplace"><i class="fas fa-store fa-lg"></i></a> <!-- Placeholder pour Marketplace -->
        <a href="#groups" class="fb-header-icon" data-nav-item="groups"><i class="fas fa-users fa-lg"></i></a> <!-- Placeholder pour Groups -->
    </nav>

    <div class="fb-header-right">
        <button class="fb-header-action-icon" aria-label="Menu"><i class="fas fa-th"></i></button> 
        <a href="#chat" class="fb-header-action-icon" aria-label="Messenger"><i class="fab fa-facebook-messenger"></i></a>
        <button class="fb-header-action-icon" aria-label="Notifications"><i class="fas fa-bell"></i></button>
        <a href="#profile" class="fb-header-action-icon fb-header-profile-avatar-link" aria-label="Compte">
            <img src="https://i.pravatar.cc/28?u=currentUser" alt="Profil" class="fb-user-avatar-sm" id="header-user-avatar">
        </a>
        <!-- BOUTON DE DÉCONNEXION STYLÉ ET POSITIONNÉ À DROITE -->
        <button id="logout-btn" class="btn btn-sm fb-logout-button-header">
            <i class="fas fa-sign-out-alt me-1"></i>Déconnexion
        </button>
    </div>
</header>

<!-- CONTENU PRINCIPAL DE LA PAGE PROFIL (STYLE FACEBOOK MODE SOMBRE) -->
<!-- Note: la classe fb-dark-layout viendra de global.css ou body.app-active -->
<main class="fb-profile-page-with-simple-header"> 

    <!-- SECTION HAUT DU PROFIL (COUVERTURE, AVATAR, NOM, BOUTONS) -->
    <div class="fb-profile-header-container card-fb-dark-no-padding">
        <div class="fb-profile-cover-photo">
            <img src="https://picsum.photos/seed/cover1/1000/350" alt="Photo de couverture" id="profile-cover-img">
            <button class="btn btn-light btn-sm fb-cover-photo-button" id="edit-banner-btn"><i class="fas fa-camera"></i> Ajouter une photo de couverture</button>
        </div>

        <div class="fb-profile-info-bar">
            <div class="fb-profile-picture-container">
                <img src="https://i.pravatar.cc/168?u=currentUser" alt="Photo de profil" id="profile-avatar-img" class="fb-profile-picture">
                <button class="btn btn-light btn-sm fb-profile-picture-button"><i class="fas fa-camera"></i></button>
            </div>
            <div class="fb-profile-name-actions">
                <h1 id="profile-name" class="text-white">Chargement...</h1> 
                <p id="profile-page-friends-count" class="text-muted-dark">X ami(e)s</p>
            </div>
            <div class="fb-profile-buttons ms-auto">
                <button class="btn btn-primary btn-sm"><i class="fas fa-plus-circle"></i> Ajouter à la story</button>
                <button class="btn btn-secondary-dark btn-sm" id="edit-profile-btn"><i class="fas fa-pen"></i> Modifier le profil</button>
                <button class="btn btn-secondary-dark btn-sm"><i class="fas fa-chevron-down"></i></button>
            </div>
        </div>

        <nav class="fb-profile-nav">
            <ul>
                <li><a href="#" class="active">Publications</a></li>
                <li><a href="#">À propos</a></li>
                <li><a href="#">Ami(e)s</a></li>
                <li><a href="#">Photos</a></li>
                <li><a href="#">Vidéos</a></li>
                <li><a href="#">Reels</a></li>
                <li><a href="#">Plus <i class="fas fa-caret-down"></i></a></li>
            </ul>
            <button class="btn btn-secondary-dark btn-sm"><i class="fas fa-ellipsis-h"></i></button>
        </nav>
    </div>

    <!-- CONTENU DU PROFIL (LAYOUT À 2 COLONNES) -->
    <div class="fb-profile-body-container">
        <!-- Colonne de gauche du profil -->
        <div class="fb-profile-left-column">
            <div class="card-fb-dark p-3 mb-3">
                <h5 class="text-white">Intro</h5>
                <button class="btn btn-secondary-dark-outline btn-sm w-100 mb-2" id="edit-bio-btn">Ajouter une bio</button>
                <div id="profile-bio-content">
                    <!-- La bio sera chargée ici -->
                </div>
            </div>
            <div class="card-fb-dark p-3 mb-3">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <h5 class="text-white mb-0">Photos</h5>
                    <a href="#" class="small text-decoration-none link-primary">Voir toutes les photos</a>
                </div>
                <div class="row g-1"> <!-- Grille Bootstrap pour les photos -->
                    <div class="col-4"><img src="https://picsum.photos/seed/p1/120/120" class="img-fluid rounded fb-profile-photo-thumb" alt="photo"></div>
                    <div class="col-4"><img src="https://picsum.photos/seed/p2/120/120" class="img-fluid rounded fb-profile-photo-thumb" alt="photo"></div>
                    <div class="col-4"><img src="https://picsum.photos/seed/p3/120/120" class="img-fluid rounded fb-profile-photo-thumb" alt="photo"></div>
                    <div class="col-4"><img src="https://picsum.photos/seed/p4/120/120" class="img-fluid rounded fb-profile-photo-thumb" alt="photo"></div>
                    <div class="col-4"><img src="https://picsum.photos/seed/p5/120/120" class="img-fluid rounded fb-profile-photo-thumb" alt="photo"></div>
                    <div class="col-4"><img src="https://picsum.photos/seed/p6/120/120" class="img-fluid rounded fb-profile-photo-thumb" alt="photo"></div>
                </div>
            </div>
        </div>

        <!-- Colonne de droite du profil -->
        <div class="fb-profile-right-column">
            <div class="fb-create-post-box card-fb-dark mb-3">
                 <div class="create-post-header">
                    <img src="https://i.pravatar.cc/40?u=currentUser" alt="Avatar" class="fb-user-avatar-md">
                    <input type="text" placeholder="Que voulez-vous dire ?" class="create-post-input">
                </div>
                <hr class="my-2" style="border-color: #3E4042;">
                <div class="create-post-actions">
                    <button><i class="fas fa-video text-danger"></i> Vidéo en direct</button>
                    <button><i class="fas fa-photo-video text-success"></i> Photo/Vidéo</button>
                    <button><i class="far fa-grin-beam text-warning"></i> Humeur</button>
                </div>
            </div>
            <div class="card-fb-dark p-2 mb-3 d-flex justify-content-between align-items-center">
                <h6 class="text-white mb-0 ms-2">Publications</h6>
                <button class="btn btn-secondary-dark btn-sm"><i class="fas fa-sliders-h me-1"></i> Filtres</button>
            </div>
            <div id="profile-feed-container">
                <!-- Les articles de l'utilisateur seront injectés ici par JavaScript -->
            </div>
        </div>
    </div>
</main>