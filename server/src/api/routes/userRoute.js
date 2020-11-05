const Router = require("express");
const userService = require("../services/userService");
const router = Router();

router
  .get('/', (req, res, next) => {
      userService.getAll()
        .then(data => res.send(data))
        .catch(error => {
          res.status(400).json({error: true, message: error.message});
        })
    })

  .get('/:id', (req, res, next) => {
      userService.getById(req.params.id)
        .then(data => res.send(data))
        .catch(error => {
          res.status(400).json({error: true, message: error.message});
        })
    })

  .post('/', (req, res, next) => {
    userService.create(req.body)
      .then(data => res.send(data))
      .catch(next)
  })

  .put('/:id', (req, res, next) => {
    userService.update(req.query.id, req.body)
      .then(data => res.send(data))
      .catch(error => {
        res.status(400).json({error: true, message: error.message});
      })
  })

  .delete('/:id', (req, res, next) => {
    userService.delete(req.query.id)
      .then(data => res.send(data))
      .catch(error => {
        res.status(400).json({error: true, message: error.message});
      })
  })

module.exports = router;