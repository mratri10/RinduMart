const express = require('express');
const Validator = require('fastest-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { User } = require('../../models');
var router = express.Router();
const v = new Validator();

// Middleware autentikasi
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};

router.post('/', async (req, res) => {
    const usernameRegex = /^[^\s]+$/;
    const passwordRegex = /^(?=.*[@$!%*?&])[^\s]+$/;

    const schema = {
        username: 'string',
        password: {
            type: 'string',
            min: 6
        },
        pass_confirm: 'string'
    }

    const validate = v.validate(req.body, schema)
    if (validate.length) {
        return res.status(400).json({
            status: 400,
            message: 'Check Validasi',
            validate
        })
    }

    const { username, password, pass_confirm } = req.body;

    const isValidUsername = usernameRegex.test(username);
    if (!isValidUsername) {
        return res.status(400).json({
            status: 400,
            message: 'Username tidak boleh menggunakan spasi'
        })
    }
    const isValidPassword = passwordRegex.test(password);
    if (!isValidPassword) {
        return res.status(400).json({
            status: 400,
            message: 'Tambahkan karakter ini [@$!%*?&] untuk memperkuat password anda'
        })
    }

    if (password != pass_confirm) {
        return res.json({
            message: 'Password Confirm tidak sama'
        })
    }
    try {
        const user = await User.findOne({ where: { username: username } });
        // || !bcrypt.compareSync(password, user.password)
        if (user) {
            return res.json({ message: 'Username sudah terdaftar' });
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error
        })
        console.error(error);
    }

    const accessToken = jwt.sign({ username: username }, process.env.SECRET_KEY);
    const data = { username, password: hashPasswordSync(password) }
    const userRespon = await User.create(data)
    res.json({ ...userRespon.toJSON(), accessToken });
})

router.put('/updated-password', authenticateToken, async (req, res) => {
    const passwordRegex = /^(?=.*[@$!%*?&])[^\s]+$/;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const decodedToken = jwt.decode(token);

    const schema = {
        password: {
            type: 'string',
            min: 6
        },
        pass_confirm: 'string'
    }

    const validate = v.validate(req.body, schema)
    if (validate.length) {
        return res.status(400).json({
            status: 400,
            message: 'Check Validasi',
            validate
        })
    }

    const { password, pass_confirm } = req.body;

    const isValidPassword = passwordRegex.test(password);
    if (!isValidPassword) {
        return res.status(400).json({
            status: 400,
            message: 'Tambahkan karakter ini [@$!%*?&] untuk memperkuat password anda'
        })
    }

    if (password != pass_confirm) {
        return res.status(400).json({
            status: 400,
            message: 'Password Confirm tidak sama'
        })
    }
    try {
        const user = await User.findOne({ where: { username: decodedToken.username } });
        const data = { username: user.username, password: hashPasswordSync(password) }
        const userPut = await user.update(data)
        res.json({ status: 200, message: 'Berhasil Diubah', respon: userPut });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error
        })
        console.error(error);
    }
})


function hashPasswordSync(password) {
    const saltRounds = 10; // Jumlah salt rounds yang digunakan untuk menghasilkan salt
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    // Lakukan sesuatu dengan hashedPassword, seperti menyimpannya di database
    return hashedPassword;
}



module.exports = router;