const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        deletedAt: { type: Date, default: null },
        nickname: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String },
        role: { type: String, default: 'user' },
        snsId: { type: String, default: null },
        provider: { type: String, default: null },
    },
    {
        timestamps: { currentTime: () => Date.now() },
    }
);

const model = mongoose.model('User', userSchema);

module.exports = model;
