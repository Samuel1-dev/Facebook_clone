<?php
require_once '../connexion.php';      // connexion PDO
require_once '../config/auth.php';    // vérifie et retourne l'id utilisateur

header('Content-Type: application/json');

// Authentification utilisateur
$userId = getUserIdFromToken();
if (!$userId) {
    echo json_encode(['success' => false, 'error' => 'Token invalide ou expiré']);
    exit;
}

// Pagination (optionnelle)
$page = isset($_GET['page']) ? (int) $_GET['page'] : 1;
$limit = isset($_GET['limit']) ? (int) $_GET['limit'] : 10;
$offset = ($page - 1) * $limit;

// Récupération des posts + auteurs + likes + commentaires
$sql = "
SELECT
    p.id,
    p.user_id,
    u.name AS author_name,
    u.avatar AS author_avatar,
    p.description,
    p.image_url,
    p.created_at AS timestamp,
    (
        SELECT COUNT(*) FROM likes l WHERE l.post_id = p.id
    ) AS likes_count,
    (
        SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id
    ) AS comments_count,
    (
        SELECT COUNT(*) FROM likes l2 WHERE l2.post_id = p.id AND l2.user_id = ?
    ) > 0 AS is_liked_by_user
FROM posts p
JOIN users u ON u.id = p.user_id
ORDER BY p.created_at DESC
LIMIT ? OFFSET ?
";

$stmt = $pdo->prepare($sql);
$stmt->execute([$userId, $limit, $offset]);
$posts = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Réponse JSON
echo json_encode([
    'success' => true,
    'posts' => $posts
]);
