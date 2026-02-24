// Middleware to verify JWT token from cookies
// This middleware protects private routes
// If token is valid → user data is attached to req.user
// If token is missing or invalid → access is denied

const jwt = require("jsonwebtoken");

function userIdentify(req, res, next) {

  // 1. Extract token from cookies
  const token = req.cookies.token;

  // 2️. If token is not present → user is not authenticated
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized - Token not found",
    });
  }

  let decoded =null;

  try {
    // 3. Verify token using secret key
     decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attach decoded payload to request object
    // This allows access to user data in next controllers
    req.user = decoded;

    // 5. Proceed to next middleware/controller
    next();

  } catch (error) {
    // 6. If token is invalid or expired
    return res.status(403).json({
      message: "Unauthorized - Invalid or expired token",
    });
  }
}

module.exports = { userIdentify };