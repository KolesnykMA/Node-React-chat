const jwt = require("jsonwebtoken");
const { secret, expireTime } = require("../../data/config/jwtConfig")


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
      msg: 'Your session is not valid!'
    });
  }
}

module.exports = jwtValidation;
