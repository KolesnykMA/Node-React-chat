const Router = require("express");
const chatService = require("../services/chatService");

const router = Router();

router
  .get('/verify-started', (req, res, next) => {
    chatService.verifyStartedChat(req.user.user_id)
      .then(data => res.send(data))
      .catch(error => {
        res.status(400).json({ error: true, message: error.message });
      })
  })

  .post('/start', (req, res, next) => {
    chatService.startChat(req.user.user_id)
      .then(data => res.send(data))
      .catch(error => {
        res.status(400).json({ error: true, message: error.message });
      })
  })

  .post('/finish', (req, res, next) => {
    chatService.finishChat(req.user.user_id)
      .then(data => res.send(data))
      .catch(error => {
        res.status(400).json({ error: true, message: error.message });
      })
  })

  .get('/connected', (req, res, next) => {
    chatService.getAllConnectedByUserId(req.user.user_id)
      .then(data => res.send(data))
      .catch(error => {
        res.status(400).json({ error: true, message: error.message });
      })
  })

  .post('/join', (req, res, next) => {
    chatService.joinChat(req.body)
      .then(data => res.send(data))
      .catch(error => {
        res.status(400).json({ error: true, message: error.message });
      })
  })

  // base
  .get('/', (req, res, next) => {
    chatService.getAll(req.query)
      .then(data => res.send(data))
      .catch(error => {
        res.status(400).json({error: true, message: error.message});
      })
  })

  .get('/:id', (req, res, next) => {
    chatService.getById(req.params.id)
      .then(data => res.send(data))
      .catch(error => {
        res.status(400).json({error: true, message: error.message});
      })
  })

  .post('/', (req, res, next) => {
    chatService.create(req.body)
      .then(data => res.send(data))
      .catch(error => {
        res.status(400).json({error: true, message: error.message});
      })
  })

  .put('/:id', (req, res, next) => {
    chatService.update({ chatId: req.params.id, body: req.body })
      .then(data => res.send(data))
      .catch(error => {
        res.status(400).json({error: true, message: error.message});
      })
  })

  .delete('/:id', (req, res, next) => {
    chatService.delete(req.params.id)
      .then(data => res.send(data))
      .catch(error => {
        res.status(400).json({error: true, message: error.message});
      })
  })

module.exports = router;
