import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  let token;

  console.log("HEADERS:", req.headers.authorization); // 👈 ADD THIS

  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      console.log("TOKEN:", token); // 👈 ADD THIS

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log("DECODED:", decoded); // 👈 ADD THIS

      req.user = await User.findById(decoded.id).select("-password");

      console.log("USER:", req.user); // 👈 ADD THIS

      return next();
    } catch (error) {
      console.log("ERROR:", error.message); // 👈 ADD THIS
      return res.status(401).json({ message: "Not authorized" });
    }
  }

  return res.status(401).json({ message: "No token" });
};

export default protect;