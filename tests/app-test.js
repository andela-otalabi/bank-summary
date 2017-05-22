var should = require('should');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index');
var controller = require('../app/controller');
var path = require('path');
var fs = require('fs')

chai.use(chaiHttp);

var filePath = path.resolve(__dirname, './statement.csv');

describe('bank', function(){

    describe('bank controller', function(){
        it('should have get method', function(){
            should.exist(controller.generateSummary);
        })
    });

    describe('GET /api', function(){
        it('should get bank statement summary', function(done){

            chai.request(server).post('/api').attach('file', fs.readFileSync(filePath), 'statement.csv').end(function(err,res){
                res.statusCode.should.be.eql(200);
                res.body.should.have.property('deposits');
                res.body.should.have.property('withdrawal');
                res.body.should.have.property('categorySummary');
                done();
            })
        })
    });
})
