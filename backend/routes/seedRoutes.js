import express from "express";
import About from "../models/aboutModel.js";
import data from "../data.js";
import Work from "../models/workModel.js";
import Skill from "../models/skillModel.js";
import Experience from "../models/experienceModel.js";
import Review from "../models/reviewModel.js";
import User from "../models/userModel.js";
import Contact from "../models/contactModel.js";

const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
  await About.remove({});
  const createAbouts = await About.insertMany(data.abouts);
  await Work.remove({});
  const createWorks = await Work.insertMany(data.works);
  await Skill.remove({});
  const createSkills = await Skill.insertMany(data.skills);
  await Experience.remove({});
  const createExperience = await Experience.insertMany(data.experiences);
  await Review.remove({});
  const createReview = await Review.insertMany(data.reviews);
  await User.remove({});
  const createUser = await User.insertMany(data.users);
  await Contact.remove({});
  const createContact = await Contact.insertMany(data.contacts);
  res.send({
    createAbouts,
    createWorks,
    createSkills,
    createExperience,
    createReview,
    createUser,
    createContact,
  });
});

export default seedRouter;
