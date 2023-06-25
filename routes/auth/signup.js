const express = require('express');
const Validator = require('fastest-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { User } = require('../../models');

var router = express.Router();

const v = new Validator()
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
        return res.status(400).json(validate)
    }

    const { username, password, pass_confirm } = req.body;

    const isValidUsername = usernameRegex.test(username);
    if (!isValidUsername) {
        return res.json({
            message: 'Username tidak boleh menggunakan spasi'
        })
    }
    const isValidPassword = passwordRegex.test(password);
    if (!isValidPassword) {
        return res.json({
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
        console.error(error);
    }

    const accessToken = jwt.sign({ username: username }, process.env.SECRET_KEY);
    const data = { username, password: hashPasswordSync(password) }
    const userRespon = await User.create(data)
    res.json({ ...userRespon.toJSON(), accessToken });
})


function hashPasswordSync(password) {
    const saltRounds = 10; // Jumlah salt rounds yang digunakan untuk menghasilkan salt
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    // Lakukan sesuatu dengan hashedPassword, seperti menyimpannya di database
    return hashedPassword;
}

module.exports = router;