import express from "express";
import Work from "../models/workModel.js";
import expressAsyncHandler from "express-async-handler";
import { isAuth, isAdmin } from "../utils.js";

const workRouter = express.Router();

workRouter.get("/", async (req, res) => {
  const works = await Work.find();
  res.send(works);
});

workRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newWork = new Work({
      slug: "sample-name-" + Date.now(),
      name: "sample name " + Date.now(),
      title: "sample name " + Date.now(),
      view: "sample view",
      github: "sample github",
      image: "/images/about04.png",
    });
    const work = await newWork.save();
    res.send({ message: "Work Created", work });
  })
);

workRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const workId = req.params.id;
    const work = await Work.findById(workId);
    if (work) {
      work.slug = req.body.slug;
      work.name = req.body.name;
      work.title = req.body.title;
      work.view = req.body.view;
      work.github = req.body.github;
      work.image = req.body.image;
      await work.save();
      res.send({ message: "Work Updated" });
    } else {
      res.status(404).send({ message: "Work Not Found" });
    }
  })
);

workRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const work = await Work.findById(req.params.id);
    if (work) {
      await work.remove();
      res.send({ message: "Work Deleted" });
    } else {
      res.status(404).send({ message: "Work Not Found" });
    }
  })
);

const PAGE_SIZE = 6;

workRouter.get(
  "/admin",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || PAGE_SIZE;

    const works = await Work.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const countWorks = await Work.countDocuments();
    res.send({
      works,
      countWorks,
      page,
      pages: Math.ceil(countWorks / pageSize),
    });
  })
);

workRouter.get("/slug/:slug", async (req, res) => {
  const work = await Work.findOne({ slug: req.params.slug });
  if (work) {
    res.send(work);
  } else {
    res.status(404).send({ message: "Details Not anish Found" });
  }
});

workRouter.get("/:id", async (req, res) => {
  const work = await Work.findById(req.params.id);
  if (work) {
    res.send(work);
  } else {
    res.status(404).send({ message: "Details Not jhavd Found" });
  }
});

export default workRouter;
