import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const About = mongoose.model("About", aboutSchema);
export default About;
