module.exports = function(app, db, apiRouter) {

	var BookingResource = require('express').Router({ mergeParams: true });

    /**
     * Block comment for route
     * @return res
     */
	BookingResource.get('/', function(req, res, next) {
        db.Booking.findAll({ include: [{ all: true, nested: true }]})
        .then(function(booking) {
            res.status(200).json(booking);
        })
        .on('error', function(err) {
            res.status(500).json({ error: err });
        });
	});


    BookingResource.get('/:id', function(req, res, next) {
        db.Booking.find(req.params.id)
            .then(function(booking) {
                if (booking !== null) {
                    res.status(200).json( booking );
                } else {
                    res.status(404).json({ error: 'Booking not Found'});
                }
            })
            .on('error', function(err) {
                res.status(500).json({ error: err });
            });
    });


    BookingResource.post('/', function (req, res) {
        db.Booking.create({
            license_plate: req.body.license_plate,
            booking_date: req.body.booking_date,
            user_id: req.body.user_id,
            car_owner: req.body.car_owner,
            days_of_booking: req.body.days_of_booking

        }).then(function(booking) {
            res.status(201).json( booking );
        }).on('error', function (err) {
            if (err.name === "SequelizeUniqueConstraintError") {
                res.status(409).json({ error: 'Resource Already Exists' });
            } else {
                res.status(500).json({ error: err });
            }
        })
    });


    BookingResource.put('/:id', function (req, res) {
         db.Booking.find(req.params.id)
            .then(function(booking) {
                if (booking !== null) {
                    booking.license_plate = req.body.license_plate;
                    booking.booking_date = req.body.booking_date;
                    booking.user_id = req.body.user_id;
                    booking.car_owner = req.body.car_owner;
                    booking.days_of_booking = req.body.days_of_booking;

                    booking.save()
                        .then(function(booking) {
                            res.status(200).json(booking);
                        })
                        .on('error', function(err) {
                            res.status(500).json({ error: err });
                        })
                } else {
                    res.status(404).json({ error: 'Booking not Found' });
                }
            })
            .on('error', function(err) {
                res.status(500).json({ error: err });
            });
    });

    /**
     * Delete the booking specified and returns 204 No Content if that was successful.
     * If the user does not have access to delete the vehicle, you'll see 403 Forbidden.
     *
     * @param req.param.id
     * @return res
     */
    BookingResource.delete('/:id', function (req, res) {
        db.Booking.find(req.params.id)
            .then(function(booking) {
                if (booking !== null) {
                    booking.destroy()
                        .then(function() {
                            res.status(204).send('');
                        })
                } else {
                    res.status(404).json({ error: 'Booking Not Found'});
                }
            })
            .on('error', function(err) {
                res.status(500).json({ error: err });
            });
    });

    apiRouter.use('/bookings', BookingResource);
}
