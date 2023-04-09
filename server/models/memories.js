const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memorySchema = new Schema(
  {
    title: {
      type: String,
      maxlength: 50,
      required: true,
    },
    description: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

const Memory = mongoose.model("memory", memorySchema);
module.exports = Memory;
