import jwt from "jsonwebtoken";

//* check if the token is valid or not
const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader.split(" ")[1];
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KAY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: "Token is not valid" });
  }
};

export { auth };
