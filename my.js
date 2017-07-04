var app = angular.module('myApp', []);
app.controller('users',function ($scope, $http) {
    $http.get("users.json").then(function (response) {
       $scope.users = response.data.users;
    });

    $scope.temp = [];

    $scope.listUsers = [];

    $scope.itemToUndo = '';

    //Get searchText from input field to filter
    $scope.getSearchText = function (text) {
        $scope.searchText = text;
    }

    //If user delete searchText
    $scope.isSearchText = function () {
        if($scope.inputForSearch == '')
        {
            $scope.searchText = '';
        }
    }

    //Check checkbox status
    $scope.checked = function (item) {
        if (item.checked == true) {
            $scope.temp.push({name: item.name, id: item.id, age: item.age, email: item.email});
        }
        //Else(unchecked), find item by item.id and remove it
        else {
            var index = $scope.temp.map(x => x.id).indexOf(item.id);
            $scope.temp.splice(index,1);
        }
    }

    //When click addSelected
    $scope.addSelected = function()
    {
        //If input checkAll selected
        // if($scope.checkAll == true) {
            // if(userconfirm == true)
            // {
            //     $scope.temp = $scope.temp.concat($scope.users);
            // }
            // else{
            //     $scope.checkAll = false;
            // }
        // }

        if($scope.temp.length != 0) {
            //Add temp array into listUsers array and remove all item
            //in users array which has id = temp.item.id
            $scope.listUsers = $scope.listUsers.concat($scope.temp);

            for(var i=0;i< $scope.temp.length;i++){
                var index = $scope.users.map(x => x.id).indexOf($scope.temp[i].id);
                $scope.users.splice(index,1);
            }
            //Remove all item of temp array
            $scope.temp = [];
        } else{
            alert("Bạn chưa chọn User để Add");
        }
    }

    $scope.get = function (item) {
        $scope.itemToUndo = item;
    }

    // When click yesConfirm
    $scope.yesConfirm = function(){
        if($scope.itemToUndo != ''){
            // Push it back users array
            $scope.users.push({name: $scope.itemToUndo.name,id: $scope.itemToUndo.id, age:$scope.itemToUndo.age, email:$scope.itemToUndo.email});
            //Remove it in listUsers
            var index = $scope.listUsers.map(x => x.id).indexOf($scope.itemToUndo.id);
            $scope.listUsers.splice(index,1);
            $scope.idToUndo = '';
        }
    }

    //Sort ListUsers By Field
    var sort = true;
    $scope.orderByMe = function(field){
        if(sort == true) {
            $scope.myOrder = "+" + field;
            sort = false;
        } else{
            $scope.myOrder = "-" + field;
            sort = true;
        }
    }
});