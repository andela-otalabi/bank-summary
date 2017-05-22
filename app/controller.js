var OptimalModel = require('./models');

module.exports = {
    getOptimal: function(req, res){
        OptimalModel.find(function(err, optimal){
            if (err) {
                res.send(err);
            }
            res.json(optimal);
        });
    },

    getOneOptimal: function(req, res){
        OptimalModel.findById(req.params.id, function(err, optimal){
            if (err) {
                res.send(err);
            }
            res.json(optimal);
        });
    },

    createOptimal: function(req, res){
        var optimal = new OptimalModel(req.body);
        optimal.name = req.body.name;
        optimal.category = req.body.category;
        optimal.save(function(err, optimal){
            if (err) {
                res.send(err);
            }
            else {
                res.json({
                    message: 'saved',
                    optimal
                });
            }
        })
    }

    // deleteOptimal: function(req, res){
    //     OptimalModel.remove({_id: req.params.id}, function(err, result){
    //         if (err) {
    //             res.send(err);
    //         }
    //         res.json({message: 'optimal successfully removed'});
    //     })
    // },

    // updateOptimal: function(req, res){
    //     OptimalModel.findById({_id: req.params.id}, function(err, optimal){
    //         if (err) {
    //             res.send(err);
    //         }
    //         optimal.name = req.body.name;
    //         optimal.category = req.body.category;

    //         optimal.save(function (err, updatedOptimal) {
    //             if (err) {
    //                 res.send(err);
    //             }
    //             res.json({message: 'optimal updated', updatedOptimal});
    //         });
    //     })
    // }

}