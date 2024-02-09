import jwt from "jsonwebtoken";
const { VITE_SECRET } = process.env;

export const isAuthenticated = (req, res, next) => {
  const headerToken = req.get("Authorization");

  if (!headerToken) {
    console.log("ERROR IN auth middleware");
    res.sendStatus(401);
  }

  let token;

  try {
    token = jwt.verify(headerToken, VITE_SECRET);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }

  if (!token) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }

  next();
};