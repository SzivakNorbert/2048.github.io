<?php
//Csatlakozás az adatbázishoz
$servername = "localhost";
$username = "";
$password = "";
$dbname = "2048";

$conn = new mysqli($servername, $username, $password, $dbname);

//Ellenőrzés
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

//Lekérdezés
$sql = "SELECT * FROM scores ORDER BY score DESC LIMIT 10";
$result = $conn->query($sql);

//Eredmények küldése JSON formátumban
$scores = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $scores[] = array(
            'username' => $row['username'],
            'score' => $row['score']
        );
    }
}

header('Content-Type: application/json');
echo json_encode($scores);

$conn->close();
?>
