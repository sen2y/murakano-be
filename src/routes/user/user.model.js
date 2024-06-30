const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        deletedAt: { type: Date, default: null },
        nickname: { type: String, required: true, unique: true, maxlength: 10, match: /^[a-zA-Z0-9가-힣]+$/ },
        email: {
            type: String,
            required: true,
            unique: true,
            maxlength: 50,
            match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        },
        password: { type: String, minLength: 8, maxLength: 20 },
        role: { type: String, default: 'user' },
        snsId: { type: String, default: null },
        provider: { type: String, default: null },
        recentSearches: [
            {
                searchTerm: { type: String, required: true },
                updatedAt: { type: Date, default: Date.now },
                deletedAt: { type: Date, default: null },
            },
        ],
    },
    {
        timestamps: { currentTime: () => Date.now() },
    }
);

userSchema.pre('save', async function (next) {
    try {
        if ((this.isNew && !this.provider) || this.isModified('password')) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
    } catch (err) {
        console.log(err);
    }
    next();
});

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
