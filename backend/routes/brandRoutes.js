import express from "express";
import Brand from "../models/brandModel.js";

const brandRouter = express.Router();

brandRouter.get("/", async (req, res) => {
  const brands = await Brand.find();
  res.send(brands);
});

brandRouter.get("/slug/:slug", async (req, res) => {
  const brand = await Brand.find({ slug: req.params.slug });
  if (brand) {
    res.send(brand);
  } else {
    res.status(404).send({ message: "Details Not Found" });
  }
});

brandRouter.get("/:id", async (req, res) => {
  const brand = await Brand.find(req.params.id);
  if (brand) {
    res.send(brand);
  } else {
    res.status(404).send({ message: "Details Not Found" });
  }
});

export default brandRouter;
