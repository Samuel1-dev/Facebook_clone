<?php
require_once '../connexion.php';
require_once '../config/auth.php';

header('Content-Type: application/json');
// Vérification du token d'authentification et récupération de l'ID utilisateur
$userId = getUserIdFromToken();
if (!$userId) {
    echo json_encode(['success' => false, 'error' => 'Token invalide ou expiré']);
    exit;
}
// Récupération de l'ID du post depuis les paramètres GET
$postId = isset($_GET['post_id']) ? (int) $_GET['post_id'] : 0;
if (!$postId) {
    echo json_encode(['success' => false, 'error' => 'ID du post manquant.']);
    exit;
}
// Préparation de la requête pour récupérer les commentaires du post de la base de données
$sql = "
SELECT 
    c.id,
    c.user_id AS author_id,
    CONCAT(u.firstname, ' ', u.lastname) AS author_name,
    u.avatar AS author_avatar,
    c.text,
    c.created_at AS timestamp
FROM comments c
JOIN users u ON u.id = c.user_id
WHERE c.post_id = :post_id
ORDER BY c.created_at ASC
";

$stmt = $pdo->prepare($sql);
$stmt->execute([':post_id' => $postId]);
$comments = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode([
    'success' => true,
    'comments' => $comments
]);
