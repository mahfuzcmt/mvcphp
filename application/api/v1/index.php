<?php
require '.././libs/Slim/Slim.php';
require_once 'dbHelper.php';

\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$app = \Slim\Slim::getInstance();
$db = new dbHelper();

/**
 * Database Helper Function templates
 */
/*
select(table name, where clause as associative array)
insert(table name, data as associative array, mandatory column names as array)
update(table name, column names as associative array, where clause as associative array, required columns as array)
delete(table name, where clause as array)
*/


$app->get('/user/:userID/:password', function($userID, $password) {
	global $db;
	$rows = $db->signIn($userID, $password);
	echoResponse(200, $rows);
});

$app->get('/userProfile/:userID', function($userID) {
	global $db;
    $rows = $db->select("user", "userID, fullName, mobile, imagePath, email, company, balance, createdOn", array('userID'=>$userID));
	echoResponse(200, $rows);
});

$app->get('/userinfo/:userID', function($userID) {
	global $db;
    $rows = $db->select("user", "userID, fullName, email, password", array('userID'=>$userID));
	echoResponse(200, $rows);
});

$app->get('/loadUserList/', function() {
	global $db;
    $rows = $db->select("user", "userID, fullName, email, company, currentStatus, mobile, balance, createdOn", array());
	echoResponse(200, $rows);
});

$app->get('/sendmail/:to/:fullName/:password', function($to, $fullName, $password) {
	global $db;
   	$rows = $db->sendmail($to, $fullName, $password);
	echoResponse(200, $rows);
});

$app->get('/getOrderDetail/:userID/:role', function($userID, $role) {
	global $db;
	$rows = $db->getOrderDetail($userID, $role);
	echoResponse(200, $rows);
});

$app->get('/getTicketDetail/:userID/:role', function($userID, $role) {
	global $db;
	$rows = $db->getTicketDetail($userID, $role);
	echoResponse(200, $rows);
});

$app->get('/getInvoiceInfo/:userID/:role', function($userID, $role) {
	global $db;
	$rows = $db->getInvoiceInfo($userID, $role);
	echoResponse(200, $rows);
});
$app->get('/loadServices/', function() {
	global $db;
    $rows = $db->select("services", "oid, serviceName, price, usdprice, riyalprice, createdBy, createdOn, description", array());
	echoResponse(200, $rows);
});
$app->get('/getServiceByOid/:oid', function($oid) {
	global $db;
    $rows = $db->select("services", "oid, serviceCategory, serviceName, price, riyalprice, usdprice, description ", array('oid'=>$oid));
	echoResponse(200, $rows);
});
$app->get('/loadServicesCategory/', function() {
	global $db;
    $rows = $db->select("servicecategory", "oid, name, description", array());
	echoResponse(200, $rows);
});
$app->get('/loadServicesbycat/:oid', function($oid) {
	global $db;
    $rows = $db->select("services", "oid, serviceName, price, createdBy, riyalprice, usdprice, createdOn, description", array('serviceCategory'=>$oid));
	echoResponse(200, $rows);
});
$app->get('/loadOrderList/:userID/:role', function($userID, $role) {
	global $db;
	$rows = $db->loadOrderList($userID, $role);
	echoResponse(200, $rows);
});
$app->get('/loadinvoicelist/:userID/:role', function($userID, $role) {
	global $db;
	$rows = $db->loadinvoicelist($userID, $role);
	echoResponse(200, $rows);
});
$app->get('/loadTicketlist/:userID/:role', function($userID, $role) {
	global $db;
	if($role != 'user'){
		$rows = $db->select("ticket", "oid, currentStatus, topic, updatedBy, updatedOn", array());
	}
	else{
		$rows = $db->select("ticket", "oid, currentStatus, topic, updatedBy, updatedOn", array('userID'=>$userID));
	}
	echoResponse(200, $rows);
});
$app->get('/loadMessage/:ticketID', function($ticketID) {
	global $db;
    $rows = $db->select("message", "text, updatedBy, updatedOn", array('ticketID'=>$ticketID));
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