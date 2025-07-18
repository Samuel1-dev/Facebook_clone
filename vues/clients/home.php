<!-- vues/clients/home.html -->

<!-- HEADER PRINCIPAL DE L'APPLICATION (STYLE FACEBOOK SOMBRE) -->
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
            <img src="/facebook_clone/assets/default-avatar.jpg" alt="Profil" class="fb-user-avatar-sm" id="header-user-avatar">
        </a>
        <!-- BOUTON DE DÉCONNEXION STYLÉ ET POSITIONNÉ À DROITE -->
        <button id="logout-btn" class="btn btn-sm fb-logout-button-header">
            <i class="fas fa-sign-out-alt me-1"></i>Déconnexion
        </button>
    </div>
</header>
<!-- CONTENU PRINCIPAL DE LA PAGE (LAYOUT À 3 COLONNES) -->
<main class="fb-main-content-area fb-dark-layout">

    <!-- COLONNE DE GAUCHE -->
    <aside class="fb-left-sidebar">
        <nav>
            <ul>
                <li><a href="#profile"><img src="/facebook_clone/assets/default-avatar.jpg  " class="fb-sidebar-icon avatar" alt="Profil"> <span></span></a></li>
                <li><a href="#friends"><i class="fas fa-user-friends fb-sidebar-icon"></i> <span>Amis</span></a></li>
                <li><a href="#"><i class="fas fa-bookmark fb-sidebar-icon"></i> <span>Enregistrements</span></a></li>
                <li><a href="#"><i class="fas fa-users fb-sidebar-icon"></i> <span>Groupes</span></a></li>
                <li><a href="#"><i class="fas fa-store fb-sidebar-icon"></i> <span>Marketplace</span></a></li>
                <li><a href="#"><i class="fas fa-tv fb-sidebar-icon"></i> <span>Watch</span></a></li>
                <li><a href="#"><i class="fas fa-clock fb-sidebar-icon"></i> <span>Souvenirs</span></a></li>
                <li><a href="#" class="see-more-link"><i class="fas fa-chevron-down fb-sidebar-icon"></i> <span>Voir plus</span></a></li>
            </ul>
        </nav>
        <!-- Vous pouvez ajouter la section "Vos raccourcis" ici plus tard -->
    </aside>

    <!-- COLONNE CENTRALE (FIL D'ACTUALITÉ) -->
    <section class="fb-feed-column">

  <!-- Boîte de création de post -->
  <div class="fb-create-post-box card-fb-dark">
    <div class="create-post-header">
      <a href="#profile">
        <img src="/facebook_clone/assets/default-avatar.jpg" alt="Avatar" class="fb-user-avatar-md" />
      </a>
      <input
        type="text"
        placeholder="Quoi de neuf ?"
        class="create-post-input"
        name="description"
        autocomplete="off"
      />
      <!-- Champ pour uploader une image -->
    </div>
    <hr class="my-2" />
    <div class="create-post-actions">
    <button type="button" id="liveBtn"><i class="fas fa-video text-danger"></i> Vidéo en direct</button>
    <button type="button" id="photoBtn"><i class="fas fa-photo-video text-success"></i> Photo/Vidéo</button>
    <button type="button"><i class="far fa-grin-beam text-warning"></i> Humeur/Activité</button>
    </div>

    <input type="file" id="imageInput" name="image" accept="image/*" style="display: none;">


  <!-- Conteneur pour les articles du fil d'actualité -->
  <div id="feed-container">
    <!-- Les articles (posts) seront injectés ici par JavaScript -->
  </div>
</section>


    <!-- COLONNE DE DROITE -->
    <aside class="fb-right-sidebar">
        <div class="fb-sponsored-section">
            <h6>Sponsorisé</h6>
            <div class="sponsored-item">
                <img src="https://via.placeholder.com/100x100.png?text=Pub1" alt="Pub">
                <div>
                    <strong>Titre de la pub 1</strong>
                    <small>siteannonceur.com</small>
                </div>
            </div>
            <!-- ... autres pubs ... -->
        </div>
        <hr class="my-3">
        <div id="chat-contacts-container" class="fb-contacts-section">
             <h6>Contacts</h6>
            <!-- La liste des contacts (simulée) sera injectée ici par JavaScript comme avant, mais avec le style sombre -->
        </div>
    </aside>

</main>