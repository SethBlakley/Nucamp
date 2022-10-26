const express = require('express')
const Favorite = require('../models/favorite')
const authenticate = require('../authenticate')
const favoriteRouter = express.Router()
const cors = require('./cors')

favoriteRouter.route('/')
.options(cors.corsWithOptions, authenticate.verifyUser, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
  Favorite.find({ user: req.user._id })
  .populate('user')
  .populate('campsites')
  .then(favorites => {
    res.status = 200
    res.setHeader('Content-Type', 'application/json')
    res.json(favorites)
  })
  .catch(err => next(err))
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
  Favorite.findOne({ user: req.user._id })
  .then(favorite => {
    if (favorite) {
      req.body.forEach(id => {
        console.log(id)
        if (!favorite.campsites.includes(id._id)) {
          favorite.campsites.push(id._id)
        }
      })
      favorite.save()
      .then(favorite => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(favorite)  
      })
      .catch(err => next(err))
    } else {
      Favorite.create({ user: req.user._id, campsites: req.body})
      .then(favorite => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(favorite) 
      })
      .catch(err => next(err))
    }
  })
  .catch(err => next(err))
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
  res.statusCode = 403
  res.end('PUT operation not supported on /favorites')
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
  Favorite.findOneAndDelete({ user: req.user._id })
  .then(favorite => {
    if (favorite) {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.json(favorite)
    } else {
      res.statusCode = 403
      res.setHeader('Content-Type', 'text/plain')
      res.end('You do not have any favorites to delete')
    }
  })
  .catch(err => next(err))
})

favoriteRouter.route('/:campsiteId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res) => {
    res.statusCode = 403
    res.end(`GET operation not supported on /favorites/${req.params.campsiteId}`)
  })
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
  console.log(req.user._id)
  Favorite.findOne({ user: req.user })
  .then(favorite => {
    if (favorite) {
      if (!favorite.campsites.includes(req.params.campsiteId)) {
        favorite.campsites.push(req.params.campsiteId)
        favorite.save()
        .then(favorite => {
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.json(favorite)  
        })
        .catch(err => next(err))
      } else {
        res.statusCode = 403
        res.end('That campsite is already in the list of favorites!')
      }
    } else {
      Favorite.create({ user: req.user._id, campsites: [req.params.campsiteId]})
      .then(favorite => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(favorite)   
      })
      .catch(err => next(err))
    }
  })
  .catch(err => next(err))
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
  res.statusCode = 403
  res.end(`PUT operation not supported on /favorites/${req.params.campsiteId}`)
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
  Favorite.findOne({ user: req.user._id })  
  .then(favorite => {
    if (favorite) {
      const index = favorite.campsites.indexOf(req.params.campsiteId)
      console.log(index)
      if (index > -1) {
        favorite.campsites.splice(index, 1)
      } else {
        res.statusCode = 403
        res.setHeader('Content-Type', 'text/plain')
        res.end("You haven't favorited that campsite") 
      }
      favorite.save()
      .then(favorite => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(favorite) 
      })
      .catch(err => next(err))
    } else {
      res.statusCode = 403
      res.setHeader('Content-Type', 'text/plain')
      res.end('That one is not in your favorite campsites')
    }
  })
  .catch(err => next(err))
})


module.exports = favoriteRouter