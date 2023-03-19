import express from "express";
import Experience from "../models/experienceModel.js";
import expressAsyncHandler from "express-async-handler";
import { isAuth, isAdmin } from "../utils.js";

const experienceRouter = express.Router();

experienceRouter.get("/", async (req, res) => {
  const experiences = await Experience.find();
  res.send(experiences);
});

experienceRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newExperience = new Experience({
      slug: "sample-name-" + Date.now(),
      year: "sample name " + Date.now(),
      name: "sample name " + Date.now(),
      company: "sample company",
      description: "sample description",
    });
    const experience = await newExperience.save();
    res.send({ message: "Exprience Created", experience });
  })
);

experienceRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const experienceId = req.params.id;
    const experience = await Experience.findById(experienceId);
    if (experience) {
      experience.slug = req.body.slug;
      experience.year = req.body.year;
      experience.name = req.body.name;
      experience.company = req.body.company;
      experience.description = req.body.description;
      await experience.save();
      res.send({ message: "Experience Updated" });
    } else {
      res.status(404).send({ message: "Experience Not Found" });
    }
  })
);

experienceRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const experience = await Experience.findById(req.params.id);
    if (experience) {
      await experience.remove();
      res.send({ message: "Experience Deleted" });
    } else {
      res.status(404).send({ message: "Experience Not Found" });
    }
  })
);

const PAGE_SIZE = 5;

experienceRouter.get(
  "/admin",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || PAGE_SIZE;

    const experiences = await Experience.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const countExperiences = await Experience.countDocuments();
    res.send({
      experiences,
      countExperiences,
      page,
      pages: Math.ceil(countExperiences / pageSize),
    });
  })
);

experienceRouter.get("/slug/:slug", async (req, res) => {
  const experience = await Experience.findOne({ slug: req.params.slug });
  if (experience) {
    res.send(experience);
  } else {
    res.status(404).send({ message: "Details Not Found" });
  }
});

experienceRouter.get("/:id", async (req, res) => {
  const experience = await Experience.findById(req.params.id);
  if (experience) {
    res.send(experience);
  } else {
    res.status(404).send({ message: "Details Not Found" });
  }
});

export default experienceRouter;
