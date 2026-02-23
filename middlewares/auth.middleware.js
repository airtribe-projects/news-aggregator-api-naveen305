const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                status: false,
                message: 'Authorization required'
            })
        }

        const token = authHeader.split(' ')[1];

        if (!process.env.JWT_SECRET) {
            throw new Error('JWT secret not configured');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded;

        next()


    } catch (err) {
        return res.status(401).json({
            status: false,
            message: 'Invalid or Expired token'
        })
    }
}

module.exports = authenticate