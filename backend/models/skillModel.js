import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    skillname: { type: String, required: true, unique: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Skill = mongoose.model("Skill", skillSchema);
export default Skill;
