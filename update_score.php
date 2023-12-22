<?php
session_start();
require('connect.php');


if($_SERVER['REQUEST_METHOD'] === 'POST'){
if(isset($_POST)){
       $data = file_get_contents("php://input");
       $earnedScore = json_decode($data, true);
       $earnedScoreNum = (int)$earnedScore["scr"];
       echo $earnedScoreNum;

       $currentUser = $_SESSION['username'];

       
       $checkUserQuery = "SELECT * FROM scores WHERE username = :username";
       $statement = $kapcsolat->prepare($checkUserQuery);
       $statement->bindParam(':username', $currentUser, PDO::PARAM_STR);
       $statement->execute();

       //Fetcheljük az eredményt egy asszociatív tömb formájában
       $row = $statement->fetch(PDO::FETCH_ASSOC);


       //Kiírjuk az előző pontját
       echo $row['score'];

       $statement->closeCursor();


       //Magasabb pont átírása
       if($earnedScoreNum > $row['score'])
       {
              $sql = "UPDATE scores SET score='$earnedScoreNum' WHERE username='$currentUser'";

              $kapcsolat
              ->prepare($sql)
              ->execute();
              exit;  
       }else{
              exit;
       }

       
}
}
?>
