const express = require("express");
const { mongoDB } = require("./config/mongo-db");

const app = express();

mongoDB();

app.use(express.json());

// 모델 불러오기
const { User, Word, Search, Request } = require('./config/mongo-db');

// // 예제 라우트
// app.get('/words', async (req, res) => {
//     try {
//         const words = await Word.find();
//         res.json(words);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// app.post('/search', async (req, res) => {
//     const searchWord = req.body.word;
//     const userId = req.body.userId; // 요청 바디에서 userId를 받는다고 가정

//     try {
//         let searchRecord = await Search.findOne({ word: searchWord });

//         if (searchRecord) {
//             // 기존 검색 기록이 있으면 검색 횟수와 마지막 검색 시간 업데이트
//             searchRecord.freq += 1;
//             searchRecord.lastSearched = Date.now();
//         } else {
//             // 새로운 검색 기록 생성
//             searchRecord = new Search({
//                 word: searchWord,
//                 freq: 1,
//                 lastSearched: Date.now(),
//                 userId: userId
//             });
//         }

//         await searchRecord.save();
//         res.status(200).json(searchRecord);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });


// // 요청 승인 라우트
// app.put('/requests/:id/approve', async (req, res) => {
//     try {
//         const request = await Request.findById(req.params.id);
//         if (!request) {
//             return res.status(404).json({ message: "Request not found" });
//         }

//         if (request.status === 'APP') {
//             return res.status(400).json({ message: "Request is already approved" });
//         }

//         if (!request.comPron || !request.awkPron || request.comPron.length === 0 || request.awkPron.length === 0) {
//             return res.status(400).json({ message: "comPron and awkPron are required to approve the request" });
//         }

//         // Word 컬렉션에 데이터 추가
//         const word = new Word({
//             word: request.word,
//             awkPron: request.awkPron,
//             comPron: request.comPron,
//             ref: request.ref
//         });

//         await word.save();

//         // 요청 상태를 승인으로 업데이트
//         request.status = 'APP';
//         await request.save();

//         res.json({ message: "Request approved and word added to collection" });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

//임시 데이터 삽입


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
