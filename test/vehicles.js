var should = require('should');
var request = require('supertest');
var winston = require('winston');


describe('Route', function() {
  var url = 'http://127.0.0.1:8000/api/v1/vehicles';

  before(function(done) {
    done();
  });

  describe('Vehicles', function() {

    it('Add a car', function(done) {
      var vehicle = {
        "license_plate": "KBT699T",
        "color": "Red",
        "condition": "Good",
        "model": "Toyota Premio",
        "minimum_booking_days": 2,
        "current_location": "0000, 2324",
        "category": "Salon",
        "carrying_capacity": 4,
        "image_url": "http://dreamatico.com/data_images/car/car-5.jpg"
      };

      request(url)
        .post('/')
        .send(vehicle)
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err,res) {
          if (err) {
            throw err;
          }
           done();
        });
    });

    it('Should return error - trying to save duplicate Vehicle', function(done) {
      var vehicle = {
        "license_plate": "KBT699T",
        "color": "Red",
        "condition": "Good",
        "model": "Toyota Premio",
        "minimum_booking_days": 2,
        "current_location": "0000, 2324",
        "category": "Salon",
        "carrying_capacity": 4,
        "image_url": "http://dreamatico.com/data_images/car/car-5.jpg"
      };

      request(url)
      .post('/')
      .send(vehicle)
      .expect(409)
      .end(function(err, res) {
          if (err) {
            throw err;
          }
          done();
      });
    });

    it('Should correctly update an existing Vehicle', function(done) {
      var vehicle = {
        "license_plate": "KBT699T",
        "color": "Blue",
        "condition": "Bad",
        "model": "Toyota Premio",
        "minimum_booking_days": 2,
        "current_location": "0000, 2324",
        "category": "Salon",
        "carrying_capacity": 4,
        "image_url": "http://dreamatico.com/data_images/car/car-5.jpg"
      };
      request(url)
      	.put('/KBT699T')
      	.send(vehicle)
        .expect(200)
      	.expect('Content-Type', /json/)
      	.end(function(err,res) {
      		if (err) {
      			throw err;
      		}
      		 res.body.should.have.property('condition');
           res.body.should.have.property('minimum_booking_days');
           res.body.should.have.property('image_url');
           res.body.should.have.property('carrying_capacity');

      		 done();
      	});
      });

    it('Should correctly delete an existing Vehicle', function(done) {

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
