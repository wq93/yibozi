const mongoose = require('mongoose');
const {config} = require('.')
const db = mongoose.connection;
const uri = `mongodb+srv://${config.MongoDB.username}:${config.MongoDB.password}@cluster0-w5bwk.mongodb.net`;
const database = config.MongoDB.database;

mongoose.connect(`${uri}/${database}`, {useNewUrlParser: true})
db.on("connected", () => console.log("MongoDB connected success.")) // 连接成功操作
db.on("error", () => console.log("MongoDB connected fail.")) // 连接失败操作
db.on("disconnected", () => console.log("MongoDB connected disconnected.")) // 连接断开操作