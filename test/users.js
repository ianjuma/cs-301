var should = require('should');
var request = require('supertest');
var winston = require('winston');


describe('Route', function() {
  var url = 'http://127.0.0.1:8000/api/v1/users';

  before(function(done) {
    done();
  });

  describe('Users', function() {

    it('Should successfully add a User', function(done) {
      var user = {
        "email": "brookrith@gmail.com",
        "gender": "m",
        "verification": "pending",
        "primary_email": "ian@yahoo.eu",
        "name": "Juma Ian",
        "phone_number": "+25470143",
        "provider": "local",
        "encrypted_password": "3534g3cg3vt45yx34t3",
        "profile_url": "img.com/img/3443"
      };

      request(url)
        .post('/')
        .send(user)
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err,res) {
          if (err) {
            throw err;
          }
           done();
        });
    });

    it('Should return error - trying to save duplicate User', function(done) {
      var user = {
        "email": "brookrith@gmail.com",
        "gender": "m",
        "verification": "pending",
        "primary_email": "ian@yahoo.eu",
        "name": "Juma Ian",
        "phone_number": "+25470143",
        "provider": "local",
        "encrypted_password": "3534g3cg3vt45yx34t3",
        "profile_url": "img.com/img/3443"
      };

      request(url)
      .post('/')
      .send(user)
      .expect(409)
      .end(function(err, res) {
          if (err) {
            throw err;
          }
          done();
      });
    });

    it('Should correctly update an existing User', function(done) {
      var user = {
        "email": "brookrith@gmail.com",
        "gender": "m",
        "verification": "pending",
        "primary_email": "ian@yahoo.eu",
        "name": "Juma Ian",
        "phone_number": "+25470143",
        "provider": "local",
        "encrypted_password": "3534g3cg3vt45yx34t3",
        "profile_url": "img.com/img/3443"
      };

      request(url)
      	.put('/brookrith@gmail.com')
      	.send(user)
        .expect(200)
      	.expect('Content-Type', /json/)
      	.end(function(err,res) {
      		if (err) {
      			throw err;
      		}
      		 res.body.should.have.property('email');
           res.body.should.have.property('name');

      		 done();
      	});
      });

    it('Should correctly delete an existing User', function(done) {

      request(url)
        .delete('/brookrith@gmail.com')
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
