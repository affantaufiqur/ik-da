import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  try {
    const bearer = req.headers.authorization;
    if (!bearer) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = bearer.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    return jwt.verify(token, "secret", (err, data) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.user = data.user;
      next();
    });
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
