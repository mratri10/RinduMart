const jwt = require('jsonwebtoken');
const { User } = require('./models');
// Middleware autentikasi
const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json({
            status: 401,
            message: 'Anda tidak diizinkan'
        });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({
                status: 403,
                message: 'Andak Ditolak'
            });
        }
        req.user = user;
    });

    try {
        const user = await User.findOne({ where: { token: token } });
        if (!user) {
            return res.status(401).json({
                status: 401,
                message: 'Anda tidak diizinkan'
            });
        }
        next();
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error
        })
        console.error(error);
    }
};
module.exports = authenticateToken;