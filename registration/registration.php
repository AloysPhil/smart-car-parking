<?php

$phoneNumber = $_POST['phoneNumber'];
$licenseNumber = $_POST['licenseNumber'];
$plateNumber = $_POST['plateNumber'];

$stkCallbackResponse = file_get_contents("php://input");
$logFile = "./mpesa_stk_response.json";
$log = fopen($logFile, "a");
fwrite($log, $stkCallbackResponse);
fclose($log);


?>
