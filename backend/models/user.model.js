import { Schema, model } from "mongoose";
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
  transactions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Record",
    },
  ],
});

const User = model("User", userSchema);

export default User;