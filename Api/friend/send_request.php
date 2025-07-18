<?php
require_once '../config/auth.php'; // Vérifie le token et récupère l'ID utilisateur
require_once '../connexion.php'; // Connexion à la base de données

header('Content-Type: application/json');

// Récupérer l'ID utilisateur depuis le token dans l'en-tête Authorization
$user_id = getUserIdFromToken();
if (!$user_id) {
    http_response_code(401);
    echo json_encode(["success" => false, "error" => "Token invalide ou manquant."]);
    exit;
}

// Vérifie méthode POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "error" => "Méthode non autorisée."]);
    exit;
}

// Lecture du JSON
$input = json_decode(file_get_contents('php://input'), true);
if (!isset($input['recipient_user_id'])) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Champ 'recipient_user_id' manquant."]);
    exit;
}

$sender_id = (int)$user_id;
$recipient_id = (int)$input['recipient_user_id'];

if ($sender_id === $recipient_id) {
    echo json_encode(["success" => false, "error" => "Tu ne peux pas t'envoyer une demande à toi-même."]);
    exit;
}

// Ordonne pour éviter doublons
$user_one = min($sender_id, $recipient_id);
$user_two = max($sender_id, $recipient_id);

// Vérifie si relation existe déjà
$query = $pdo->prepare("SELECT * FROM friendships WHERE user_one_id = :user_one_id AND user_two_id = :user_two_id");
$query->execute([
    ':user_one_id' => $user_one,
    ':user_two_id' => $user_two
]);
$existing = $query->fetch();

if ($existing) {
    echo json_encode(["success" => false, "error" => "Une relation existe déjà entre ces utilisateurs."]);
    exit;
}

// Insertion de la demande
$insert = $pdo->prepare("
    INSERT INTO friendships (user_one_id, user_two_id, status, action_user_id)
    VALUES (:user_one_id, :user_two_id, 'pending', :action_user_id)
");

if ($insert->execute([
    ':user_one_id' => $user_one,
    ':user_two_id' => $user_two,
    ':action_user_id' => $sender_id
])) {
    echo json_encode(["success" => true, "message" => "Demande d'ami envoyée."]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "error" => "Erreur lors de l'envoi de la demande."]);
}