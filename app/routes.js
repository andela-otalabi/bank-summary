var controller = require('./controller');

module.exports = function(app){
    app.route('/api/optimal').get(controller.getOptimal);
    app.route('/api/optimal').post(controller.createOptimal);
    app.route('/api/optimal/:id').get(controller.getOneOptimal);
}