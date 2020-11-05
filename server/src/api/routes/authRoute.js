const Router = require("express");
const authService = require("../services/authService");
const userService = require("../services/userService")
// import * as authService from '../services/authService.js';
// import * as userService from '../services/userService';
// import jwtMiddleware from '../middlewares/jwtMiddleware';
const jwtValidation = require('../middlewares/jwtValidation.middleware');

const router = Router();

// user added to the request (req.user) in a strategy, see passport config
router
    .post(
        '/login',
        (req, res, next) => {
            authService.login(req.body)
                .then(data => res.send(data))
                .catch(error => {
                    res.status(400).json({error: true, message: error.message});
                })
        }
    )

    .post(
        '/register',
        (req, res, next) => {
            authService.register(req.body)
                .then(data => res.send(data))
                .catch(error => {
                    res.status(400).json({error: true, message: error.message});
                })
        }

    )

  .get(
    '/user',
    jwtValidation,
    (req, res, next) => {
      userService.getById(req.user.user_id)
        .then(data => res.send(data))
        .catch(error => {
          res.status(400).json({error: true, message: error.message});
        })
    }

  )


module.exports = router;