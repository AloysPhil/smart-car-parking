<?php

$phoneNumber = $_POST['phoneNumber'];
$licenseNumber = $_POST['licenseNumber'];
$plateNumber = $_POST['plateNumber'];

$text = <<<_END
Line 1
Line 2
Line 3
_END;

$logFile = "./users.json";
$log = fopen($logFile, "w");
fwrite($log, $text);
fclose($log);


?>
