// utils.js

const parseExpiry = (expiryString) => {
    const match = expiryString.match(/^(\d+)([smhdw])$/);
    if (!match) {
        throw new Error('Invalid expiry format');
    }

    const value = parseInt(match[1], 10);
    const unit = match[2];

    switch (unit) {
        case 's':
            return value * 1000; // seconds to milliseconds
        case 'm':
            return value * 60 * 1000; // minutes to milliseconds
        case 'h':
            return value * 60 * 60 * 1000; // hours to milliseconds
        case 'd':
            return value * 24 * 60 * 60 * 1000; // days to milliseconds
        case 'w':
            return value * 7 * 24 * 60 * 60 * 1000; // weeks to milliseconds
        default:
            throw new Error('Invalid time unit');
    }
};

module.exports = { parseExpiry };