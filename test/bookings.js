var should = require('should');
var request = require('supertest');
var winston = require('winston');


describe('Route', function() {
  var url = 'http://127.0.0.1:8000/api/v1/bookings';

  before(function(done) {
    done();
  });

  describe('Bookings', function() {

    it('Should run successfully - Add a booking', function(done) {
      var booking = {
        "license_plate": "KBT699T",
        "user_id": "ian.j@g.com",
        "car_owner": "j@peter.com",
        "days_of_booking": 2
      };

      request(url)
        .post('/')
        .send(booking)
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err,res) {
          if (err) {
            throw err;
          }
           done();
        });
    });

    it('Should return an error - trying to save duplicate booking', function(done) {
      var booking = {
        "license_plate": "KBT699T",
        "user_id": "ian.j@g.com",
        "car_owner": "j@peter.com",
        "days_of_booking": 2
      };

      request(url)
      .post('/')
      .send(booking)
      .expect(409)
      .end(function(err, res) {
          if (err) {
            throw err;
          }
          done();
      });
    });

    it('Should correctly update an existing Booking', function(done) {
      var booking = {
        "license_plate": "KBT699T",
        "user_id": "ian.j@g.com",
        "car_owner": "j@peter.com",
        "days_of_booking": 2
      };
      request(url)
      	.put('/KBT699T')
      	.send(booking)
        .expect(200)
      	.expect('Content-Type', /json/)
      	.end(function(err,res) {
      		if (err) {
      			throw err;
      		}
      		 res.body.should.have.property('license_plate');
           res.body.should.have.property('user_id');
           res.body.should.have.property('car_owner');
           res.body.should.have.property('days_of_booking');

      		 done();
      	});
      });

    it('Should correctly delete an existing Booking', function(done) {

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
