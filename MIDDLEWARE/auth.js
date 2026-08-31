const jwt = require("jsonwebtoken");
const Auth = require("../MODEL/auth"); // CHANGE PATH IF YOUR AUTH MODEL FILE IS DIFFERENT

const JWT_CONFIG = process.env.JWT_CONFIG;

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "No token provided. Please login first",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_CONFIG);

    const user = await Auth.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      message: "Invalid token or expired",
    });
  }
};

const admin = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Admin access required!",
    });
  }

  next();
};

module.exports = { protect, admin };