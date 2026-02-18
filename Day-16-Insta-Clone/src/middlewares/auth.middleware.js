const jwt = require("jsonwebtoken");
async function userIdentify(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  // If token exist
  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    res.status(401).json({ message: "Unauthorized Access" });
  }

  req.user = decoded;
  next();
}

module.exports = userIdentify;
