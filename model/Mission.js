const mongoose = require("mongoose");

const Mission = mongoose.model("Mission", {
  name: String,
  description: String,
  boss: String,
  company: String,
  executor: String,
});

module.exports = Mission;
