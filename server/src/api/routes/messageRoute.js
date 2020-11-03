const Router = require("express")
const messageService = require("../services/messageService")
// import * as authService from '../services/authService.js';
// import * as userService from '../services/userService';
// import jwtMiddleware from '../middlewares/jwtMiddleware';

const router = Router();

// user added to the request (req.user) in a strategy, see passport config
router
    // custom

    // get all messages by chat id
    .get(
        '/all?:id',
        (req, res, next) => {
            messageService.getAllByChatId(req.query.id)
                .then(data => res.send(data))
                .catch(error => {
                    res.status(400).json({error: true, message: error.message});
                })
        }
    )

    // Base
  .get(
    '/',
    (req, res, next) => {
      messageService.getAll()
        .then(data => res.send(data))
        .catch(error => {
          res.status(400).json({error: true, message: error.message});
        })
    }
  )

  .post(
        '/',
        (req, res, next) => {
            messageService.create(req.body)
                .then(data => res.send(data))
                .catch(error => {
                    res.status(400).json({error: true, message: error.message});
                })
        }
    )



module.exports = router;