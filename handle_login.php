<?php
session_start();

require('connect.php');

//SQL lekérdezés előkészítése
$stmt = $kapcsolat->prepare("SELECT id, score FROM scores WHERE username = :username AND password = :password");
$stmt->execute([
    "username" => $_POST["username"],
    "password" => md5($_POST["password"])
]);

//Egyetlen felhasználói rekord lekérése tömbbe
$user = $stmt->fetch(PDO::FETCH_ASSOC);

//Ellenőrzés, hogy a felhasználó létezik-e
if ($user !== false) {
    $_SESSION['username'] = $_POST["username"];
    $_SESSION["id"] = $user['id'];
    $_SESSION['score'] = $user['score'];
    header("Location: index.php");
} else {

    //Hibaüzenet beállítása
    $_SESSION['wrongpassword'] = "Helytelen felhasználónév vagy jelszó!";
    header("Location: index.php");
}
?>
