<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title class="title-text">2048 Login</title>

    <link rel="icon" href="./icons/icon.jpg" type="icon">
    <link rel="shortcut icon" href="./icons/icon.jpg" type="icon">

    <link rel="stylesheet" href="loginstyle.css">
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=DotGothic16&display=swap" rel="stylesheet">
</head>
<body>
    <?php
    if (isset($_SESSION['username'])) {
        echo '<h2>Üdvözöllek, ' . $_SESSION['username'] . '!</h2>';
        echo '<h3>Pontod: '. $_SESSION['score'] . '</h3>';
        echo '<div class="game">';
        echo '<div class="login-resp">';
        echo '<a href="game.php" class="game-button">Játék</a>';
        echo '<a href="logout.php" class="game-button">Kijelentkezés</a>';
        echo '</div>';
        echo '</div>';
    } else {
        // Ha a felhasználó nincs bejelentkezve, megjeleníthetjük a bejelentkezési űrlapot
        echo '<h2>Jelentkezz be!</h2>';
        
        echo '<form action="handle_login.php" method="post">';
        echo '<div>';
        echo '<label for="username">Felhasználónév:</label>';
        echo '<input type="text" id="username" name="username" required>';
        echo '</div>';
        echo '<div>';
        echo '<label for="password">Jelszó:</label>';
        echo '<input type="password" name="password" id="password" required>';
        echo '</div>';
        echo '<div class="buttons">';
        echo '<button type="submit" class="login-button">Bejelentkezés</button>';
        echo '<a href="registration.php" class="game-button">Regisztráció</a>';
        echo '</div>';
        echo '<div class="game">';
        echo '<div class="login-resp">';
        if (isset($_SESSION['wrongpassword'])) {
            echo '<span>' . $_SESSION['wrongpassword'] . '</span>';
            unset($_SESSION['wrongpassword']); // Ezzel töröljük a hibát a következő oldalon
        }
        echo '</div>';
        echo '</div>';
        echo '</form>';
    }
    ?>
    <!-- A ScoreBoard gomb hozzáadása -->
    <button id="scoreboardButton" class="game-button" onclick="showScores()">ScoreBoard</button>

    <!-- Az eredmények megjelenítéséhez egy rejtett div -->
    <div id="scoresScreen" class="scores-screen">
        <div class="scores-container" id="scoresContainer">
        <!-- Ebben a div-ben jelennek meg az eredmények -->
        </div>
        <button onclick="closeScoresScreen()" class="close-button">X</button>
    </div>


    <script src="login.js" charset="UTF-8"></script>
</body>
</html>
