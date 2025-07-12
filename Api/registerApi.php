<?php
include('connexion.php');

// Définir l'en-tête JSON pour une API
header('Content-Type: application/json');

// Initialiser la réponse par défaut
$response = [
    'success' => false,
    'message' => 'Requête invalide.',
    'data' => null
];

// Vérifier que la méthode est POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupération des données
    $firstname = htmlspecialchars($_POST['firstname'] ?? '');
    $lastname = htmlspecialchars($_POST['lastname'] ?? '');
    $email = htmlspecialchars($_POST['email'] ?? '');
    $password = htmlspecialchars($_POST['password'] ?? '');
    $birth_day = $_POST['birth_day'] ?? '';
    $birth_month = $_POST['birth_month'] ?? '';
    $birth_year = $_POST['birth_year'] ?? '';
    $gender = $_POST['gender'] ?? '';

    
    // Vérification des champs
    if ($firstname && $lastname && $email && $password && $birth_day && $birth_month && $birth_year && $gender) {
        // Construction de la date de naissance
      if (checkdate((int)$birth_month, (int)$birth_day, (int)$birth_year)) {
    $date_naissance = sprintf('%04d-%02d-%02d', $birth_year, $birth_month, $birth_day);
    } else {
        $response['message'] = "La date de naissance est invalide.";
        echo json_encode($response);
        exit;
    }   

        // Hash du mot de passe
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        try {
            // Préparation et insertion
            $stmt = $pdo->prepare("INSERT INTO users (firstname, lastname, email, password, date_naissance, gender) 
                                   VALUES (:firstname, :lastname, :email, :password, :date_naissance, :gender)");
            $stmt->execute([
                ':firstname' => $firstname,
                ':lastname' => $lastname,
                ':email' => $email,
                ':password' => $hashedPassword,
                ':date_naissance' => $date_naissance,
                ':gender' => $gender
            ]);

            $response['success'] = true;
            $response['message'] = 'Inscription réussie.';
            $response['data'] = [
                'firstname' => $firstname,
                'lastname' => $lastname,
                'email' => $email,
                'date_naissance' => $date_naissance,
                'gender' => $gender
            ];
        } catch (PDOException $e) {
            if ($e->getCode() === '23000') {
                $response['message'] = "L'email est déjà utilisé.";
            } else {
                $response['message'] = 'Erreur lors de l’enregistrement : ' . $e->getMessage();
            }
        }
    } else {
        $response['message'] = 'Tous les champs sont obligatoires.';
    }
}

echo json_encode($response);

?>