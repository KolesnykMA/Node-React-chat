const Router = require("express")
const authService = require("../services/authService")
// import * as authService from '../services/authService.js';
// import * as userService from '../services/userService';
// import jwtMiddleware from '../middlewares/jwtMiddleware';

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

    // .get(
    //     '/user',
    //     (req, res, next) => res.send('Hello'))


module.exports = router;