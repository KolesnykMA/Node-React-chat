const Router = require("express")
const chatService = require("../services/chatService")
// import * as authService from '../services/authService.js';
// import * as userService from '../services/userService';
// import jwtMiddleware from '../middlewares/jwtMiddleware';

const router = Router();

// user added to the request (req.user) in a strategy, see passport config
router
    // custom
    .get(
        '/created?:id',
        (req, res, next) => {
            chatService.getAllCreatedChatsByUserId(req.query.id)
                .then(data => res.send(data))
                .catch(next)
        }
    )

    .get(
        '/connected?:id',
        (req, res, next) => {
            chatService.getAllConnectedByUserId(req.query.id)
                .then(data => res.send(data))
                .catch(next)
        }
    )


    // base
    .get(
        '/',
        (req, res, next) => {
            chatService.getAll()
                .then(data => res.send(data))
                .catch(next)
        }
    )

    .get(
        '/:id',
        (req, res, next) => {
            chatService.getById(req.params.id)
                .then(data => res.send(data))
                .catch(next)
        }
    )

    .post(
        '/',
        (req, res, next) => {
            chatService.create(req.body)
                .then(data => res.send(data))
                .catch(next)
        }
    )

    .put(
        '/:id',
        (req, res, next) => {
            chatService.update({ chatId: req.params.id, body: req.body })
                .then(data => res.send(data))
                .catch(next)
        }

    )

    .delete(
        '/:id',
        (req, res, next) => {
            chatService.delete(req.params.id)
                .then(data => res.send(data))
                .catch(next)
        }

    )



module.exports = router;