<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title class="title-text">2048 Login</title>

       <link rel="icon" href="icons/_f8529f3c-97f1-4771-84d3-9c9716f15adc.jpg" type="icon">
       <link rel="shortcut icon" href="icons/_f8529f3c-97f1-4771-84d3-9c9716f15adc.jpg" type="icon">

       <link rel="stylesheet" href="loginstyle.css">
       <link rel="preconnect" href="https://fonts.googleapis.com" />
       <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
       <link
         href="https://fonts.googleapis.com/css2?family=DotGothic16&display=swap"
         rel="stylesheet"
       />

</head>
<body>
       <h2>Regisztrálj!</h2>
       <form action="handle_registration.php" method="post">
              <div>
                     <label for="username">Felhasználónév:</label>
                     <input type="text" id="username" name="username" required>
              </div>
              <div>
                     <label for="password">Jelszó:</label>
                     <input type="password" id="password" name="password" required>
              </div>
              <div class="buttons">
                     <button type="button" class="register-button" onclick="submitForm()" >Regisztrálás</button>
                     <a href="index.php" class="game-button" >Vissza</a>
              </div>
              <div class="reg-resp">
                     <?php
                     if (isset($_SESSION['wrongusername'])) {
                            echo '<span>' . $_SESSION['wrongusername'] . '</span>';
                            unset($_SESSION['wrongusername']); //Ezzel töröljük a hibát a következő oldalon
                        }
                     ?>
              </div>

       </form>
       <script src="login.js" charset="UTF-8"></script>
</body>
</html>