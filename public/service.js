app.factory('Optimal', function($http){
    return {
        getOptimal: function(){
            return $http.get('/api/optimal');
        },

        postOptimal: function(data){
            console.log('here')
            return $http.post('/api/optimal', data);
        }
    }
})