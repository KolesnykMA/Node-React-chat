const jwt = require("jsonwebtoken");
const { secret } = require("../../config/jwtConfig")

const jwtValidation = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    req.user = jwt.verify(
      token,
      secret
    );

    next();
  } catch (err) {
    return res.status(401).send({
      msg: 'SESSION_NOT_VALID!'
    });
  }
}

module.exports = jwtValidation;