<!-- vues/back-office/users.html -->
<div id="admin-dashboard-layout" style="display: flex; height: 100vh;">
    <!-- Sidebar de navigation de l'admin (identique au dashboard) -->
    <aside id="admin-sidebar" style="width: 220px; background-color: #34495e; color: white; padding: 20px;">
        <h2>FaceClone Admin</h2>
        <hr>
        <nav>
            <ul style="list-style: none; padding: 0;">
                <li style="margin-bottom: 15px;"><a href="#admin/dashboard" style="color: white; text-decoration: none;">📊 Dashboard</a></li>
                <li style="margin-bottom: 15px;"><a href="#admin/users" style="color: white; text-decoration: none; font-weight: bold;">👥 Gérer les Utilisateurs</a></li>
                <li style="margin-bottom: 15px;"><a href="#admin/posts" style="color: white; text-decoration: none;">📝 Gérer les Articles</a></li>
            </ul>
        </nav>
        <button id="admin-logout-btn" style="position: absolute; bottom: 20px; width: 180px; padding: 10px; background-color: #e74c3c;">Déconnexion</button>
    </aside>

    <!-- Contenu principal de la gestion des utilisateurs -->
    <main id="admin-main-content" style="flex-grow: 1; padding: 20px; background-color: #ecf0f1; overflow-y: auto;">
        <h1>Gestion des Utilisateurs</h1>
        
        <input type="text" id="admin-search-users-input" placeholder="Rechercher un utilisateur par nom ou email..." style="width: 100%; padding: 10px; margin-bottom: 20px; border: 1px solid #ccc;">

        <table id="admin-users-table" style="width: 100%; border-collapse: collapse;">
            <thead>
                <tr style="background-color: #bdc3c7;">
                    <th style="padding: 10px; text-align: left;">ID</th>
                    <th style="padding: 10px; text-align: left;">Nom Complet</th>
                    <th style="padding: 10px; text-align: left;">Email</th>
                    <th style="padding: 10px; text-align: left;">Inscrit le</th>
                    <th style="padding: 10px; text-align: left;">Statut</th>
                    <th style="padding: 10px; text-align: left;">Actions</th>
                </tr>
            </thead>
            <tbody id="admin-users-list-body">
                <!-- Les utilisateurs seront injectés ici par JavaScript -->
            </tbody>
        </table>
    </main>
</div>