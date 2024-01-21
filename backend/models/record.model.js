import { Schema, model } from "mongoose";

const recordSchema = new Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    discription: {
      type: String,
    },
    type: {
      type: String,
      enum: ["income", "outcome"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Record = model("Record", recordSchema);

export default Record;
