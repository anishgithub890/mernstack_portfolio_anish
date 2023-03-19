import express from "express";
import About from "../models/aboutModel.js";
import expressAsyncHandler from "express-async-handler";
import { isAuth, isAdmin } from "../utils.js";

const aboutRouter = express.Router();

aboutRouter.get("/", async (req, res) => {
  const abouts = await About.find();
  res.send(abouts);
});

aboutRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newAbout = new About({
      slug: "sample-name-" + Date.now(),
      title: "sample name " + Date.now(),
      description: "sample description",
      image: "/images/about01.png",
    });
    const about = await newAbout.save();
    res.send({ message: "About Created", about });
  })
);

aboutRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const aboutId = req.params.id;
    const about = await About.findById(aboutId);
    if (about) {
      about.slug = req.body.slug;
      about.title = req.body.title;
      about.description = req.body.description;
      about.image = req.body.image;
      await about.save();
      res.send({ message: "About Updated" });
    } else {
      res.status(404).send({ message: "About Not Found" });
    }
  })
);

aboutRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const about = await About.findById(req.params.id);
    if (about) {
      await about.remove();
      res.send({ message: "About Deleted" });
    } else {
      res.status(404).send({ message: "About Not Found" });
    }
  })
);

const PAGE_SIZE = 5;

aboutRouter.get(
  "/admin",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || PAGE_SIZE;

    const abouts = await About.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const countAbouts = await About.countDocuments();
    res.send({
      abouts,
      countAbouts,
      page,
      pages: Math.ceil(countAbouts / pageSize),
    });
  })
);

aboutRouter.get("/slug/:slug", async (req, res) => {
  const about = await About.findOne({ slug: req.params.slug });
  if (about) {
    res.send(about);
  } else {
    res.status(404).send({ message: "Details Not Found" });
  }
});

aboutRouter.get("/:id", async (req, res) => {
  const about = await About.findById(req.params.id);
  if (about) {
    res.send(about);
  } else {
    res.status(404).send({ message: "Details Not Found" });
  }
});

export default aboutRouter;
