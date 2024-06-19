const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        // TODO : 동작 확인 후 주석 삭제
        // createdAt: { type: Date, default: Date.now },
        // updatedAt: { type: Date, default: Date.now },
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
