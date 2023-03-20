import axios from "axios";
import React, { useEffect, useReducer } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import { useParams } from "react-router-dom";
//import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./AboutScreen.scss";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { getError } from "../../utils";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, about: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function AboutScreen() {
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, about }, dispatch] = useReducer(reducer, {
    about: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/api/abouts/slug/${slug}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Row>
        <Col md={3}>
          <img className="img-large" src={about.image} alt={about.title}></img>
        </Col>
        <Col md={9}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{about.title}</title>
              </Helmet>
              <h1>{about.title}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>{about.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
}

export default AppWrap(
  MotionWrap(AboutScreen, "app__about"),
  "about",
  "app__whitebg"
);
