app.factory('Optimal', function($http){
    return {
        postOptimal: function(data){
            console.log('here')
            return $http.post('/api/', data);
        }
    }
})