/* config/mongo-db.js */
const mongoose = require("mongoose");

const mongoDB = () => {
    mongoose
    .connect("mongodb+srv://junho:asdf1234@murakano.nkbn3yu.mongodb.net/Murakano_dev")
    .then(() => console.log("connected to Murakano_dev"))
    .catch((err) => console.log("mongodb connection failed", err));  
}
const userSchema = new mongoose.Schema(
    {
        createdAt: { type: Date, default: Date.now }, //삭제 예정
        updatedAt: { type: Date, default: Date.now }, //삭제 예정
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

const wordSchema = new mongoose.Schema({
    word: { type: String, required: true, unique: true }, //콜렉션 이름과 겹치는데 상관없나..
    awkPron: [{ type: String }], // 어색한 발음
    comPron: [{ type: String, required: true }], // 일반적인 발음
    info: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    suggestedBy: { type: String } // 제안한 사용자의 닉네임
});

// Word 스키마에 인덱스 추가
wordSchema.index({ word: 1 });

const searchSchema = new mongoose.Schema({
    word: { type: String, required: true },
    freq: { type: Number, default: 0 }, // 검색 횟수
    lastSearched: { type: Date, default: Date.now }, // 마지막 검색 시간
    category: { type: String }, // 단어의 카테고리 (선택 사항)
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' } // 검색한 사용자 ID (선택 사항)
});


const requestSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    word: { type: String, required: true },
    awkPron: [{ type: String }],
    comPron: [{ type: String, required: function() { return this.type === 'MOD'; } }], // 조건부 필수
    info: { type: String }, //ref -> info 변경
    type: { type: String, enum: ['ADD', 'MOD'], required: true },
    status: { type: String, enum: ['PEND', 'APP', 'REJ'], default: 'PEND' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date }
});

requestSchema.path('awkPron').validate(function(value) {
    if (this.status === 'APP' && (!value || value.length === 0)) {
        return false;
    }
    return true;
}, 'awkPron is required when status is APP');

const users = mongoose.model('users', userSchema);
const words = mongoose.model('words', wordSchema);
const searches = mongoose.model('searches', searchSchema);
const requests = mongoose.model('requests', requestSchema);

module.exports = {
    mongoDB,
    users,
    words,
    searches,
    requests
};