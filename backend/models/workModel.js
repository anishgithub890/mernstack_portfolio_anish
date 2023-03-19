import mongoose from "mongoose";

const workSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    title: { type: String, required: true, unique: true },
    view: { type: String },
    github: { type: String },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Work = mongoose.model("Work", workSchema);
export default Work;
