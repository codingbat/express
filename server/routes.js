(function () {

    'use strict';

    var mongoose = require('mongoose');
    var Location = require('./model.js');


    module.exports = function (app) {
        app.get('/locations', function (req, res) {
            var query = Location.find({});
            query.exec(function (err, users) {
                if (err) {
                    res.send(err);
                } else {
                    res.json(users);
                }
            });
        });

        app.post('/locations', function (req, res) {
            var newLoc = new Location(req.body);
            newLoc.save(function (err) {
                if (err) {
                    res.send(err);
                }
                else
                {
                    res.json(req.body);
                }
            });
        });

        app.post('/query/', function (req, res) {

            // Grab all of the query parameters from the body.
            var lat = req.body.location.lat;
            var lng = req.body.location.lng;
            var distance = req.body.distance;
            var name = req.body.name;

            // Opens a generic Mongoose Query. Depending on the post body we will...
            var query = Location.find({});

            // ...include filter by Max Distance (converting miles to meters)
            if (distance) {

                // Using MongoDB's geospatial querying features. (Note how coordinates are set [long, lat]
                query = query.where('location').near({
                    center: {type: 'Point', coordinates: [lng, lat]},
                    maxDistance: distance * 1609.34, spherical: true,
                });

            }

            if (name) {
                query = query.where('name').equals(name);
            }

            // Execute Query and Return the Query Results
            query.exec(function (err, users) {
                if (err) {
                    res.send(err);
                }
                else
                {
                    res.json(users);
                }
            });
        });

        app.delete('/locations/:objID', function (req, res) {
            var objID = req.params.objID;
            var update = req.body;

            Location.findByIdAndRemove(objID, update, function (err, loc) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.json(req.body);
                }
            });
        });
    };
})();
