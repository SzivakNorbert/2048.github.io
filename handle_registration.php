<?php
session_start();
require('connect.php');

//POST kérés
$username = $_POST['username'];
$password = $_POST['password'];

$checkUserQuery = "SELECT * FROM scores WHERE username = :username";
$statement = $kapcsolat->prepare($checkUserQuery);
$statement->bindParam(':username', $username, PDO::PARAM_STR);
$statement->execute();

//Felhasználónév létezik-e
if ($statement->rowCount() > 0) {
    $_SESSION['wrongusername'] = "Már létezik ez a felhasználónév!";
    echo "Már létezik a felhasználónév!";
    header("Location: registration.php");
    exit;
} else {
        
    //Sikeres regisztráció
    $kapcsolat
    ->prepare("INSERT INTO scores (username, password) VALUES (:felhasznalonev, :jelszo)")
    ->execute([
        'felhasznalonev' => $_POST["username"],
        'jelszo' => md5($_POST["password"]),
    ]);

$_SESSION['wrongusername'] = "Sikeres regisztráció!";
header("Location: registration.php");
exit;
}


?>
