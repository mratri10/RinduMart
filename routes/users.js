var express = require('express');
var router = express.Router();

const {
  DB_HOSTNAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
  DB_DIALECT,
} = process.env

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource' + process.env.DB_PORT);
});

module.exports = router;
