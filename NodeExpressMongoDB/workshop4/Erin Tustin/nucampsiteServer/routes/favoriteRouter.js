const express = require('express');
const Favorite = require('../models/favorite');
const authenticate = require('../authenticate');
const cors = require('./cors');

const favoriteRouter = express.Router();

favoriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorite.find({ user: req.user._id })
    .populate('user')
    .populate('campsite')
    .then(favorites => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorites);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    console.log('Hello');
    Favorite.findOne({user: req.user._id })
    .then(favorite => {
        console.log(favorite);
        if (favorite) {
            req.body.forEach(fav => {
                if (!favorite.campsites.includes(fav._id)){
                    favorite.campsites.push(fav._id)
                }
            }) 
            favorite.save()
            .then(favorite => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            })
        } else {
            Favorite.create({ user: req.user._id })
            .then(favorite => {
                req.body.forEach(fav => {
                    if (!favorite.campsites.includes(fav._id)){
                        favorite.campsites.push(fav._id)
                    }
                }) 
            favorite.save()
                .then(favorite => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorite);
                })
            })
        }
    })
    .catch(err => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    Favorite.findOneAndDelete()
    .then(favorite => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorite);
    })
    if (!Favorite) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('You do not have any favorites to delete.');
        }
});

favoriteRouter.route('/:campsiteId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`GET operation not supported on /favorites/${req.params.campsiteId}`);
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({user: req.user._id })
    .then(favorite => {
        if (favorite) {
            req.body.forEach(fav => {
                if (!favorite.campsites.includes(fav._id)){
                    favorite.campsites.push(fav._id)
                    } else {
                        err = new Error('That campsite is already in the list of favorites!');
                        err.status = 404;
                        return next(err);
                    }
                })
        } else {
                Favorite.create({ user: req.user._id })
                .then(favorite => {
                    req.body.forEach(fav => {
                        if (!favorite.campsites.includes(fav._id)){
                            favorite.campsites.push(fav._id)
                        }
                    }) 
                })
            }
         })
    .then(favorite => {
        favorite.save()
        .then(favorite => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favorite);
        })
    })
    .catch(err => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /favorites/${req.params.campsiteId}`);
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({ user: req.user._id })
    .then (favorite => {
        if (!favorite) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('You do not have any favorites to delete.');
        } else {
            req.body.forEach(fav => {
                if (!favorite.campsites.includes(fav._id)){
                    favorite.campsites.splice(favorite.campsites.indexOf(fav._id), 1)
                    } else {
                        err = new Error('That campsite is not in the list of favorites!');
                        err.status = 404;
                        return next(err);
                    }
                })
        }
    })
    .catch(err => next(err));
});

module.exports = favoriteRouter;