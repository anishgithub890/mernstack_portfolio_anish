import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    brand_image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Brand = mongoose.model("Brand", brandSchema);
export default Brand;
