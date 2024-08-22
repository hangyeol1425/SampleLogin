require('dotenv').config();
const { Sequelize } = require('sequelize');

const database = process.env.DATABASE
const host = process.env.DATABASE_HOST
const user = process.env.DATABASE_USER
const password = process.env.DATABASE_PASSWORD
const dialect = process.env.DATABASE_DIALECT
const port = process.env.DATABASE_PORT

const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: dialect,
    port: port,
});

sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelize;