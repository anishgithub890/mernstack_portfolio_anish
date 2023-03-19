import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    company: { type: String, required: true },
    feedback: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);
export default Review;
