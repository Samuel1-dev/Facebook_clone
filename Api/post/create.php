<?php
require_once '../connexion.php';      // connexion PDO
require_once '../config/auth.php';    // vérifie et retourne l'id utilisateur


header('Content-Type: application/json');

// Vérifie l'utilisateur
$userId = getUserIdFromToken();
if (!$userId) {
    echo json_encode(['success' => false, 'error' => 'Token invalide ou expiré']);
    exit;
}

// Vérifie que la description est bien fournie
if (!isset($_POST['description']) || empty(trim($_POST['description']))) {
    echo json_encode(['success' => false, 'error' => 'Le champ description est obligatoire.']);
    exit;
}

$description = htmlspecialchars(trim($_POST['description']));
$imageUrl = null;

// Gestion du fichier image s'il est présent
if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    $uploadDir = __DIR__ . '/../../image/';// Chemin vers le dossier d'upload
    $filename = uniqid() . '_' . basename($_FILES['image']['name']);
    $targetFile = $uploadDir . $filename;

    $fileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));
    $allowedTypes = ['jpg', 'jpeg', 'png', 'gif'];

    if (!in_array($fileType, $allowedTypes)) {
        echo json_encode(['success' => false, 'error' => 'Type de fichier non autorisé.']);
        exit;
    }

    if (!move_uploaded_file($_FILES['image']['tmp_name'], $targetFile)) {
        echo json_encode(['success' => false, 'error' => 'Échec de l\'upload de l\'image.']);
        exit;
    }

    $imageUrl = 'image/' . $filename;
}

// Insertion du post
$sql = "INSERT INTO posts (user_id, description, image_url) VALUES (:user_id, :description, :image_url)";
$stmt = $pdo->prepare($sql);
$stmt->execute([
    ':user_id' => $userId,
    ':description' => $description,
    ':image_url' => $imageUrl
]);

$postId = $pdo->lastInsertId();

// Récupérer les infos de l’auteur pour la réponse
$userStmt = $pdo->prepare("SELECT firstname AS author_name, avatar AS author_avatar  FROM users WHERE id = :user_id");
$userStmt->execute([
    ':user_id' => $userId
]);
$userData = $userStmt->fetch(PDO::FETCH_ASSOC);

$postData = [
    'id' => $postId,
    'user_id' => $userId,
    'author_name' => $userData['author_name'],
    'author_avatar' => $userData['author_avatar'],
    'timestamp' => date('Y-m-d H:i:s'),
    'description' => $description,
    'image_url' => $imageUrl,
    'likes_count' => 0,
    'comments_count' => 0,
    'is_liked_by_user' => false
];

echo json_encode(['success' => true, 'post' => $postData]);
?>