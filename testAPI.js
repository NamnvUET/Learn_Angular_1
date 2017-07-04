var app = angular.module("myApp", []);
app.controller('myCtrl',function ($scope,$http) {
    var obj = new Object();
    $scope.mySubmit = function () {
        obj.id = $scope.id;
        obj.name = $scope.name;
        obj.age = $scope.age;
        obj.email = $scope.email;

        $http.post("./api/users/updateUser.php", obj);

        delete obj;
    }
})