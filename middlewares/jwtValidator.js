const jwt = require("jsonwebtoken");

const jwtValidator = async (req, res, next) => {
  const token = req.headers["access-token"];
  const SECRET = process.env.SECRET_KEY_PROD || process.env.SECRET_KEY || 'bebitofiufiu'
  if (token) {
    jwt.verify(token, SECRET, (err) => {
      if (err) {
        res.status(401).json({ msg: "Your token is not valid",err });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({ msg: "Your token is not valid" });
  }
};

module.exports = { jwtValidator };
