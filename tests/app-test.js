var should = require('should');
var chai = require('chai');
var chaiHttp = require('chai-http');
var Optimal = require('../app/models');
var server = require('../index');
var controller = require('../app/controller');

chai.use(chaiHttp);

describe('optimal', function(){
    beforeEach(function(done) {
        Optimal.remove({}, function(err) {
            done();
        });
    });

    describe('optimal controller', function(){
        it('should have get method', function(){
            should.exist(controller.getOptimal);
        })
    });

    describe('GET /api/optimal', function(){
        it('should get all optimals', function(done){
            chai.request(server).get('/api/optimal').end(function(err,res){
                res.statusCode.should.be.eql(200);
                res.body.length.should.be.eql(0);
                res.body.should.be.instanceof(Array);
                done();
            })
        })
    });

    describe('POST /api/optimal', function(){
        it('should create a new optimal', function(done){
            var optimal = {
                name: 'testing',
                category: 'first'
            }
            chai.request(server).post('/api/optimal').send(optimal).end(function(err, res){
                res.statusCode.should.be.eql(200);
                res.body.should.be.instanceof(Object);
                res.body.should.have.property('message').eql('saved');
                res.body.optimal.should.have.property('category');
                done();
            })
        })
    });

    describe('POST /api/optimal', function(){
        it.only('should not create a new optimal without name', function(done){
            var optimal = {
                category: 'no name'
            }
            chai.request(server).post('/api/optimal').send(optimal).end(function(err, res){
                res.statusCode.should.be.eql(200);
                res.body.should.be.instanceof(Object);
                res.body.should.have.property('name')
                res.body.errors.should.have.property('name');
                done();
            })
        })
    });

    describe('/GET /api/optimal/:id', function(){
        it('should GET an optimal by the given id', function(done){
            var optimal = new Optimal({ name: "The Lord of the Rings", category: "high"});
            optimal.save(function(err, optimal){
                chai.request(server)
                .get('/api/optimal/' + optimal._id)
                .send(optimal)
                .end(function(err, res) {
                    res.statusCode.should.be.eql(200);
                    res.body.should.be.instanceof(Object);
                    res.body.should.have.property('name');
                    res.body.should.have.property('category');
                    res.body.should.have.property('_id')
                  done();
                });
            });
        });
    });
})
