<?php
function getUserIdFromToken() {
    $authHeader = null;

    // Récupération du header Authorization
    if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
    } elseif (function_exists('apache_request_headers')) {
        $headers = apache_request_headers();
        foreach ($headers as $key => $value) {
            if (strtolower($key) === 'authorization') {
                $authHeader = $value;
                break;
            }
        }
    }

    if (!$authHeader || !preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
        return false;
    }

    $token = $matches[1];

    // Tentative de décodage du token
    $json = base64_decode($token);
    if (!$json) return false;

    $decoded = json_decode($json, true);
    if (!$decoded || !is_array($decoded)) return false;

    // Vérification des champs obligatoires
    if (!isset($decoded['id']) || !isset($decoded['exp'])) {
        return false;
    }

    // Expiration
    if ((int)$decoded['exp'] < time()) {
        return false;
    }

    // OK
    return $decoded['id'];
}


?>
