import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    // TODO: verify the token exists and add the user data to the request object
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: 'Token not provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
        req.user = { username: decoded.username }; // Attach user info to request object
        return next(); // Move to the next middleware
    }
    catch (err) {
        console.error('Failed to verify token:', err);
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};
//# sourceMappingURL=auth.js.map