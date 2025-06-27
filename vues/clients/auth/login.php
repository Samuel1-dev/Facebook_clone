<!-- vues/clients/auth/login.html -->
<div class="fb-login-page-container">
    <div class="fb-login-content-wrapper">
        
        <!-- Panneau de gauche : Logo et Slogan -->
        <div class="fb-login-left-panel">
            <h1 class="fb-logo-text">facebook</h1>
            <h2 class="fb-tagline">
                Avec Facebook, partagez et restez en contact avec votre entourage.
            </h2>
        </div>

        <!-- Panneau de droite : Formulaire de connexion -->
        <div class="fb-login-right-panel">
            <div class="fb-login-form-card">
                <form id="login-form">
                    <div class="mb-3">
                        <input type="email" class="form-control form-control-lg fb-login-input" id="login-email" placeholder="Adresse e-mail ou numéro de tél." required>
                    </div>
                    <div class="mb-3">
                        <input type="password" class="form-control form-control-lg fb-login-input" id="login-password" placeholder="Mot de passe" required>
                    </div>
                    <button type="submit" class="btn btn-lg w-100 fw-bold fb-login-button">Se connecter</button>
                </form>
                <a href="#auth/forgot-password" class="fb-forgot-password-link">Mot de passe oublié ?</a>
                <hr class="fb-login-divider my-3">
                <div class="text-center">
                    <a href="#auth/register" class="btn btn-lg fw-bold fb-create-account-button">Créer un nouveau compte</a>
                </div>
            </div>
            <p class="fb-create-page-link">
                <a href="#" class="fw-bold">Créer une Page</a> pour une célébrité, une marque ou une entreprise.
            </p>
        </div>
    </div>
</div>