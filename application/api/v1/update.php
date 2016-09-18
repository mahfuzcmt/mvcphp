<?php
require '.././libs/Slim/Slim.php';
require_once 'dbHelper.php';

\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$app = \Slim\Slim::getInstance();
$db = new dbHelper();

$app->post('/updateUserProfile/:userID/:password', function($userID, $password) use ($app) { 
    $data = json_decode($app->request->getBody());
    $condition = array('userID'=>$userID, 'password'=>$password);
    $mandatory = array('userID','fullName','email','mobile','password');
    global $db;
    $rows = $db->update("user", $data, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "User information updated successfully.";
    echoResponse(200, $rows);
});

$app->post('/changepassword/:userID/:oldPassword/:newPassword', function($userID, $oldPassword, $newPassword) { 
	global $db;
	$rows = $db->changeuserpassword($userID, $oldPassword, $newPassword);
	echoResponse(200, $rows);
});

$app->post('/changestatus/:oid/:status/:userID/:table', function($oid, $status, $userID, $table) { 
	global $db;
	$rows = $db->changeStatus($oid, $status, $userID, $table);
	echoResponse(200, $rows);
});

$app->post('/changestatusofinvoices/:orderID/:status/:userID', function($orderID, $status, $userID) { 
	global $db;
	$rows = $db->changestatusofinvoices($orderID, $status, $userID);
	echoResponse(200, $rows);
});
$app->post('/changestatusofuser/:userID/:status', function($userID, $status) { 
	global $db;
	$rows = $db->changestatusofuser($userID, $status);
	echoResponse(200, $rows);
});
$app->post('/updateService/:oid', function($oid) use ($app) { 
    $data = json_decode($app->request->getBody());
    $condition = array('oid'=>$oid);
    $mandatory = array('serviceCategory','serviceName','price', 'usdprice', 'riyalprice','description');
    global $db;
    $rows = $db->update("services", $data, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Service updated successfully.";
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