var path = require('path');

describe('optimal home page', function() {
    
    beforeEach(function() {
        browser.get('http://localhost:3000/');
        browser.waitForAngular();
    });

    it('should add an optimal', function(){
        element(by.model('formData.name')).sendKeys('test');
        element(by.id('submit')).click();

        var optimalList = element.all(by.repeater('opt in allOptimal'));
        expect(optimalList.count()).toEqual(7)

    })

});