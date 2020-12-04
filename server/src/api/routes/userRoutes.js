const Router = require("express");
const userService = require("../services/userService");
const router = Router();
const { validateGetUser } = require("../middlewares/user.validation.middleware");

router
  .get('/', (req, res, next) => {
      userService.getAll(req.query)
        .then(data => res.send(data))
        .catch(error => {
          res.status(400).json({error: true, message: error.message});
        })
    })

  .get('/:id', validateGetUser, (req, res, next) => {
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
    userService.update({ userId: req.params.id, body: req.body })
      .then(data => res.send(data))
      .catch(error => {
        res.status(400).json({error: true, message: error.message});
      })
  })

  .delete('/:id', (req, res, next) => {
    userService.delete(req.params.id)
      .then(data => res.send(data))
      .catch(error => {
        res.status(400).json({error: true, message: error.message});
      })
  })

module.exports = router;
