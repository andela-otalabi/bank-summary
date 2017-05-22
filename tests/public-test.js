describe('controller unit test', function(){
    var controller, scope;

    beforeEach(angular.mock.module('OptimalApp'));
    beforeEach(inject(function($controller){
        scope = {};
        controller = $controller('optimalCtrl', {
            $scope: scope
        })
    }));

    it('should have controller', function(){
        expect(controller).toBeDefined();
    })

    it('should have controller method post', function(){
        expect(scope.postOptimal).toBeDefined();
    })
})