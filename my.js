var app = angular.module('myApp', []);
app.controller('users',function ($scope, $http) {
    $http.get("users.json").then(function (response) {
       $scope.users = response.data.users;
    });

    $scope.temp = [];

    $scope.listUsers = [];

    //Get searchText from input field to filter
    $scope.getSearchText = function (text) {
        console.log(text);
        $scope.searchText = text;
    }

    //Check checkbox status
    $scope.checked = function (id) {
        if (id.checked == true) {
            $scope.temp.push({name: id.name, id: id.id, age: id.age, email: id.email});
        }
        //Else(unchecked), find item by item.id and remove it
        else {
            for (var i = 0; i < $scope.temp.length; i++) {
                if ($scope.temp[i].id == id.id) {
                    $scope.temp.splice(i, 1);
                    break;
                }
            }
        }
    }

    //When click addSelected
    $scope.addSelected = function()
    {
        //If input checkAll selected
        if($scope.checkAll == true)
        {
            // if(userconfirm == true)
            // {
                $scope.temp = $scope.temp.concat($scope.users);
            // }
            // else{
            //     $scope.checkAll = false;
            // }
        }

        if($scope.temp.length != 0)
        {
            //Add temp array into listUsers array and remove all item
            //in users array which has id = t   emp.item.id
            $scope.listUsers = $scope.listUsers.concat($scope.temp);

            for (var i = 0; i < $scope.temp.length; i++) {
                for (var j = 0; j < $scope.users.length; j++) {
                    if ($scope.users[j].id == $scope.temp[i].id) {
                        $scope.users.splice(j, 1);
                    }
                }
            }
            //Remove all item of temp array
            $scope.temp = [];
        }
        else{
            alert("Bạn chưa chọn User để Add");
        }
    }

    //When click back button
    $scope.undo = function(id){
        //Push it back users array
        var userConfirm = confirm("Are you sure ? ");
        if(userConfirm == true){
            $scope.users.push({name: id.name,id: id.id, age:id.age, email:id.email});
            //Remove it in listUsers
            for (var i = 0; i < $scope.listUsers.length; i++){
                if($scope.listUsers[i].id == id.id)
                {
                    $scope.listUsers.splice(i,1);
                }
            }
        }
    }
    
    //Sort ListUsers By Field
    var sort = true;
    $scope.orderByMe = function(field){
        if(sort == true)
        {
            $scope.myOrder = "+" + field;
            sort = false;
        }
        else{
            $scope.myOrder = "-" + field;
            sort = true;
        }
    }
});