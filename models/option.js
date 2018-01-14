const mongoose = require('mongoose');

const optionSchema = mongoose.Schema({
  text: String
});

module.exports = mongoose.model('Option', optionSchema);
