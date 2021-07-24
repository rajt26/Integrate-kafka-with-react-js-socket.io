const jwt = require("jsonwebtoken");

// for verify jwt token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Access Denied" });
  }

  try {
    const verifiedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = verifiedToken;
    next();
  } catch (error) {
    return res.status(400).json({ error: "Token is not valid" });
  }
};
module.exports = verifyToken;
