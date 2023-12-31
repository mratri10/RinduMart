require('dotenv').config()

const {
  DB_HOSTNAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
  DB_DIALECT,
} = process.env
module.exports = {
  "development": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_NAME,
    "host": DB_HOSTNAME,
    "port": DB_PORT,
    "dialect": DB_DIALECT,
  },
  "test": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_NAME,
    "host": DB_HOSTNAME,
    "dialect": 'mysql'
  },
  "production": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_NAME,
    "host": DB_HOSTNAME,
    "dialect": 'mysql'
  }
}
