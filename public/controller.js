app.controller('optimalCtrl', ['$scope', 'Optimal','Upload', function($scope, Optimal, Upload){
    $scope.ready = false;
    $scope.postOptimal = function(file){
        Upload.upload({
            url: '/api',
            data: {file: file}
        }).then(function(res){
            if(res){
                $scope.ready = true
                $scope.labels = Object.keys(res.data.categorySummary);
                $scope.data = Object.values(res.data.categorySummary);
                $scope.deposits = res.data.deposits;
                $scope.withdrawal = res.data.withdrawal;
            }
        })
    }
}]);