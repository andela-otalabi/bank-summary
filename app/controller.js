var path = require('path');
var csv = require('csvtojson');

var statementArray = [];

var convertCsvToJson = function(filePath, callback){
    csv().fromFile(filePath).on('json', function(jsonObj){
        statementArray.push(jsonObj);
    }).on('done', function(error){
        if (error) {
            callback(error)
        }
        return callback(null, statementArray);
        console.log('end');
    })
};

module.exports = {
    generateSummary: function(req, res){
        var deposits = 0;
        var withdrawal = 0;
        var categorySummary = {};
        if (req.files) {
            convertCsvToJson(req.files[0].path, function(err, result){
                for(var i=0; i< result.length; i++){
                    var eachTransaction = result[i];
                    for (var key in eachTransaction) {
                        if(key === 'Amount'){
                            if (eachTransaction[key] > 0){
                                deposits = deposits + parseInt(eachTransaction[key]);
                            }
                            else {
                                withdrawal = withdrawal - eachTransaction[key];
                            }
                        }
                        if(key === 'Category'){
                            if (categorySummary[eachTransaction[key]]){
                                categorySummary[eachTransaction[key]] = categorySummary[eachTransaction[key]] + parseInt(eachTransaction['Amount']);
                            } else {
                                categorySummary[eachTransaction[key]] = parseInt(eachTransaction['Amount']);
                            }
                        }
                    }
                }
                res.json({
                    deposits: deposits,
                    withdrawal: withdrawal,
                    categorySummary: categorySummary});
            });
        }
        else{
            res.send('please upload a file')
        }
    }
}