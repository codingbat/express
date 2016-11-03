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
                else {
                    res.json(req.body);
                }
            });
        });

        app.put('/locations/:objID', function (req, res) {
            var objID = req.params.objID;
            var updateLoc = req.body;

            Location.update({"_id": objID}, updateLoc,
                function (err, numberAffected) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("Updated %d point of interest.", numberAffected.n);
                    return res.json(req.body);
                });
        });

        app.post('/query/', function (req, res) {

            var lat = parseFloat(req.body.lat);
            var lng = parseFloat(req.body.lng);
            var distance = parseFloat(req.body.distance);
            var name = req.body.name;
            var type = req.body.type;

            var query = Location.find({});

            if (distance) {
                query = query.where('location').near({
                    center: {type: 'Point', coordinates: [lng, lat]},
                    maxDistance: distance * 1000, spherical: true,
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
                else {
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

        app.get('/reduced_types', function (req, res) {
            var obj = {};

            obj.map = function () {
                emit(this.type, 1);
            };

            obj.reduce = function (k, vals) {
                return vals.length
            };

            Location.mapReduce(obj, function (err, reduced) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.json(reduced);
                }
            });
        });
    };
})();
