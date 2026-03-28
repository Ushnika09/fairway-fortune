import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    let token;

    // 1. Check header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // 2. Extract token
      token = req.headers.authorization.split(" ")[1];

      // 3. Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Attach user to request
      req.user = decoded;

      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token missing",
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, token failed",
    });
  }
};