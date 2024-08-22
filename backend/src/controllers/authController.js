require('dotenv').config();
const { User, RefreshToken } = require('../models/index.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { parseExpiry } = require('../utils.js');

const secretKey = process.env.SECRET_KEY;

const createRefreshToken = async (userId) => {
    const token = uuidv4();
    const expiryDuration = parseExpiry(process.env.REFRESH_TOKEN_EXPIRY || '7d');
    const expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + expiryDuration);

    const formattedExpiryDate = expiryDate.toISOString();

    const refreshToken = await RefreshToken.create({
        token,
        userId,
        expiryDate: formattedExpiryDate,
    });

    return refreshToken.token;
};

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const findUser = await User.findOne({ where: { email } })

        if(findUser) {
            console.log('여기에 걸려야하는데 왜 걸리냐 ㅅㅂ')
            res.status(409).json({error : "User with this email already exists."});
        }

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const accesstoken = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });

        // Refresh Token 생성
        const refreshToken = await createRefreshToken(user.id);

        res.json({ accesstoken, refreshToken });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.logout = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        
        console.log(refreshToken);

        await RefreshToken.destroy({ where: { token: refreshToken } });

        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, secretKey);

        const user = await User.findByPk(decoded.userId);

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.refreshToken = async (req, res) => {
    const { refreshToken: requestToken } = req.body;

    if (!requestToken) {
        return res.status(403).json({ error: 'Refresh Token is required' });
    }

    try {
        const refreshToken = await RefreshToken.findOne({ where: { token: requestToken } });

        if (!refreshToken) {
            return res.status(403).json({ error: 'Refresh Token not found' });
        }

        if (new Date() > refreshToken.expiryDate) {
            await RefreshToken.destroy({ where: { id: refreshToken.id } });
            return res.status(403).json({ error: 'Refresh Token expired. Please log in again.' });
        }

        const newAccessToken = jwt.sign({ userId: refreshToken.userId }, secretKey, { expiresIn: '1h' });

        res.json({ token: newAccessToken, refreshToken: refreshToken.token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
