import Axios from "axios";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Helmet } from "react-helmet-async";
import { useContext, useEffect, useState } from "react";
import { AppWrap, MotionWrap } from "../../wrapper";
import { toast } from "react-toastify";
import { Store } from "../../Store";
import { getError } from "../../utils";
import "./Contact.scss";
import { images } from "../../constants";

function ContactScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { contactInfo } = state;
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await Axios.post("/api/contacts", {
        name,
        email,
        message,
      });
      ctxDispatch({ type: "USER_CONTACT", payload: data });
      localStorage.setItem("contactInfo", JSON.stringify(data));
      toast.success("Your information submitted successfully");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (contactInfo) {
    }
  }, [contactInfo]);

  return (
    <>
      <Helmet>
        <title>CONTACT</title>
      </Helmet>

      <h2 className="head-text">Take a coffe & Chart with me</h2>
      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt="email" />
          <a href="mailto:anishchaudhary890@gmail.com" className="p-text">
            anishchaudhary890@gmail.com
          </a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="mobile" />
          <a href="tel: +97798456955**" className="p-text">
            +97798456955**
          </a>
        </div>
      </div>
      <Container className="small-container">
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control onChange={(e) => setName(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="message">
            <Form.Label>Message</Form.Label>

            <Form.Control
              as="textarea"
              type="message"
              required
              onChange={(e) => setMessage(e.target.value)}
            />
          </Form.Group>

          <div className="button">
            <Button type="submit">SUBMIT</Button>
          </div>
        </Form>
      </Container>
    </>
  );
}

export default AppWrap(
  MotionWrap(ContactScreen, "app__footer"),
  "contact",
  "app__whitebg"
);
