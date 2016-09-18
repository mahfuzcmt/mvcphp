<?php
require_once 'config.php'; // Database setting constants [DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD]
class dbHelper {
    private $db;
    private $err;
    function __construct() {
        $dsn = 'mysql:host='.DB_HOST.';dbname='.DB_NAME.';charset=utf8';
        try {
            $this->db = new PDO($dsn, DB_USERNAME, DB_PASSWORD, array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
        } catch (PDOException $e) {
            $response["status"] = "error";
            $response["message"] = 'Connection failed: ' . $e->getMessage();
            $response["data"] = null;
            //echoResponse(200, $response);
            exit;
        }
    }
    function select($table, $columns, $where){
        try{
            $a = array();
            $w = "";
            foreach ($where as $key => $value) {
                $w .= " and " .$key. " like :".$key;
                $a[":".$key] = $value;
            }
            $stmt = $this->db->prepare("select ".$columns." from ".$table." where 1=1 ". $w);
            $stmt->execute($a);
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if(count($rows)<=0){
                $response["status"] = "warning";
                $response["message"] = "No data found.";
            }else{
                $response["status"] = "success";
                $response["message"] = "Data selected from database";
            }
                $response["data"] = $rows;
        }catch(PDOException $e){
            $response["status"] = "error";
            $response["message"] = 'Select Failed: ' .$e->getMessage();
            $response["data"] = null;
        }
        return $response;
    }
	

	function signIn($userID, $password){
        try{
            $a = array();
            $stmt = $this->db->prepare("select u.userID, u.fullName, u.mobile, u.imagePath, r.menuJSON , u.company, u.role from user u, role r 
			where u.userID = '".$userID."' and u.password = '".$password."' and u.role = r.role and u.currentStatus = 'Active' ");
            $stmt->execute($a);
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if(count($rows)<=0){
                
               		$a2 = array();
		            $stmt2 = $this->db->prepare("select u.userID, u.fullName, u.mobile, u.imagePath, r.menuJSON , u.company, u.role from user u, role r 
					where u.userID = '".$userID."' and u.password = '".$password."' and u.role = r.role and u.currentStatus = 'Inactive' ");
		            $stmt2->execute($a2);
		            $rows2 = $stmt2->fetchAll(PDO::FETCH_ASSOC);
		            if(count($rows2)<=0){
		                $response["status"] = "warning";
                		$response["message"] = "Sorry invalid username or password";
		            }else{
		                $response["status"] = "warning";
		                $response["message"] = "Inactive User.Please contact with Administrator";
		            }
		                $response["data"] = $rows2;
		}else{
                $response["status"] = "success";
                $response["message"] = "login Success";
            }
                $response["data"] = $rows;
        }catch(PDOException $e){
            $response["status"] = "error";
            $response["message"] = 'Select Failed: ' .$e->getMessage();
            $response["data"] = null;
        }
        return $response;
    }
	
	function getOrderDetail($userID, $role){
        try{
            $a = array();
           
           if($role != 'user'){
            $stmt = $this->db->prepare("SELECT count(*) as total , 
				(select count(currentStatus) from `orderdetail` where currentStatus ='pending') as pedningStatus,
				(select count(currentStatus) from `orderdetail` where currentStatus ='active') as activetatus,
				(select count(currentStatus) from `orderdetail` where currentStatus ='cancel') as cancelledStatus
				from `orderdetail` ");
           }
           else{
            $stmt = $this->db->prepare("SELECT count(*) as total , 
				(select count(currentStatus) from `orderdetail` where userID = '".$userID."' and currentStatus ='pending') as pedningStatus,
				(select count(currentStatus) from `orderdetail` where userID = '".$userID."' and currentStatus ='active') as activetatus,
				(select count(currentStatus) from `orderdetail` where userID = '".$userID."' and currentStatus ='cancel') as cancelledStatus
				from `orderdetail` where userID = '".$userID."'");
           }
           
            $stmt->execute($a);
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if(count($rows)<=0){
                $response["status"] = "warning";
                $response["message"] = "Sorry invalid username or password";
            }else{
                $response["status"] = "success";
                $response["message"] = "login Success";
            }
                $response["data"] = $rows;
        }catch(PDOException $e){
            $response["status"] = "error";
            $response["message"] = 'Select Failed: ' .$e->getMessage();
            $response["data"] = null;
        }
        return $response;
    }
	function getInvoiceInfo($userID, $role){
        try{
            $a = array();
           
            if($role != 'user'){
            	 $stmt = $this->db->prepare("SELECT count(*) as total , 
				(select count(currentStatus) from `invoices` where currentStatus ='unpaid') as unpaid,
				(select count(currentStatus) from `invoices` where currentStatus ='paid') as paid
				from `invoices` ");
            }
            else{
            	 $stmt = $this->db->prepare("SELECT count(*) as total , 
				(select count(currentStatus) from `invoices` where userID = '".$userID."' and currentStatus ='unpaid') as unpaid,
				(select count(currentStatus) from `invoices` where userID = '".$userID."' and currentStatus ='paid') as paid
				from `invoices` where userID = '".$userID."'");
            }
            
            $stmt->execute($a);
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if(count($rows)<=0){
                $response["status"] = "warning";
                $response["message"] = "Sorry invalid username or password";
            }else{
                $response["status"] = "success";
                $response["message"] = "login Success";
            }
                $response["data"] = $rows;
        }catch(PDOException $e){
            $response["status"] = "error";
            $response["message"] = 'Select Failed: ' .$e->getMessage();
            $response["data"] = null;
        }
        return $response;
    }
	
	function getTicketDetail($userID, $role){
        try{
            $a = array();
            
            if($role != 'user'){
            	$stmt = $this->db->prepare("SELECT count(*) as total ,
				(select count(currentStatus) from `ticket` where currentStatus ='open') as open,
				(select count(currentStatus) from `ticket` where  currentStatus ='close') as close
				from `ticket` ");
            }
            else{
            	$stmt = $this->db->prepare("SELECT count(*) as total ,
				(select count(currentStatus) from `ticket` where userID = '".$userID."' and currentStatus ='open') as open,
				(select count(currentStatus) from `ticket` where userID = '".$userID."' and currentStatus ='close') as close
				from `ticket` where userID = '".$userID."'");
            }
            
            $stmt->execute($a);
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if(count($rows)<=0){
                $response["status"] = "warning";
                $response["message"] = "Sorry invalid username or password";
            }else{
                $response["status"] = "success";
                $response["message"] = "login Success";
            }
                $response["data"] = $rows;
        }catch(PDOException $e){
            $response["status"] = "error";
            $response["message"] = 'Select Failed: ' .$e->getMessage();
            $response["data"] = null;
        }
        return $response;
    }
	
	function loadOrderList($userID, $role){
        try{
            $a = array();
           
           
           if($role != 'user'){
           	 $stmt = $this->db->prepare("SELECT o.oid as orderID, o.filePath, o.currentStatus as status, o.updatedBy, o.updatedOn, s.serviceName, s.price FROM 		`orderdetail` o, `services` s 
				WHERE s.oid = o.serviceID");
           }
           else{
           	 $stmt = $this->db->prepare("SELECT o.oid as orderID, o.currentStatus as status, o.updatedBy, o.updatedOn, s.serviceName, s.price FROM `orderdetail` o, `services` s 
				WHERE o.userID = '".$userID."' and s.oid = o.serviceID");
           }
            $stmt->execute($a);
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if(count($rows)<=0){
                $response["status"] = "warning";
                $response["message"] = "Sorry invalid username or password";
            }else{
                $response["status"] = "success";
                $response["message"] = "login Success";
            }
                $response["data"] = $rows;
        }catch(PDOException $e){
            $response["status"] = "error";
            $response["message"] = 'Select Failed: ' .$e->getMessage();
            $response["data"] = null;
        }
        return $response;
    }
	
	function loadinvoicelist($userID, $role){
        try{
            $a = array();
            
           if($role != 'user'){
           	$stmt = $this->db->prepare("SELECT i.oid as invoiceID, i.currentStatus, i.updatedBy, i.updatedOn, s.serviceName, s.price 
			FROM `invoices` i, `services` s , `orderdetail` o WHERE  i.orderID = o.oid and o.serviceID = s.oid");
          }
           else{
           	$stmt = $this->db->prepare("SELECT i.oid as invoiceID, i.currentStatus, i.updatedBy, i.updatedOn, s.serviceName, s.price 
			FROM `invoices` i, `services` s , `orderdetail` o WHERE i.userID = '".$userID."' and i.orderID = o.oid and o.serviceID = s.oid");
            }
            
            $stmt->execute($a);
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if(count($rows)<=0){
                $response["status"] = "warning";
                $response["message"] = "Sorry invalid username or password";
            }else{
                $response["status"] = "success";
                $response["message"] = "login Success";
            }
                $response["data"] = $rows;
        }catch(PDOException $e){
            $response["status"] = "error";
            $response["message"] = 'Select Failed: ' .$e->getMessage();
            $response["data"] = null;
        }
        return $response;
    }
	
	
	function select2($table, $columns, $where, $order){
        try{
            $a = array();
            $w = "";
            foreach ($where as $key => $value) {
                $w .= " and " .$key. " like :".$key;
                $a[":".$key] = $value;
            }
            $stmt = $this->db->prepare("select ".$columns." from ".$table." where 1=1 ". $w." ".$order);
            $stmt->execute($a);
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if(count($rows)<=0){
                $response["status"] = "warning";
                $response["message"] = "No data found.";
            }else{
                $response["status"] = "success";
                $response["message"] = "Data selected from database";
            }
                $response["data"] = $rows;
        }catch(PDOException $e){
            $response["status"] = "error";
            $response["message"] = 'Select Failed: ' .$e->getMessage();
            $response["data"] = null;
        }
        return $response;
    }
    function insert($table, $columnsArray, $requiredColumnsArray) {
        $this->verifyRequiredParams($columnsArray, $requiredColumnsArray);
        
        try{
            $a = array();
            $c = "";
            $v = "";
            foreach ($columnsArray as $key => $value) {
                $c .= $key. ", ";
                $v .= ":".$key. ", ";
                $a[":".$key] = $value;
            }
            $c = rtrim($c,', ');
            $v = rtrim($v,', ');
            $stmt =  $this->db->prepare("INSERT INTO $table($c) VALUES($v)");
            $stmt->execute($a);
            $affected_rows = $stmt->rowCount();
            $lastInsertId = $this->db->lastInsertId();
            $response["status"] = "success";
            $response["message"] = $affected_rows." row inserted into database";
            $response["data"] = $lastInsertId;
        }catch(PDOException $e){
            $response["status"] = "error";
            $response["message"] = 'Insert Failed: ' .$e->getMessage();
            $response["data"] = 0;
        }
        return $response;
    }
    function update($table, $columnsArray, $where, $requiredColumnsArray){ 
        $this->verifyRequiredParams($columnsArray, $requiredColumnsArray);
        try{
            $a = array();
            $w = "";
            $c = "";
            foreach ($where as $key => $value) {
                $w .= " and " .$key. " = :".$key;
                $a[":".$key] = $value;
            }
            foreach ($columnsArray as $key => $value) {
                $c .= $key. " = :".$key.", ";
                $a[":".$key] = $value;
            }
                $c = rtrim($c,", ");

            $stmt =  $this->db->prepare("UPDATE $table SET $c WHERE 1=1 ".$w);
            $stmt->execute($a);
            $affected_rows = $stmt->rowCount();
            if($affected_rows<=0){
                $response["status"] = "warning";
                $response["message"] = "No row updated";
            }else{
                $response["status"] = "success";
                $response["message"] = $affected_rows." row(s) updated in database";
            }
        }catch(PDOException $e){
            $response["status"] = "error";
            $response["message"] = "Update Failed: " .$e->getMessage();
        }
        return $response;
    }
	function changeuserpassword($userID, $oldPassword, $newPassword){ 
        try{
            $a = array();
            $stmt =  $this->db->prepare("UPDATE user SET password = '".$newPassword."' WHERE userID = '".$userID."' and password = '".$oldPassword."' ");
            $stmt->execute($a);
            $affected_rows = $stmt->rowCount();
            if($affected_rows<=0){
                $response["status"] = "warning";
                $response["message"] = "No row updated";
            }else{
                $response["status"] = "success";
                $response["message"] = " Password Successfully Changed";
            }
        }catch(PDOException $e){
            $response["status"] = "error";
            $response["message"] = "Update Failed: " .$e->getMessage();
        }
        return $response;
    } 
    function changeStatus($oid, $status, $userID, $table){ 
        try{
            $a = array();
            $stmt =  $this->db->prepare("UPDATE ".$table." SET currentStatus= '".$status."' WHERE oid= '".$oid."' ");
            $stmt->execute($a);
            $affected_rows = $stmt->rowCount();
            if($affected_rows<=0){
                $response["status"] = "warning";
                $response["message"] = "No row updated";
            }else{
                $response["status"] = "success";
                $response["message"] = " Successfully Changed status";
            }
        }catch(PDOException $e){
            $response["status"] = "error";
            $response["message"] = "Update Failed: " .$e->getMessage();
        }
        return $response;
    }
	 function changestatusofinvoices($orderID, $status, $userID){ 
        try{
            $a = array();
            $stmt =  $this->db->prepare("UPDATE invoices SET currentStatus= '".$status."' WHERE orderID= '".$orderID."' ");
            $stmt->execute($a);
            $affected_rows = $stmt->rowCount();
            if($affected_rows<=0){
                $response["status"] = "warning";
                $response["message"] = "No row updated";
            }else{
                $response["status"] = "success";
                $response["message"] = " Successfully Changed status";
            }
        }catch(PDOException $e){
            $response["status"] = "error";
            $response["message"] = "Update Failed: " .$e->getMessage();
        }
        return $response;
    }
	
	function changestatusofuser($userID, $status){ 
        try{
            $a = array();
            $stmt =  $this->db->prepare("UPDATE user SET currentStatus= '".$status."' WHERE userID= '".$userID."' ");
            $stmt->execute($a);
            $affected_rows = $stmt->rowCount();
            if($affected_rows<=0){
                $response["status"] = "warning";
                $response["message"] = "No row updated";
            }else{
                $response["status"] = "success";
                $response["message"] = " Successfully Changed status";
            }
        }catch(PDOException $e){
            $response["status"] = "error";
            $response["message"] = "Update Failed: " .$e->getMessage();
        }
        return $response;
    }
	
	function delete($table, $where){
        if(count($where)<=0){
            $response["status"] = "warning";
            $response["message"] = "Delete Failed: At least one condition is required";
        }else{
            try{
                $a = array();
                $w = "";
                foreach ($where as $key => $value) {
                    $w .= " and " .$key. " = :".$key;
                    $a[":".$key] = $value;
                }
                $stmt =  $this->db->prepare("DELETE FROM $table WHERE 1=1 ".$w);
                $stmt->execute($a);
                $affected_rows = $stmt->rowCount();
                if($affected_rows<=0){
                    $response["status"] = "warning";
                    $response["message"] = "No row deleted";
                }else{
                    $response["status"] = "success";
                    $response["message"] = $affected_rows." row(s) deleted from database";
                }
            }catch(PDOException $e){
                $response["status"] = "error";
                $response["message"] = 'Delete Failed: ' .$e->getMessage();
            }
        }
        return $response;
    }
    
     function sendmail($to, $fullName, $password) {
       
        try{
           
               	$to = $to;
		$fullName= $fullName;
		$from= "support@lalcode.net";
		$subject = "no-reply";
		$message = "Dear ".$fullName.", 
	
		Your password is ".$password." .
	
		please login from here www.account.lalcode.net
		
		Thanks
		lalcode Team";
	
	include('mail/smtpwork.php');
	
        }catch(PDOException $e){
            $response["status"] = "error";
            $response["message"] = 'Insert Failed: ' .$e->getMessage();
            $response["data"] = 0;
        }
        return $response;
    }
    function verifyRequiredParams($inArray, $requiredColumns) {
        $error = false;
        $errorColumns = "";
        foreach ($requiredColumns as $field) {
        // strlen($inArray->$field);
            if (!isset($inArray->$field) || strlen(trim($inArray->$field)) <= 0) {
                $error = true;
                $errorColumns .= $field . ', ';
            }
        }

        if ($error) {
            $response = array();
            $response["status"] = "error";
            $response["message"] = 'Required field(s) ' . rtrim($errorColumns, ', ') . ' is missing or empty';
            echoResponse(200, $response);
            exit;
        }
    }
}

?>
