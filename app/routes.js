var controller = require('./controller');

module.exports = function(app){
    app.route('/api').post(controller.generateSummary);
    app.get('*', function(req,res){
        res.sendfile('./public/index.html');
    })
}