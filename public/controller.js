app.controller('optimalCtrl', ['$scope', 'Optimal', function($scope, Optimal){
    $scope.formData = {};

    Optimal.getOptimal().then(function(response){
        $scope.allOptimal = response.data;
    }, function(err){
        console.log(err);
    })

    $scope.postOptimal = function(){
        Optimal.postOptimal($scope.formData).then(function(response){
            window.location.reload(true);
        }, function(err){
            console.log(err);
        })
    }
}]);