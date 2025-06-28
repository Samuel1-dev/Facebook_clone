// assets/js/router.js

const appContainer = document.getElementById('app-container');

// Définition des routes de l'application
const routes = {
    // --- Routes Client ---
    'auth/login': { path: 'vues/clients/auth/login.php', init: initLoginPage, isProtected: false },
    'auth/register': { path: 'vues/clients/auth/register.php', init: initRegisterPage, isProtected: false },
    'home': { path: 'vues/clients/home.php', init: initHomePage, isProtected: true },
    'profile': { path: 'vues/clients/profile.php', init: initProfilePage, isProtected: true },
    'friends': { path: 'vues/clients/friends.php', init: initFriendsPage, isProtected: true },
    'chat': { path: 'vues/clients/chat.php', init: initChatPage, isProtected: true },

    // --- Routes Admin ---
    'admin/login': { path: 'vues/back-office/login.php', init: initAdminLoginPage, isAdminRoute: true, isProtected: false },
    'admin/dashboard': { path: 'vues/back-office/dashboard.php', init: initAdminDashboardPage, isAdminRoute: true, isProtected: true },
    
};

// Fonction pour charger une vue (ne change pas)
async function loadView(route) {
    try {
        const response = await fetch(route.path);
        if (!response.ok) throw new Error('Vue non trouvée');
        
        const html = await response.text();
        appContainer.innerHTML = html;
        
        if (route.init) {
            route.init();
        }
    } catch (error) {
        console.error("Erreur de chargement de la vue:", error);
        appContainer.innerHTML = `<h2>Erreur 404 - Page non trouvée</h2>`;
    }
}

// VERSION FINALE ET ROBUSTE DE LA FONCTION ROUTER
function router() {
    // 1. Déterminer la route demandée, avec une route par défaut claire
    const hash = window.location.hash.substring(1) || 'auth/login';
    const route = routes[hash];

    // 2. Vérifier si la route existe. Si non, c'est une 404.
    if (!route) {
        appContainer.innerHTML = `<h2>Erreur 404 - La route '${hash}' n'existe pas.</h2>`;
        // On redirige vers la page de connexion après un court instant
        setTimeout(() => { window.location.hash = '#auth/login'; }, 2000);
        return;
    }

    // 3. Vérifier les états de connexion
    const isUserConnected = !!sessionStorage.getItem('userToken');
    const isAdminConnected = !!sessionStorage.getItem('adminToken');

    // 4. Logique de protection des routes
    if (route.isProtected) {
        // C'est une route protégée
        if (route.isAdminRoute) {
            // C'est une route admin protégée
            if (isAdminConnected) {
                loadView(route); // L'admin est connecté, on charge la vue
            } else {
                window.location.hash = '#admin/login'; // L'admin n'est pas connecté, redirection
            }
        } else {
            // C'est une route client protégée
            if (isUserConnected) {
                loadView(route); // L'utilisateur est connecté, on charge la vue
            } else {
                window.location.hash = '#auth/login'; // L'utilisateur n'est pas connecté, redirection
            }
        }
    } else {
        // C'est une route publique (login, register)
        if (route.isAdminRoute && isAdminConnected) {
            // L'admin est connecté et tente d'accéder à la page de login admin
            window.location.hash = '#admin/dashboard';
        } else if (!route.isAdminRoute && isUserConnected) {
            // L'utilisateur est connecté et tente d'accéder à la page de login client
            window.location.hash = '#home';
        } else {
            loadView(route); // Personne n'est connecté, on charge la vue publique
        }
    }
}

// Écoute les changements de hash dans l'URL et le chargement initial de la page
window.addEventListener('hashchange', router);
window.addEventListener('load', router);