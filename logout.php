<?php
session_start();

//Munkamenet lezárása
session_unset();
session_destroy();

//Bejelentkező oldal
header("Location: index.php");
exit();
?>
