const jwt = require("jsonwebtoken");

function authenticationToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  
  if (!authHeader) {
    return res.sendStatus(400);
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(400);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.error("JWT Verification Error:", err);
      if (err.name === "JsonWebTokenError") {
        return res.status(401).json({ error: true, message: "Invalid token" });
      }
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ error: true, message: "Token expired" });
      }
      return res.status(500).json({ error: true, message: "Server error" });
    }
    req.user = user;
    next();
  });
}

module.exports = { authenticationToken };
