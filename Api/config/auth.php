<?php
function getUserIdFromToken() {
    // Vérifie si l'en-tête Authorization est présent
    if (!isset($_SERVER['HTTP_AUTHORIZATION'])) {
        return false;
    }

    $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
    
    // Le format attendu est : "Bearer le_token"
    if (!preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
        return false;
    }

    $token = $matches[1];

    // Décoder le token base64
    $decoded = json_decode(base64_decode($token), true);

    // Vérifie si le token est valide
    if (!$decoded || !isset($decoded['id']) || !isset($decoded['exp'])) {
        return false;
    }

    // Vérifie si le token a expiré
    if ($decoded['exp'] < time()) {
        return false;
    }

    // Retourne l'ID de l'utilisateur connecté
    return $decoded['id'];
}
