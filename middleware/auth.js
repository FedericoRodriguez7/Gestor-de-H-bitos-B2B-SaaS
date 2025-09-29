import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Acceso denegado" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // { id, rol }
    next();
  } catch (error) {
    res.status(400).json({ error: "Token inválido" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.rol !== "admin") return res.status(403).json({ error: "Solo admins pueden hacer esto" });
  next();
};
