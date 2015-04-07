module.exports = function(app, db, apiRouter) {

	var UserResource = require('express').Router({ mergeParams: true });

    /**
     * Block comment for route
     * @return res
     */
	UserResource.get('/', function(req, res, next) {
        db.User.findAll({ include: [{ all: true, nested: true }]})
        .then(function(users) {
            res.status(200).json(users);
        })
        .on('error', function(err) {
            res.status(500).json({ error: err });
        });
	});


    UserResource.get('/:id', function(req, res, next) {
        db.User.find(req.params.id)
            .then(function(user) {
                if (user !== null) {
                    res.status(200).json( user );
                } else {
                    res.status(404).json({ error: 'User not Found'});
                }
            })
            .on('error', function(err) {
                res.status(500).json({ error: err });
            });
    });


    UserResource.post('/', function (req, res) {
        db.User.create({
            email: req.body.email,
            gender: req.body.gender,
            verification: req.body.verification,
            primary_email: req.body.primary_email,
            name: req.body.name,
            phone_number: req.body.phone_number,
            provider: req.body.provider,
            encrypted_password: req.body.encrypted_password,
            profile_url: req.body.profile_url
        }).then(function(user) {
            res.status(201).json( user );
        }).on('error', function (err) {
            if (err.name === "SequelizeUniqueConstraintError") {
                res.status(409).json({ error: 'Resource Already Exists' });
            } else {
                res.status(500).json({ error: err });
            }
        })
    });


    UserResource.put('/:id', function (req, res) {
        db.User.find(req.params.id)
            .then(function(user) {
                if (user !== null) {
                    user.email = req.body.email;
                    user.gender = req.body.gender;
                    user.verification = req.body.verification;
                    user.primary_email = req.body.primary_email;
                    user.phone_number = req.body.phone_number;
                    user.name = req.body.name;
                    user.provider = req.body.provider;
                    user.encrypted_password = req.body.encrypted_password;
                    user.profile_url = req.body.profile_url;

                    user.save()
                        .then(function(user) {
                            res.status(200).json(user);
                        })
                        .on('error', function(err) {
                            res.status(500).json({ error: err });
                        })
                } else {
                    res.status(404).json({ error: 'User not Found' });
                }
            })
            .on('error', function(err) {
                res.status(500).json({ error: err });
            });
    });


    /**
     * Delete the user specified and returns 204 No Content if that was successful.
     * If the user does not have access to delete the person, you'll see 403 Forbidden.
     *
     * @param req.param.id
     * @return res
     */
    UserResource.delete('/:id', function (req, res) {
        // remove a user from the listing - profile owner can
        db.User.find(req.params.id)
            .then(function(user) {
                if (user !== null) {
                    user.destroy()
                        .then(function() {
                            res.status(204).send('');
                        })
                } else {
                    res.status(404).json({ error: 'User Not Found'});
                }
            })
            .on('error', function(err) {
                res.status(500).json({ error: err });
            });
    });

    apiRouter.use('/users', UserResource);

}
