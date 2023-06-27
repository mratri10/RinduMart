const jwt = require('jsonwebtoken');
const { User } = require('../../models');
const getIdUser = (req) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const decodedToken = jwt.decode(token);
    const user = User.findOne({ where: { username: decodedToken.username } });
    return user
}
module.exports = getIdUser;