import jwt from 'jsonwebtoken';


const verifyToken = (req, res, next) => {
  let token = req.header('Authorization');

  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7); 
  }

  if (!token) {
    return res.status(401).json({ message: 'Accès refusé, token manquant' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token invalide' });
  }
};

export default verifyToken;
