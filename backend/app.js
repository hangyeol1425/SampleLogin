require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./src/models/index');
const { authRoutes } = require('./src/routers/index');
const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use('/auth', authRoutes);

sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => {
        console.log('Server is running on http://localhost:3000');
    });
});