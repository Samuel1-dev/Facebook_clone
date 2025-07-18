<?php
require_once '../connexion.php';
require_once '../config/auth.php';

header('Content-Type: application/json');

$userId = getUserIdFromToken();
if (!$userId) {
    echo json_encode(['success' => false, 'error' => 'Token invalide ou expiré']);
    exit;
}

// Récupérer l'ID du post depuis la requête et vérifier qu'il est valide
$input = json_decode(file_get_contents('php://input'), true);
$postId = isset($input['post_id']) ? (int) $input['post_id'] : 0;

if (!$postId) {
    echo json_encode(['success' => false, 'error' => 'ID du post manquant.']);
    exit;
}

// Vérifie si l'utilisateur a déjà aimé le post
$sqlCheck = "SELECT id FROM likes WHERE user_id = :user_id AND post_id = :post_id";
$stmt = $pdo->prepare($sqlCheck);
$stmt->execute([
    ':user_id' => $userId,
    ':post_id' => $postId
]);
$existing = $stmt->fetch();
// si oui on supprime le like, sinon on l'ajoute
if ($existing) {
    // Supprimer (dislike)
    $pdo->prepare("DELETE FROM likes WHERE user_id = :user_id AND post_id = :post_id")->execute([
        ':user_id' => $userId,
        ':post_id' => $postId
    ]);
    $isLiked = false;
} else {
    // Ajouter un like
    $pdo->prepare("INSERT INTO likes (user_id, post_id) VALUES (:user_id, :post_id )")->execute([
        ':user_id' => $userId,
        ':post_id' => $postId
    ]);
    $isLiked = true;
}

// Compter les likes mis à jour
$stmt = $pdo->prepare("SELECT COUNT(*) FROM likes WHERE post_id = :post_id");
$stmt->execute([
    ':post_id' => $postId
]);
$newCount = (int) $stmt->fetchColumn();

echo json_encode([
    'success' => true,
    'new_likes_count' => $newCount,
    'is_liked_by_user' => $isLiked
]);
