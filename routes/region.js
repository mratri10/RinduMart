var express = require('express');
const Validator = require('fastest-validator');
const { Region } = require('../models');
const { Op, Sequelize } = require('sequelize')

var router = express.Router();
const v = new Validator()

const query = 'SELECT * FROM region WHERE LENGTH(kode) = 2'
router.get('/', async (req, res) => {
    const region = await Region.findAll({
        where: Sequelize.where(Sequelize.fn('LENGTH', Sequelize.col('id')), 2)
    })
    res.json(region)
})

router.get('/:prov/', async (req, res) => {
    const idProv = req.params.prov

    const region = await Region.findAll({
        where: {
            [Op.and]: [
                Sequelize.where(Sequelize.fn('LENGTH', Sequelize.col('id')), 5),
                { id: { [Op.like]: `${idProv}%` } }
            ]
        }
    })
    res.json(region)
})

router.get('/:prov/:city', async (req, res) => {
    const idProv = req.params.prov
    const idCity = req.params.city

    const region = await Region.findAll({
        where: {
            [Op.and]: [
                Sequelize.where(Sequelize.fn('LENGTH', Sequelize.col('id')), 8),
                { id: { [Op.like]: `${idProv}.${idCity}%` } }
            ]
        }
    })
    res.json(region)
})

router.get('/:prov/:city/:dist', async (req, res) => {
    const idProv = req.params.prov
    const idCity = req.params.city
    const idDist = req.params.dist

    const region = await Region.findAll({
        where: {
            [Op.and]: [
                Sequelize.where(Sequelize.fn('LENGTH', Sequelize.col('id')), 13),
                { id: { [Op.like]: `${idProv}.${idCity}.${idDist}%` } }
            ]
        }
    })
    res.json(region)
})

module.exports = router;