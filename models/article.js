const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const articleSchema = new Schema({
  title: { type: String, require:true, unique:true },
  description:{type: String},
  state: { type: String, value: ["draft", "published"], default:"draft" },
  read_count:{type: Number},
  reading_time:{type: String},
  body:{type: String, requred:true},
  drafted_timestamp:{type: String},
  published_timestamp:{type: String},
});


module.exports = mongoose.model("articles", articleSchema);