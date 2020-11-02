const Router = require("express")
const userService = require("../services/userService")
// import * as authService from '../services/authService.js';
// import * as userService from '../services/userService';
// import jwtMiddleware from '../middlewares/jwtMiddleware';

const router = Router();

// user added to the request (req.user) in a strategy, see passport config
router
    .get(
        '/',
        (req, res, next) => {

            userService.getAll()
                .then(data => res.send(data))
                .catch(next)
        }
    )

    .get(
        '/:id',
        (req, res, next) => {
            userService.getById(req.params.id)
                .then(data => res.send(data))
                .catch(next)
        }
    )
    //
    //
    // .put(
    //     '/:id',
    //     (req, res, next) => {
    //         userService.update(req.query.id)
    //             .then(data => res.send(data))
    //             .catch(next)
    //     }
    //
    // )
    //
    // .delete(
    //     '/:id',
    //     (req, res, next) => {
    //         userService.delete(req.query.id)
    //             .then(data => res.send(data))
    //             .catch(next)
    //     }
    //
    // )



module.exports = router;