import { Schema, model } from "mongoose";

const counterSchema = new Schema({
  name: { type: String, required: true, unique: true },
  value: { type: Number, default: 0 },
});

export const Counter = model("Counter", counterSchema);

export async function getNextArticleId(): Promise<number> {
  const counter = await Counter.findOneAndUpdate(
    { name: "articleId" },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );

  return counter.value;
}
