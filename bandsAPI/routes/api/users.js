const express = require('express');
const route = express.Router();
const User = require('../../db-config/models/user');

route.get('/' , (req, res) => {
   
    User.findAll()
        .then((users) => {
            res.status(200).send(users);
        })
        .catch((err) => {
            res.status(500).send({
                error: 'could not retrieve users'
            })
        })
})

route.get('/:uid', (req, res) => {

    User.findByPk(req.params.uid)
        .then((user) => {
            if(user){
                res.status(200).send(user);
            } else {
                throw new Error();
            }
        }).catch((err) => {
            res.status(404).send({
                error: 'Could not find user'
            })
        });
})

route.post('/', (req, res) => {

    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        organization: req.body.organization,
        dob: req.body.dob
    }).then((user) => {
        res.status(201).send(user);
    }).catch((err) => {
        res.status(501).send({
            error: 'Email already taken. Could\'nt create user.'
        })
    })
})

route.post('/user', (req, res) => {
    
    let { email } = req.body;
   
    User.findOne({
        where: {
            email
        }
    }).then((user) => {
            if(user){
                res.status(200).send(user);
            } else {
                throw new Error();
            }
            
    }).catch((err) => {
        res.status(401).send({
            error: 'Wrong email or password.'
        });
    });
})

route.put('/user/:uid', (req, res) => {

    User.update({
        name: req.body.name,
        email: req.body.email,
        organization: req.body.organization,
        dob: req.body.dob
    },{
        where: {
            uid: req.params.uid
        }
    })
    .then((rowsUpdated) => {
        res.status(200).send(rowsUpdated);
    })
    .catch((err) => {
        console.log(err);
        res.status(404).send({
            error: 'Cound\'nt update user.'
        })
    })
})

route.put('/send-otp', (req, res) => {
    
    User.update({
        otp: req.body.otp
    },{
        where: {
            email: req.body.email
        }
    })
    .then((rowsUpdated) => {
        res.status(200).send(rowsUpdated);
    })
    .catch((err) => {
        console.log(err);
        res.status(404).send({
            error: 'Cound\'nt update user.'
        })
    })
})

route.post('/verify-otp', (req, res) => {
    let email = req.body.email;
    
    User.findOne({
        where: {
            email
        },
        attributes: ['otp']
    })
    .then((otp) => {
        res.status(200).send(otp)
    })
    .catch((err) => {
        console.log(err);
        res.status(404).send({
            error: 'Cound\'nt find email.'
        })
    })
})

route.put('/reset-pswd', (req, res) => {
    User.update({
        password: req.body.password
    },{
        where: {
            email: req.body.email
        }
    })
    .then((rowsUpdated) => {
        res.status(200).send(rowsUpdated);
    })
    .catch((err) => {
        console.log(err);
        res.status(404).send({
            error: 'Cound\'nt update user.'
        })
    })
})

route.use('/', require('./bands'));

module.exports = route;