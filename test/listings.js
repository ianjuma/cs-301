var should = require('should');
var request = require('supertest');
var winston = require('winston');


describe('Route', function() {
  var url = 'http://127.0.0.1:8000/api/v1/listings';

  before(function(done) {
    done();
  });

  describe('Listings', function() {

    it('Successfully Submit a Listing', function(done) {
      var listing = {
        "license_plate": "KBT699T",
        "user_email": "ain.j@y.com"
      };

      request(url)
        .post('/')
        .send(listing)
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err,res) {
          if (err) {
            throw err;
          }
           done();
        });
    });

    it('Should return error - trying to save duplicate Listing', function(done) {
      var listing = {
        "license_plate": "KBT699T",
        "user_email": "ain.j@y.com"
      };

      request(url)
      .post('/')
      .send(listing)
      .expect(409)
      .end(function(err, res) {
          if (err) {
            throw err;
          }
          done();
      });
    });

    it('Should correctly update an existing Listing', function(done) {
      var listing = {
        "license_plate": "KBT699T",
        "user_email": "ain.j@y.com"
      };

      request(url)
      	.put('/KBT699T')
      	.send(listing)
        .expect(200)
      	.expect('Content-Type', /json/)
      	.end(function(err,res) {
      		if (err) {
      			throw err;
      		}
      		 res.body.should.have.property('license_plate');
           res.body.should.have.property('user_email');

      		 done();
      	});
      });

    it('Should correctly delete an existing Listing', function(done) {

      request(url)
        .delete('/KBT699T')
        .expect(204)
        .end(function(err,res) {
          if (err) {
            throw err;
          }
           done();
        });
      });

  });

});
