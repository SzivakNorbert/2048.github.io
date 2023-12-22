<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>2048</title>

    <link rel="icon" href="./icons/icon.jpg" type="icon">
    <link rel="shortcut icon" href="./icons/icon.jpg" type="icon">

    <link rel="stylesheet" href="style.css" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=DotGothic16&display=swap"
      rel="stylesheet"
    />
    <script src="app.js" charset="UTF-8">
    </script>
  </head>
  <body>
    <div class="score-with-result">
      
      
      <div class="score-container">
        <div class="score-title">score:</div>
        <span id="score">0</span>
      </div>
      <div class="user-with-icon">
        <div class="image">
          <img src="./icons/person.png" class="icon" alt="player">
        </div>
        <div class="user"><?php echo isset($_SESSION['username']) ? $_SESSION['username'] : ''; ?></div>

        
      </div>
      

    </div>
    <div class="table">
      
      <div class="grid"></div>
    </div>

    <div class="reset" id="reset">
      <button class="reset-button" onclick="reset()">Újra</button>
      <button class="menu-button" onclick="menu()">Menü</button>
    </div>


    <div id="endScreen" style="display: none">
      <div id="scoreValue"></div>
      <input type="text" id="name" placeholder="your name"></input>
      <button onclick="saveScore()" id="saveBtn">Save</button>
      <br>
      <br>
      <button onclick="showScores()">Show Scores</button>
      <button onclick="menu()">Menu</button>
    </div>

    <div id="scoresScreen" style="display: none">
      <div id="scoresContainer"></div>
      <br>
      <button onclick="closeScores()">Back</button>
    </div>


  </body>
</html>
