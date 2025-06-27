<!-- vues/clients/auth/register.html -->
<div class="modal-backdrop-custom">
    <div class="modal-dialog-custom fb-register-modal">
        <div class="modal-content-custom">
            <div class="modal-header-custom">
                <div>
                    <h1 class="fb-logo-text-register">facebook</h1> 
                    <hr class="fb-modal-divider-header mt-2 mb-3"> 
                    <h2 class="modal-title-custom">Créer un compte</h2>
                    <p class="modal-subtitle-custom">C’est simple et rapide.</p>
                </div>
            </div>
            <div class="modal-body-custom">
                <form id="register-form">
                    <div class="row g-2 mb-2">
                        <div class="col">
                            <input type="text" class="form-control fb-register-input" id="register-firstname" placeholder="Prénom" required>
                        </div>
                        <div class="col">
                            <input type="text" class="form-control fb-register-input" id="register-lastname" placeholder="Nom de famille" required>
                        </div>
                    </div>
                    <div class="mb-2">
                        <input type="email" class="form-control fb-register-input" id="register-email" placeholder="Numéro de mobile ou e-mail" required>
                    </div>
                    <div class="mb-2">
                        <input type="password" class="form-control fb-register-input" id="register-password" placeholder="Nouveau mot de passe" required>
                    </div>

                    <div class="mb-2">
                        <label class="form-label fb-small-label">Date de naissance <i class="fas fa-question-circle fa-xs"></i></label>
                        <div class="row g-2">
                            <div class="col">
                                <select class="form-select fb-register-select" id="register-birth-day" aria-label="Jour" required>
                                    <option value="" disabled selected>Jour</option>
                                    <option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option>
                                    <option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option>
                                    <option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option>
                                    <option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option>
                                    <option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option>
                                    <option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option>
                                    <option value="31">31</option>
                                </select>
                            </div>
                            <div class="col">
                                <select class="form-select fb-register-select" id="register-birth-month" aria-label="Mois" required>
                                    <option value="" disabled selected>Mois</option>
                                    <option value="1">janv.</option><option value="2">févr.</option><option value="3">mars</option><option value="4">avr.</option>
                                    <option value="5">mai</option><option value="6">juin</option><option value="7">juil.</option><option value="8">août</option>
                                    <option value="9">sept.</option><option value="10">oct.</option><option value="11">nov.</option><option value="12">déc.</option>
                                </select>
                            </div>
                            <div class="col">
                                <select class="form-select fb-register-select" id="register-birth-year" aria-label="Année" required>
                                    <option value="" disabled selected>Année</option>
                                    <!-- Exemple d'années. Vous pouvez ajouter une liste plus longue ici manuellement. -->
                                    <!-- Pour une application réelle avec une longue liste, JS est généralement préféré pour la maintenabilité. -->
                                    <option value="2010">2010</option><option value="2009">2009</option><option value="2008">2008</option><option value="2007">2007</option>
                                    <option value="2006">2006</option><option value="2005">2005</option><option value="2004">2004</option><option value="2003">2003</option>
                                    <option value="2002">2002</option><option value="2001">2001</option><option value="2000">2000</option><option value="1999">1999</option>
                                    <option value="1998">1998</option><option value="1997">1997</option><option value="1996">1996</option><option value="1995">1995</option>
                                    <option value="1994">1994</option><option value="1993">1993</option><option value="1992">1992</option><option value="1991">1991</option>
                                    <option value="1990">1990</option>
                                    <!-- ... continuez la liste aussi loin que nécessaire ... -->
                                    <option value="1924">1924</option> <!-- Exemple de limite inférieure -->
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label fb-small-label">Genre <i class="fas fa-question-circle fa-xs"></i></label>
                        <div class="fb-register-radio-group">
                            <label class="fb-register-radio-option" for="gender-female">
                                Femme
                                <input class="form-check-input" type="radio" name="gender" id="gender-female" value="female" required>
                            </label>
                            <label class="fb-register-radio-option" for="gender-male">
                                Homme
                                <input class="form-check-input" type="radio" name="gender" id="gender-male" value="male">
                            </label>
                            <label class="fb-register-radio-option" for="gender-custom">
                                Personnalisé
                                <input class="form-check-input" type="radio" name="gender" id="gender-custom" value="custom">
                            </label>
                        </div>
                    </div>
                    
                    <p class="fb-terms-text">
                        Les personnes qui utilisent notre service ont pu importer vos coordonnées sur Facebook. <a href="#">En savoir plus</a>.
                        <br><br>
                        En cliquant sur S’inscrire, vous acceptez nos <a href="#">Conditions générales</a>, notre <a href="#">Politique d’utilisation des données</a> et notre <a href="#">Politique d’utilisation des cookies</a>. Vous recevrez peut-être des notifications par texto de notre part et vous pouvez à tout moment vous désabonner.
                    </p>

                    <div class="text-center mt-3 mb-3">
                        <button type="submit" class="btn btn-lg fw-bold fb-register-submit-button">S’inscrire</button>
                    </div>
                </form>
                <a href="#auth/login" class="fb-already-have-account-link">Vous avez déjà un compte ?</a>
            </div>
        </div>
    </div>
</div>