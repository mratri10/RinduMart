const express = require('express');
const Validator = require('fastest-validator');

const { User, Biodata } = require('../../models');
const getIdUser = require('../util/getIdUser');
var router = express.Router();
const v = new Validator();

router.post('/', async (req, res) => {
    const schema = {
        name: 'string',
        birthday: 'string',
        gender: 'number'
    }
    const validate = v.validate(req.body, schema)
    if (validate.length) {
        return res.status(400).json({
            status: 400,
            message: 'Check Validasi',
            validate
        })
    }
    try {
        const user = await User.findOne({ where: { username: decodedToken.username } });
        req.body.birthday = new Date(req.body.birthday);
        const data = { idUser: user.id, ...req.body }
        const bio = await Biodata.create(data)

        res.json({
            status: 200,
            message: 'Berhasil Diubah',
            respon: {
                idUser: user.id,
                ...bio.toJSON(),
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "error server",
            error
        })
        console.error(error);
    }
})

router.put('', async (req, res) => {
    const user = await getIdUser(req)

    if (user.id) {
        const biodata = await Biodata.findOne({ where: { idUser: user.id } });
        const schema = {
            name: 'string|optional',
            birthday: 'string|optional',
            gender: 'number|optional',
            marriage: 'number|optional',
            religion: 'number|optional',
            education: 'number|optional',
        }
        const validate = v.validate(req.body, schema)
        if (validate.length) {
            return res.status(400).json({
                status: 400,
                message: 'Check Validasi',
                validate
            })
        }
        if (req.body.birthday) {
            req.body.birthday = new Date(req.body.birthday);
        }
        const respon = await biodata.update(req.body)

        res.json({
            status: 200,
            message: 'Berhasil Update Data',
            respon,
        });
    } else {
        res.send(400).json({
            status: 400,
            message: 'Id User tidak ditemukan'
        })
    }
});
router.get('', async (req, res) => {
    const user = await getIdUser(req)
    if (user.id) {
        const biodata = await Biodata.findOne({ where: { idUser: user.id } });
        const respon = await biodata.get(req.body)
        res.json({
            status: 200,
            message: 'Data Berhasil Didapat',
            respon,
        });
    } else {
        res.send(400).json({
            status: 400,
            message: 'Id User tidak ditemukan'
        })
    }
})

module.exports = router;