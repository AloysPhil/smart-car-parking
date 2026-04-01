<?php

$phoneNumber = $_POST['phoneNumber'];
$licenseNumber = $_POST['licenseNumber'];
$plateNumber = $_POST['plateNumber'];

$user = new stdClass();
$user->phone = $phoneNumber;
$user->plate = $plateNumber;
$user->license = $licenseNumber;

$userJSON = json_encode($user);

$logFile = "./users.json";
$log = fopen($logFile, "w");
fwrite($log, $userJSON);
fclose($log);
echo "success";

?>
