import mongoose from "mongoose";

const personSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    age: {
      type: Number,
      required: true,
      min: 0,
    },
    userOrder: {type: Object, default: {}} // creating empty data or empty object (having default object which is now empty)
  },
  {
    timestamps: true,
    minimize: false
  },
);

export const Person = mongoose.model("Person", personSchema);
