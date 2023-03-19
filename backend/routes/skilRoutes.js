import express from "express";
import Skill from "../models/skillModel.js";
import expressAsyncHandler from "express-async-handler";
import { isAuth, isAdmin } from "../utils.js";

const skillRouter = express.Router();

skillRouter.get("/", async (req, res) => {
  const skills = await Skill.find();
  res.send(skills);
});

skillRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newSkill = new Skill({
      slug: "sample-name-" + Date.now(),
      skillname: "sample name " + Date.now(),
      image: "/images/html.png",
    });
    const skill = await newSkill.save();
    res.send({ message: "Skill Created", skill });
  })
);

skillRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const skillId = req.params.id;
    const skill = await Skill.findById(skillId);
    if (skill) {
      skill.slug = req.body.slug;
      skill.skillname = req.body.skillname;
      skill.image = req.body.image;
      await skill.save();
      res.send({ message: "Skill Updated" });
    } else {
      res.status(404).send({ message: "Skill Not Found" });
    }
  })
);

skillRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const skill = await Skill.findById(req.params.id);
    if (skill) {
      await skill.remove();
      res.send({ message: "Skill Deleted" });
    } else {
      res.status(404).send({ message: "Skill Not Found" });
    }
  })
);

const PAGE_SIZE = 5;

skillRouter.get(
  "/admin",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || PAGE_SIZE;

    const skills = await Skill.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const countSkills = await Skill.countDocuments();
    res.send({
      skills,
      countSkills,
      page,
      pages: Math.ceil(countSkills / pageSize),
    });
  })
);

skillRouter.get("/slug/:slug", async (req, res) => {
  const skill = await Skill.findOne({ slug: req.params.slug });
  if (skill) {
    res.send(skill);
  } else {
    res.status(404).send({ message: "Details Not Found" });
  }
});
skillRouter.get("/:id", async (req, res) => {
  const skill = await Skill.findById(req.params.id);
  if (skill) {
    res.send(skill);
  } else {
    res.status(404).send({ message: "Details Not Found" });
  }
});

export default skillRouter;
