import express from "express";
import expressAsyncHandler from "express-async-handler";
import Dashboard from "../models/dashboardModel.js";
import User from "../models/userModel.js";
import About from "../models/aboutModel.js";
import Work from "../models/workModel.js";
import Skill from "../models/skillModel.js";
import Experience from "../models/experienceModel.js";
import Review from "../models/reviewModel.js";
import Brand from "../models/brandModel.js";
import Contact from "../models/contactModel.js";
import { isAuth, isAdmin } from "../utils.js";

const dashboardRouter = express.Router();

dashboardRouter.get(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const dashbords = await Dashboard.find().populate("user", "name");
    res.send(dashbords);
  })
);

dashboardRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const newDashboard = new Dashboard({
      user: req.user._id,
      about: req.about._id,
      work: req.work._id,
      skill: req.skill._id,
      review: req.review._id,
      experience: req.experience._id,
      brand: req.brand._id,
      contact: req.contact._id,
    });

    const dashbord = await newDashboard.save();
    res.status(201).send({ message: "New Data Created", dashbord });
  })
);

dashboardRouter.get(
  "/summary",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.aggregate([
      {
        $group: {
          _id: null,
          numUsers: { $sum: 1 },
        },
      },
    ]);
    const abouts = await About.aggregate([
      {
        $group: {
          _id: null,
          numAbouts: { $sum: 1 },
        },
      },
    ]);
    const works = await Work.aggregate([
      {
        $group: {
          _id: null,
          numWorks: { $sum: 1 },
        },
      },
    ]);
    const skills = await Skill.aggregate([
      {
        $group: {
          _id: null,
          numSkills: { $sum: 1 },
        },
      },
    ]);
    const experiences = await Experience.aggregate([
      {
        $group: {
          _id: null,
          numExperiences: { $sum: 1 },
        },
      },
    ]);
    const reviews = await Review.aggregate([
      {
        $group: {
          _id: null,
          numReviews: { $sum: 1 },
        },
      },
    ]);
    const brands = await Brand.aggregate([
      {
        $group: {
          _id: null,
          numBrands: { $sum: 1 },
        },
      },
    ]);

    const contacts = await Contact.aggregate([
      {
        $group: {
          _id: null,
          numContacts: { $sum: 1 },
        },
      },
    ]);

    res.send({
      users,
      abouts,
      works,
      skills,
      experiences,
      reviews,
      brands,
      contacts,
    });
  })
);

export default dashboardRouter;
