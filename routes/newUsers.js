var express = require('express');
const Validator = require('fastest-validator');
const { User } = require('../models')

var router = express.Router();

const v = new Validator()
router.post('/', async (req, res) => {
    const schema = {
        name: 'string',
        age: 'number',
        address: 'string|optional'
    }

    const validate = v.validate(req.body, schema)

    if (validate.length) {
        return res.status(400).json(validate)
    }

    const user = await User.create(req.body)
    res.json(user)
})

router.put('/:id', async (req, res) => {
    const id = req.params.id

    const user = await User.findByPk(id)

    if (!user) {
        return res.json({ message: 'User Not Found' })
    }

    const schema = {
        name: 'string|optional',
        age: 'number|optional',
        address: 'string|optional'
    }
    const validate = v.validate(req.body, schema)

    if (validate.length) {
        return res
            .status(400)
            .json(validate)
    }
    const userPut = await user.update(req.body)
    res.json(userPut)
})

router.get('/', async (req, res) => {
    const user = await User.findAll()
    res.json(user)
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const user = await User.findByPk(id)
    if (!user) {
        return res.json({ message: 'User Not Found' })
    }
    res.json(user)
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const user = await User.findByPk(id)
    if (!user) {
        return res.json({ message: 'User Not Found' })
    }
    await user.destroy(user)
    res.json({
        message: 'User Terhapus'
    })
})


module.exports = router