import express from "express";
import Contact from "../models/contactModel.js";
import expressAsyncHandler from "express-async-handler";
import { isAuth, isAdmin } from "../utils.js";

const contactRouter = express.Router();

contactRouter.get("/", async (req, res) => {
  const contacts = await Contact.find();
  res.send(contacts);
});

contactRouter.post("/", async (req, res) => {
  const newContact = new Contact({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  });
  const contact = await newContact.save();
  res.send({ message: "Contact Created", contact });
});

contactRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (contact) {
      await contact.remove();
      res.send({ message: "Contact Deleted" });
    } else {
      res.status(404).send({ message: "Contact Not Found" });
    }
  })
);

const PAGE_SIZE = 5;

contactRouter.get(
  "/admin",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || PAGE_SIZE;

    const contacts = await Contact.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const countContacts = await Contact.countDocuments();
    res.send({
      contacts,
      countContacts,
      page,
      pages: Math.ceil(countContacts / pageSize),
    });
  })
);

contactRouter.get(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (contact) {
      res.send(contact);
    } else {
      res.status(404).send({ message: "Contact Not Found" });
    }
  })
);

export default contactRouter;
