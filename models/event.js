const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "please add an event title"],
      minlength: [3, "too short"],
      maxlength: [100, "Too Long"],
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
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
