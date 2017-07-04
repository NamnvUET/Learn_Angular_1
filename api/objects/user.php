<?php

class User
{
    private $conn;
    private $table_name = "users";

    public $id;
    public $name;
    public $age;
    public $email;

//        Constructor
    public function __construct($db)
    {
        $this->conn = $db;
    }

//        Get ListUser
    public function listUsers()
    {
        // select all query
        $query = "SELECT * FROM users";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();

        return $stmt;
    }

//      Add new User
    public function addNew()
    {
        // query to insert record
        $query = "INSERT INTO
                $this->table_name
            SET
                id = '$this->id', name= '$this->name', age=$this->age, email= '$this->email'";
        // prepare query
        $stmt = $this->conn->prepare($query);
        //execute query
        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }

//      Find user by id
    public function findById()
    {
        $query = "SELECT * FROM users WHERE id = '$this->id'";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->name = $row['name'];
        $this->age = $row['age'];
        $this->email = $row['email'];
    }

//      Update User
    public function update()
    {
        $query = "UPDATE $this->table_name
                  SET name = '$this->name',
                      age = $this->age,
                      email = '$this->email'
                      WHERE id = '$this->id'
                   ";
        $stmt = $this->conn->prepare($query);
        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }

//  Delete User
    public function delete(){
        $query = "DELETE FROM $this->table_name WHERE id = '$this->id' ";
        $stmt = $this->conn->prepare($query);

        if($stmt->execute())
        {
            return true;
        }
        else{
            return false;
        }
    }

}

?>