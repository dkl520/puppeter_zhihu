var mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userschame = new Schema({
    novelName: String,
    chapter: String,
    content: String
});
let Model = mongoose.model("user", userschame, "user");
// 这里的第一个user,,,表示user的模型名字，第二个user 指的是数据库文档 Collection的名字
module.exports=Model;

