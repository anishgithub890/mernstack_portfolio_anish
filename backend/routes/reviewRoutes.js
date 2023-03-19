import express from "express";
import Review from "../models/reviewModel.js";
import expressAsyncHandler from "express-async-handler";
import { isAuth, isAdmin } from "../utils.js";

const reviewRouter = express.Router();

reviewRouter.get("/", async (req, res) => {
  const reviews = await Review.find();
  res.send(reviews);
});

reviewRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newReview = new Review({
      slug: "sample-name-" + Date.now(),
      name: "sample name " + Date.now(),
      company: "sample company",
      feedback: "sample feedback",
      image: "/images/about01.png",
    });
    const review = await newReview.save();
    res.send({ message: "Review Created", review });
  })
);

reviewRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const reviewId = req.params.id;
    const review = await Review.findById(reviewId);
    if (review) {
      review.slug = req.body.slug;
      review.name = req.body.name;
      review.company = req.body.company;
      review.feedback = req.body.feedback;
      review.image = req.body.image;
      await review.save();
      res.send({ message: "Review Updated" });
    } else {
      res.status(404).send({ message: "Review Not Found" });
    }
  })
);

reviewRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id);
    if (review) {
      await review.remove();
      res.send({ message: "Review Deleted" });
    } else {
      res.status(404).send({ message: "Review Not Found" });
    }
  })
);

const PAGE_SIZE = 5;

reviewRouter.get(
  "/admin",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || PAGE_SIZE;

    const reviews = await Review.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const countReviews = await Review.countDocuments();
    res.send({
      reviews,
      countReviews,
      page,
      pages: Math.ceil(countReviews / pageSize),
    });
  })
);

reviewRouter.get("/slug/:slug", async (req, res) => {
  const review = await Review.findOne({ slug: req.params.slug });
  if (review) {
    res.send(review);
  } else {
    res.status(404).send({ message: "Details Not Found" });
  }
});

reviewRouter.get("/:id", async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (review) {
    res.send(review);
  } else {
    res.status(404).send({ message: "Details Not Found" });
  }
});

export default reviewRouter;
