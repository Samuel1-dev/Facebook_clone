<!-- vues/clients/friends.html -->
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
<hr>
<main id="friends-page-container" style="max-width: 900px; margin: auto; padding: 20px;">
    
    <!-- Section des demandes d'amitié -->
    <section id="friend-requests-section">
        <h2>Demandes d'amitié</h2>
        <div id="friend-requests-list" class="user-list">
            <!-- Les demandes seront injectées ici -->
        </div>
    </section>

    <hr style="margin: 30px 0;">

    <!-- Section pour trouver de nouveaux amis -->
    <section id="people-you-may-know-section">
        <h2>Trouver des amis</h2>
        <input type="text" id="search-users-input" placeholder="Rechercher un utilisateur..." style="width: 100%; padding: 8px; margin-bottom: 20px;">
        <div id="all-users-list" class="user-list">
            <!-- Tous les utilisateurs seront injectés ici -->
        </div>
    </section>

</main>