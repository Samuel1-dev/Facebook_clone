<?php
require_once '../config/auth.php';    // Vérifie le token et récupère l'ID utilisateur (optionnel)
require_once '../connexion.php';      // Connexion PDO

header('Content-Type: application/json');

// Vérification authentification
$user_id = getUserIdFromToken();
if (!$user_id) {
    http_response_code(401);
    echo json_encode(["success" => false, "error" => "Token invalide ou manquant."]);
    exit;
}

try {
    // Requête pour récupérer tous les utilisateurs sauf soi-même (optionnel)
    $stmt = $pdo->prepare("
        SELECT id, CONCAT(firstname, ' ', lastname) AS name, avatar 
        FROM users 
        WHERE id != :current_user_id 
        ORDER BY firstname ASC, lastname ASC
    ");
    $stmt->execute([':current_user_id' => $user_id]);
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "users" => $users
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => "Erreur serveur : " . $e->getMessage()
    ]);
}
