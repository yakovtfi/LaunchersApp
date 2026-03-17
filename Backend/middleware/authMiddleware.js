import { verifyToken } from '../utils/auth.js';

export const requireAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || '';
        const [type, token] = authHeader;

        if (type !== 'Bearer' || !token) {
            return res.status(401).json({ message: 'Authorization token is missing' });
        }

        const decoded = verifyToken(token);
        req.user = decoded;
        req.userId = decoded.id || decoded._id;
        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

export const requireUserType = (allowedTypes = []) => (req, res, next) => {
    const allowed = Array.isArray(allowedTypes) ? allowedTypes : [allowedTypes];
    if (!allowed.length) return next();

    const userType = req.user?.user_type;
    if (!userType || !allowed.includes(userType)) {
        return res.status(403).json({ message: 'Forbidden: insufficient permissions' });
    }
    return next();
};