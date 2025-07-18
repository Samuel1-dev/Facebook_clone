<?php
include('connexion.php');
header('Content-Type: application/json');

$response = [
    'success' => false,
    'message' => 'Requête invalide.',
    'token' => null,
    'data' => null
];

// POST ?
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = htmlspecialchars($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if ($email && $password) {
        try {
            $stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email LIMIT 1");
            $stmt->execute([':email' => $email]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user && password_verify($password, $user['password'])) {
                // Génération d'un token simple (base64 encodé)
                $payload = [
                    'id' => $user['id'],
                    'email' => $user['email'],
                    'exp' => time() + 3600 // expire dans 1h
                ];
                $token = base64_encode(json_encode($payload));

                $response['success'] = true;
                $response['message'] = 'Connexion réussie.';
                $response['token'] = $token;
                $response['data'] = [
                    'id' => $user['id'],
                    'firstname' => $user['firstname'],
                    'lastname' => $user['lastname'],
                    'email' => $user['email']
                ];
            } else {
                $response['message'] = 'Email ou mot de passe incorrect.';
            }
        } catch (PDOException $e) {
            $response['message'] = 'Erreur serveur : ' . $e->getMessage();
        }
    } else {
        $response['message'] = 'Tous les champs sont obligatoires.';
    }
}

echo json_encode($response);

