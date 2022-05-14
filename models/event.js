const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "please add an event title"],
      minlength: [3, "too short"],
      maxlength: [100, "Too Long"],
      unique: true,
    },
    description: {
      type: String,
      trim: true,
      required: [true, "please add  event description"],
      minlength: [3, "too short"],
      maxlength: [100, "Too Long"],
    },
    price: {
      type: Number,
      required: [true, "please add  event price"],
    },
    date: {
      type: Date,
      required: [true, "please add  event date"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Eevent", eventSchema);
