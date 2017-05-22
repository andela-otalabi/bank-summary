var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OptimalSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String
    }
});

var OptimalModel = mongoose.model('Optimal', OptimalSchema);

OptimalSchema.pre("save", function(next) {   
    OptimalModel.findOne({name : this.name}, 'name', function(err, results) {
        if (err) {
            next(err);
        } else if(results) {
            self.invalidate("name", "Name exists!");
            next(new Error("Name exists"));
        } else {
            next();
        }
    })
});

module.exports = OptimalModel;