<?php
require '.././libs/Slim/Slim.php';
require_once 'dbHelper.php';

\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$app = \Slim\Slim::getInstance();
$db = new dbHelper();

$app->post('/operationlog',  function() use ($app){ 
	$data = json_decode($app->request->getBody());
	$mandatory = array('userID','operation');
    global $db;
    $rows = $db->insert("operationlog", $data, $mandatory);
    if($rows["status"]=="success")
    $rows["message"] = "operation log inserted";
    echoResponse(200, $rows);
});

$app->post('/signup', function() use ($app) { 
	$data = json_decode($app->request->getBody());
	$mandatory = array('userID','fullName','email','password');
    global $db;
    $rows = $db->insert("user", $data, $mandatory);
    if($rows["status"]=="success")
    $rows["message"] = "registration successfully  completed you may sign in now";
    echoResponse(200, $rows);
});
$app->post('/addService', function() use ($app) { 
	$data = json_decode($app->request->getBody());
	$mandatory = array('serviceCategory','serviceName','price','description');
    global $db;
    $rows = $db->insert("services", $data, $mandatory);
    if($rows["status"]=="success")
    $rows["message"] = "Service successfully added";
    echoResponse(200, $rows);
});
$app->post('/addServiceCategory', function() use ($app) { 
	$data = json_decode($app->request->getBody());
	$mandatory = array('name');
    global $db;
    $rows = $db->insert("servicecategory", $data, $mandatory);
    if($rows["status"]=="success")
    $rows["message"] = "Service successfully added";
    echoResponse(200, $rows);
});

$app->post('/makeOrder', function() use ($app) { 
	$data = json_decode($app->request->getBody());
	$mandatory = array('userID','serviceID');
    global $db;
    $rows = $db->insert("orderdetail", $data, $mandatory);
    if($rows["status"]=="success")
    $rows["message"] = "Order successfully placed shortly invoice will be created";
    echoResponse(200, $rows);
});
$app->post('/insertIntoInvoice', function() use ($app) { 
	$data = json_decode($app->request->getBody());
	$mandatory = array('userID','orderID');
    global $db;
    $rows = $db->insert("invoices", $data, $mandatory);
    if($rows["status"]=="success")
    $rows["message"] = "Order successfully placed";
    echoResponse(200, $rows);
});
$app->post('/createTicket', function() use ($app) { 
	$data = json_decode($app->request->getBody());
	$mandatory = array('userID','topic');
    global $db;
    $rows = $db->insert("ticket", $data, $mandatory);
    if($rows["status"]=="success")
    $rows["message"] = "ticket created";
    echoResponse(200, $rows);
});

$app->post('/addComment', function() use ($app) { 
	$data = json_decode($app->request->getBody());
	$mandatory = array('ticketID', 'text');
    global $db;
    $rows = $db->insert("message", $data, $mandatory);
    if($rows["status"]=="success")
    $rows["message"] = "updated";
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