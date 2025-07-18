<?php
require_once '../config/auth.php'; // Vérifie le token et récupère l'ID utilisateur
require_once '../connexion.php'; // Connexion à la base de données

header('Content-Type: application/json');

// Vérifie le token
$userId = getUserIdFromToken();
if (!$userId) {
    echo json_encode(['success' => false, 'error' => 'Token invalide ou expiré']);
    exit;
}

// Récupération des données envoyées
$input = json_decode(file_get_contents('php://input'), true);
$targetUserId = isset($input['target_user_id']) ? intval($input['target_user_id']) : 0;
$action = $input['action'] ?? '';

if (!$targetUserId || !in_array($action, ['accept', 'refuse'])) {
    echo json_encode(['success' => false, 'error' => 'Données invalides']);
    exit;
}

// Accepter ou refuser la demande
try {
    // On cherche l'amitié existante où le targetUserId est celui qui a envoyé la demande
    $stmt = $pdo->prepare("SELECT * FROM friendships 
        WHERE 
            (
                (user_one_id = :target_id AND user_two_id = :me)
                OR 
                (user_one_id = :me AND user_two_id = :target_id)
            )
        AND status = 'pending'
    ");
    $stmt->execute([
        ':target_id' => $targetUserId,
        ':me' => $userId
    ]);
    $friendship = $stmt->fetch();

    if (!$friendship) {
        echo json_encode(['success' => false, 'error' => "Aucune demande d'amitié trouvée"]);
        exit;
    }

    // Mise à jour du statut
    $newStatus = ($action === 'accept') ? 'accepted' : 'declined';

    $update = $pdo->prepare("UPDATE friendships 
        SET status = :status, action_user_id = :me, updated_at = NOW()
        WHERE id = :id
    ");
    $update->execute([
        ':status' => $newStatus,
        ':me' => $userId,
        ':id' => $friendship['id']
    ]);

    echo json_encode(['success' => true, 'message' => "Demande $newStatus"]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => 'Erreur serveur : ' . $e->getMessage()]);
}
