const express = require('express');
const Validator = require('fastest-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { User } = require('../../models');
var router = express.Router();
const v = new Validator();

router.post('/', async (req, res) => {
    const schema = {
        username: 'string',
        password: {
            type: 'string',
            min: 6
        },
    }
    const validate = v.validate(req.body, schema)
    if (validate.length) {
        return res.status(400).json({
            status: 400,
            message: 'Check Validasi',
            validate
        })
    }
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username: username } });

        if (!user) {
            return res.status(401).json({
                status: 401,
                message: 'Username tidak ditemukan'
            });
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({
                status: 401,
                message: 'Password anda masukan salah',
            });
        }

        const accessToken = jwt.sign({ username: username }, process.env.SECRET_KEY);
        res.json({
            status: 200,
            message: 'Berhasil Login',
            respon: { ...user.toJSON(), token: accessToken }
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error
        })
        console.error(error);
    }
})

module.exports = router;