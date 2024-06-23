const mongoose = require('mongoose');
const { mongoDB, users, words, searches, requests } = require('./config/mongo-db');

// MongoDB 연결 설정
const insertDocuments = async () => {
    await mongoDB();

    try {
        await users.create({
            nickname: "testuser",
            email: "testuser@example.com",
            password: "password",
            role: "user",
            snsId: null,
            provider: null
        });

        await searches.create({
            word: "example",
            freq: 1,
            lastSearched: new Date(),
            category: "test",
            userId: null
        });

        await requests.create({
            userId: "60d5ec49f06fbf46b8e2b6c5", // Example ObjectId, replace with a real one
            word: "example",
            awkPron: ["ex-am-ple"],
            comPron: ["eg-zam-pul"],
            info: "example reference",
            type: "ADD",
            status: "PEND",
            deletedAt: null
        });

        console.log('Documents inserted successfully');
    } catch (err) {
        console.error('Error inserting documents:', err);
    } finally {
        mongoose.connection.close();
    }
};

insertDocuments();
