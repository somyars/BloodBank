const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

const passport = require('passport');
const passportLocal = require('passport-local');
const _ = require('lodash');

const userService = require('./user.service');


const mongoose = require('mongoose');
var { userSchema } = require('../models/user');
const User = mongoose.model('User',userSchema);

/*router.post('/authenticate', authenticate);

function authenticate(req, res) {
	if(req) {
	console.log('user controller');
    passport.authenticate('local', (err, user, info) => {      
		console.log('auth');
        if (err) return res.status(400).json(err);
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        else return res.status(404).json(info);
    })(req, res);
	}
}*/

/*router.post('/authenticate', (req, res, next) => {
	console.log('authentication',next);

    passport.authenticate('local', (err, user, info) => {      
		console.log('auth');
        if (err)
		{ //err = new Error("Error 400");
		return res.status(400).json(err);
		//return next(err);//res.status(400).json(err);
		}
        else if (user){
		console.log("Here");
		return res.status(200).json({ "token": user.generateJwt() });
		//return next();
		}
        else {
		console.log("Here 404");
		err = new Error("Error 404");
		//return next();
		return res.status(404).json(info);
		}//res.status(404).json(info);
    })(req, res);


	/*passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        if (err){ 
		let v = res.status(400).json(err);
		console.log("error::::", v);
		return v;
		}
        // registered user
        else if (user){ 
		let v = res.status(200).json({ "token": user.generateJwt() });
		console.log("resp::::", v);
		return v;
		}
        // unknown user or wrong password
        else{
		let v = res.status(404).json(info);
		console.log("else 404::::", v);
		return v;
		}
    })(req, res);
});*/



router.post('/authenticate', (req, res, next) => {
    // call for passport authentication
	console.log("Next",next);
    passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res,next);
});

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
