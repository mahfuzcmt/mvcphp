<?php
require '.././libs/Slim/Slim.php';
require_once 'dbHelper.php';

\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$app = \Slim\Slim::getInstance();
$db = new dbHelper();


$app->delete('/service/:oid', function($oid) { 
    global $db;
    $rows = $db->delete("services", array('oid'=>$oid));
    if($rows["status"]=="success")
        $rows["message"] = "Successfully service deleted .";
    echoResponse(200, $rows);
});


function echoResponse($status_code, $response) {
    global $app;
    $app->status($status_code);
    $app->contentType('application/json');
    echo json_encode($response,JSON_NUMERIC_CHECK);
}

$app->run();
?>