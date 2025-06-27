<!-- vues/clients/chat.html -->
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
<main id="chat-page-container" style="display: flex; height: 75vh; border: 1px solid #ccc;">

    <!-- Colonne de gauche : Liste des conversations -->
    <aside id="chat-sidebar" style="width: 30%; border-right: 1px solid #ccc; overflow-y: auto;">
        <div class="sidebar-header" style="padding: 10px; border-bottom: 1px solid #ccc;">
            <h2>Discussions</h2>
            <input type="text" id="search-chat-input" placeholder="Rechercher ou démarrer une discussion..." style="width: 95%; padding: 5px;">
        </div>
        <div id="conversations-list">
            <!-- La liste des conversations sera injectée ici -->
        </div>
    </aside>

    <!-- Colonne de droite : Fenêtre de la conversation active -->
    <section id="chat-window" style="width: 70%; display: flex; flex-direction: column;">
        <!-- L'entête, les messages et le champ de saisie s'afficheront ici quand une conversation est sélectionnée -->
        <div id="welcome-message" style="margin: auto; text-align: center; color: #888;">
            <h3>Bienvenue sur la messagerie</h3>
            <p>Sélectionnez une conversation pour commencer à discuter.</p>
        </div>
        <div id="active-chat-area" style="display: none; height: 100%; flex-direction: column;">
            <!-- Entête de la conversation active -->
            <header id="chat-header" style="padding: 10px; border-bottom: 1px solid #ccc; display: flex; align-items: center; gap: 10px;">
                <img id="chat-with-avatar" src="" alt="" style="width: 40px; height: 40px; border-radius: 50%;">
                <strong id="chat-with-name"></strong>
            </header>
            
            <!-- Zone des messages -->
            <div id="messages-container" style="flex-grow: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column-reverse;">
                <!-- Les messages seront injectés ici (en partant du bas) -->
            </div>
            
            <!-- Zone de saisie -->
            <footer id="chat-input-area" style="padding: 10px; border-top: 1px solid #ccc; display: flex; gap: 10px;">
                <input type="text" id="message-input" placeholder="Écrivez votre message..." style="flex-grow: 1; padding: 10px; border-radius: 20px; border: 1px solid #ddd;">
                <button id="send-message-btn">Envoyer</button>
            </footer>
        </div>
    </section>

</main>