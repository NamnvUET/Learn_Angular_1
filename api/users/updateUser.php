<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// include database and object files
include_once '../config/database.php';
include_once '../objects/user.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// prepare product object
$user = new User($db);

// get id of product to be edited
$data = json_decode(file_get_contents("php://input"));

// set ID property of user to be edited
$user->id = $data->id;
//// set product property values
$user->name = $data->name;
$user->age = $data->age;
$user->email = $data->email;

// update the product
if($user->update()){
    echo '{';
    echo '"message": "User was updated."';
    echo '}';
}
//
//// if unable to update the product, tell the user
else{
    echo '{';
    echo '"message": "Unable to update user."';
    echo '}';
}
?>