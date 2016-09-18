<?php
    if(isset($_FILES['file'])){    
    $errors= array();        
    $file_name = $_FILES['file']['name'];
    $file_size =$_FILES['file']['size'];
    $file_tmp =$_FILES['file']['tmp_name'];
    $file_type=$_FILES['file']['type'];   
    $file_ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));
    $extensions = array("pdf","doc","xls","excel");        
    if(in_array($file_ext,$extensions )=== false){
         $errors[]="file extension not allowed, please choose a pdf,doc,xls or excel file.";
    }
    if($file_size > 2097152){
        $errors[]='File size cannot exceed 2 MB';
    }               
    if(empty($errors)==true){
        move_uploaded_file($file_tmp,"../img/file/".$file_name);
    }else{
        print_r($errors);
    }
}
else{
    $errors= array();
    $errors[]="No file is found";
    print_r($errors);
}
?>