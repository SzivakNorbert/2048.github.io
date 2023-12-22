<?php
//Adatbázis kapcsolat
$db_host = "localhost";
$db_user = "root";
$db_password = "";

//Kapcsolat létrehozása
$lnk = mysqli_connect($db_host, $db_user, $db_password);

//Kapcsolat ellenőrzése
if (!$lnk) {
    die("Database connection failed!");
}

//Adatbázis kiválasztása
mysqli_select_db($lnk, "2048") or die("Failed to select DB");

//"info" paraméter meg van-e adva a GET-ben
if (isset($_GET["info"])) {
    //JSON dekódolás
    $info = json_decode($_GET["info"], true);
    if (addScore($info, $lnk)) {
        echo "Code inserted!";
    } else {
        echo "Code insertion failed!";
    }
} else {
    header('Content-Type: application/json');

    $result = getScores($lnk);
    echo json_encode($result);
}

//Pontszám hozzáadásához
function addScore($info, $lnk)
{
    $query = "INSERT INTO Scores (UserName, Score) VALUES ('" . $info["username"] . "', " . $info["score"] . ")";
    
    //Lekérdezés
    $rs = mysqli_query($lnk, $query);

    return $rs;
}

//Pontszámok lekérdezéséhez
function getScores($lnk)
{
    //Pontszámok lekérdezéséhez, csökkenő sorrend
    $query = "SELECT UserName, Score FROM Scores ORDER BY `scores`.`Score` DESC";
    
    $rs = mysqli_query($lnk, $query);

    //Eredmények tömb
    $results = array();

    //Eredmények feldolgozása
    if (mysqli_num_rows($rs) > 0) {
        while ($row = mysqli_fetch_assoc($rs)) {
            array_push($results, $row);
        }
    }

    return $results;
}
?>
