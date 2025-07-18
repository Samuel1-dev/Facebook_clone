<?php
require_once '../config/auth.php'; // Vérifie le token et récupère l'ID utilisateur
require_once '../connexion.php'; // Connexion à la base de données

header('Content-Type: application/json');

// Vérifie que le token est envoyé
$headers = apache_request_headers();
if (!isset($headers['Authorization'])) {
    echo json_encode(['success' => false, 'error' => 'Token manquant']);
    exit;
}

$token = str_replace('Bearer ', '', $headers['Authorization']);
$user_id = getUserIdFromToken($token);

if (!$user_id) {
    echo json_encode(['success' => false, 'error' => 'Token invalide ou expiré']);
    exit;
}

try {
    // Requête : trouver tous ceux qui ont envoyé une demande au user connecté
    $stmt = $pdo->prepare("
       SELECT f.id AS friendship_id, f.user_one_id AS sender_id,  CONCAT(u.firstname, ' ', u.lastname) AS name, u.avatar, f.status, f.created_at
        FROM friendships f
        JOIN users u ON f.user_one_id = u.id
        WHERE f.user_two_id = :user_id AND f.status = 'pending'
    ");
    $stmt->execute([':user_id' => $user_id]);
    $requests = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'requests' => $requests]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => 'Erreur serveur']);
}
