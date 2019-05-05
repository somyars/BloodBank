const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

const userService = require('./user.service');

var { User } = require('../models/user');
router.post('/authenticate', authenticate);

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

// => localhost:3000/users/
router.get('/', (req, res, next) => {
    // User.find((err, docs) => {
    //     if (!err) { res.send(docs); }
    //     else { console.log('Error in Retriving Users :' + JSON.stringify(err, undefined, 2)); }
    // });
    User.aggregate([
        {
            $geoNear: {
                near: { type: 'Point', coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)] },
                distanceField: "dist.calculated",
                maxDistance: 100000, // 100000 meters
                spherical: true
            }
        },
        {
            $match: { bloodgroup: req.query.bloodgroup }
           }
    ]).then(function(users, next){
        res.send(users);
    }).catch(next);
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    User.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving User :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
	console.log('Data from request:'+req);
    var u = new User({
        guid: req.body.guid,
		isActive: req.body.isActive,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		password: req.body.password,
		name: req.body.name,
		gender: req.body.gender,
		age: req.body.age,
		type: req.body.type,
		bloodgroup: req.body.bloodgroup,
		email: req.body.email,
		phone: req.body.phone,
		address: req.body.address,
		registered: req.body.registered,
		latitude: req.body.latitude,
		longitude: req.body.longitude
    });
    u.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in User Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var u = {
        guid: req.body.guid,
		isActive: req.body.isActive,
		name: req.body.name,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		password: req.body.password,
		gender: req.body.gender,
		age: req.body.age,
		type: req.body.type,
		bloodgroup: req.body.bloodgroup,
		email: req.body.email,
		phone: req.body.phone,
		address: req.body.address,
		registered: req.body.registered,
		latitude: req.body.latitude,
		longitude: req.body.longitude
    };
    User.findByIdAndUpdate(req.params.id, { $set: u }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in User Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    User.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in User Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;
