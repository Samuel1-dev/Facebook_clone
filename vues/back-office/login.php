<!-- vues/back-office/login.html -->
<div id="admin-login-container" style="width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #2c3e50;">
    <form id="admin-login-form" style="padding: 40px; background: white; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.2); text-align: center;">
        <h1 style="color: #333;">Administration</h1>
        <p style="color: #666; margin-bottom: 20px;">Veuillez vous connecter pour continuer.</p>
        <input type="email" id="admin-email" placeholder="Email administrateur" required style="width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ccc;">
        <br>
        <input type="password" id="admin-password" placeholder="Mot de passe" required style="width: 100%; padding: 10px; margin-bottom: 20px; border: 1px solid #ccc;">
        <br>
        <button type="submit" style="width: 100%; padding: 10px; background-color: #3498db; color: white; border: none; border-radius: 4px; cursor: pointer;">Connexion</button>
    </form>
</div>