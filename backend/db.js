const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mydb', 'root', 'Fjqm1425*', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
});

sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelize;