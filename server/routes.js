(function () {
    var mongoose = require('mongoose');
    var Location = require('./model.js');


    module.exports = function (app) {
        app.get('/locations', function (req, res) {
            var query = Location.find({});
            query.exec(function (err, locations) {
                if (err) {
                    res.send(err);
                } else {
                    res.json(locations);
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

            var lat = req.body.lat;
            var lng = req.body.lng;
            var distance = req.body.distance;
            var name = req.body.name;
            var type = req.body.type;

            var query = Location.find({});

            if (distance) {
                query = query.where('location').near({
                    center: {type: 'Point', coordinates: [lng, lat]},
                    maxDistance: distance, spherical: true,
                });

            }

            if (name) {
                query = query.where('name').equals(name);
            }

            if (type) {
                query = query.where('type').equals(type);
            }

            query.exec(function (err, locations) {
                if (err) {
                    res.send(err);
                }
                else
                {
                    res.json(locations);
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
