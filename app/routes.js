var controller = require('./controller');

module.exports = function(app){
    app.route('/api').post(controller.generateSummary);
}