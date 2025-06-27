<!-- vues/back-office/dashboard.html -->
<div id="admin-dashboard-layout" style="display: flex; height: 100vh;">
    <!-- Sidebar de navigation de l'admin -->
    <aside id="admin-sidebar" style="width: 220px; background-color: #34495e; color: white; padding: 20px;">
        <h2>FaceClone Admin</h2>
        <hr>
        <nav>
            <ul style="list-style: none; padding: 0;">
                <li style="margin-bottom: 15px;"><a href="#admin/dashboard" style="color: white; text-decoration: none;">📊 Dashboard</a></li>
                <li style="margin-bottom: 15px;"><a href="#admin/users" style="color: white; text-decoration: none;">👥 Gérer les Utilisateurs</a></li>
                <li style="margin-bottom: 15px;"><a href="#admin/posts" style="color: white; text-decoration: none;">📝 Gérer les Articles</a></li>
            </ul>
        </nav>
        <button id="admin-logout-btn" style="position: absolute; bottom: 20px; width: 180px; padding: 10px; background-color: #e74c3c;">Déconnexion</button>
    </aside>

    <!-- Contenu principal du dashboard -->
    <main id="admin-main-content" style="flex-grow: 1; padding: 20px; background-color: #ecf0f1; overflow-y: auto;">
        <h1>Tableau de Bord</h1>
        <p>Bienvenue dans l'espace d'administration.</p>
        
        <!-- Exemple de statistiques (demandé dans le cahier des charges) -->
        <section id="stats-container" style="display: flex; gap: 20px; margin-top: 30px;">
            <div class="stat-card" style="background: white; padding: 20px; border-radius: 8px; flex-grow: 1; text-align: center;">
                <h3>Utilisateurs Inscrits</h3>
                <p style="font-size: 2em; font-weight: bold;">1,234</p>
            </div>
            <div class="stat-card" style="background: white; padding: 20px; border-radius: 8px; flex-grow: 1; text-align: center;">
                <h3>Articles Publiés</h3>
                <p style="font-size: 2em; font-weight: bold;">5,678</p>
            </div>
            <div class="stat-card" style="background: white; padding: 20px; border-radius: 8px; flex-grow: 1; text-align: center;">
                <h3>Admins / Modos</h3>
                <p style="font-size: 2em; font-weight: bold;">12</p>
            </div>
        </section>
    </main>
</div>