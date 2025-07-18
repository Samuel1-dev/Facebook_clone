<?php
require_once '../connexion.php';
require_once '../config/auth.php';
header('Content-Type: application/json');


$userId = getUserIdFromToken();
if (!$userId) {
    echo json_encode(['success' => false, 'error' => 'Token invalide ou expiré']);
    exit;
}
// Récupération de l'ID du post depuis les paramètres POST
// Utilisation de file_get_contents pour lire le corps de la requête
$input = json_decode(file_get_contents('php://input'), true);
$postId = isset($input['post_id']) ? (int) $input['post_id'] : 0;
$text = isset($input['text']) ? trim($input['text']) : '';

// verification si les champs obligatoires sont présents
if (!$postId || empty($text)) {
    echo json_encode(['success' => false, 'error' => 'Post ID ou texte manquant.']);
    exit;
}

// Insérer le commentaire
$stmt = $pdo->prepare("INSERT INTO comments (user_id, post_id, text) VALUES (:user_id, :post_id, :text)");
$stmt->execute([
    ':user_id' => $userId,
    ':post_id' => $postId,
    ':text' => htmlspecialchars($text)
]);

// Récupérer les infos pour retour immédiat
$commentId = $pdo->lastInsertId();
$stmt = $pdo->prepare("
    SELECT c.id, c.text, c.created_at AS timestamp, u.id AS author_id,    CONCAT(u.firstname, ' ', u.lastname) AS author_name, u.avatar AS author_avatar
    FROM comments c
    JOIN users u ON u.id = c.user_id
    WHERE c.id = :id
");
$stmt->execute([':id' => $commentId]);
$comment = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode([
    'success' => true,
    'comment' => $comment
]);
