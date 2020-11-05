const Router = require("express")
const chatService = require("../services/chatService")
// import * as authService from '../services/authService.js';
// import * as userService from '../services/userService';
// import jwtMiddleware from '../middlewares/jwtMiddleware';

const router = Router();

// user added to the request (req.user) in a strategy, see passport config
router
    // custom
    // .get(
    //     '/created?:id',
    //     (req, res, next) => {
    //         chatService.getAllCreatedChatsByUserId(req.query.id)
    //             .then(data => res.send(data))
    //             .catch(error => {
    //                 res.status(400).json({error: true, message: error.message});
    //             })
    //     }
    // )

    .get(
        '/connected',
        (req, res, next) => {
            chatService.getAllConnectedByUserId(req.user.user_id)
                .then(data => res.send(data))
                .catch(error => {
                    res.status(400).json({ error: true, message: error.message });
                })
        }
    )

  .post(
    '/join',
    (req, res, next) => {
      chatService.joinChat(req.body)
        .then(data => res.send(data))
        .catch(error => {
          res.status(400).json({ error: true, message: error.message });
        })
    }
  )


    // base
    .get(
        '/',
        (req, res, next) => {
            chatService.getAll()
                .then(data => res.send(data))
                .catch(error => {
                    res.status(400).json({error: true, message: error.message});
                })
        }
    )

    .get(
        '/:id',
        (req, res, next) => {
            chatService.getById(req.params.id)
                .then(data => res.send(data))
                .catch(error => {
                    res.status(400).json({error: true, message: error.message});
                })
        }
    )

    .post(
        '/',
        (req, res, next) => {
            chatService.create(req.body)
                .then(data => res.send(data))
                .catch(error => {
                    res.status(400).json({error: true, message: error.message});
                })
        }
    )


    .put(
        '/:id',
        (req, res, next) => {
            chatService.update({ chatId: req.params.id, body: req.body })
                .then(data => res.send(data))
                .catch(error => {
                    res.status(400).json({error: true, message: error.message});
                })
        }

    )

    .delete(
        '/:id',
        (req, res, next) => {
            chatService.delete(req.params.id)
                .then(data => res.send(data))
                .catch(error => {
                    res.status(400).json({error: true, message: error.message});
                })
        }

    )



module.exports = router;