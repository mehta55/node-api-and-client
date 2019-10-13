const express = require('express');
const route = express.Router();
const Band = require('../../db-config/models/band');

route.get('/:uid/bands' , (req, res) => {
    
    Band.findAll({
        where: {
            userUid: req.params.uid
        }
    }).then((bands) => {
        if(bands){
            res.status(200).send(bands);
        } else {
            throw new Error();
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).send({
            error: 'Could not retrieve bands for user: ' + req.params.uid
        })
    });
})

route.post('/:uid/bands', (req, res) => {

    Band.create({
        name: req.body.name,
        description: req.body.description,
        rating: req.body.rating,
        origin: req.body.origin,
        userUid: req.params.uid,
    }).then((band) => {
        res.status(201).send(band);
    }).catch((err) => {
        console.log(err);
        res.status(501).send({
            error: 'Could not add new band'
        })
    })
})

route.get('/:uid/bands/band/:bid', (req, res) => {

    Band.findByPk(req.params.bid)
        .then((band) => {
            if(band){
                res.status(200).send(band);
            } else {
                throw new Error();
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(404).send({
                error: 'Could\'nt find band'
            });
        })
})

route.put('/:uid/bands/band/:bid', (req, res) => {
    Band.update({
        name: req.body.name,
        description: req.body.description,
        origin: req.body.origin,
        rating: req.body.rating
    },{
        where: {
            bid: req.params.bid
        }
    })
    .then((rowsUpdated) => {
        res.status(200).send(rowsUpdated);
    })
    .catch((err) => {
        console.log(err);
        res.status(404).send({
            error: 'Cound\'nt update band.'
        })
    })
})

route.delete('/:uid/bands/band/:bid', (req, res) => {

    Band.destroy({
        where: {
            bid: req.params.bid
        }
    })
    .then((deleted) => {
        if(deleted){
            res.sendStatus(200);
        } else {
            res.status(404).send({
                error: 'Could\'nt delete Band'
            });
        }
    }).catch((err) => {
        console.log(err);

        res.status(404).send({
            error: 'Could\'nt delete Band'
        });
    })
})

module.exports = route;