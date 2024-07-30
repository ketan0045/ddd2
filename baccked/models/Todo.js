const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("Todo", TodoSchema);
