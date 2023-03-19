import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    year: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    company: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Experience = mongoose.model("Experience", experienceSchema);
export default Experience;
