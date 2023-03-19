import React, { useEffect, useReducer } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./Testimonial.scss";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import axios from "axios";
//import data from "../../data";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, reviews: action.payload, loading: false };
    case "FETCH_SUCCESS_BRAND":
      return { ...state, brands: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function Testimonial() {
  const [{ loading, error, reviews, brands }, dispatch] = useReducer(reducer, {
    reviews: [],
    brands: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/reviews");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/brands");
        dispatch({ type: "FETCH_SUCCESS_BRAND", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Testimonial</title>
      </Helmet>
      <div className="app__testimonial-item">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          reviews.map((review) => (
            <motion.div
              whileInView={{ opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5, type: "tween" }}
              className="app__testimonial-content"
              key={review.slug}
            >
              <img src={review.image} alt={review.name} />

              <h4 className="bold-text" style={{ marginTop: 20 }}>
                {review.name}
              </h4>

              <h5 className="p-text" style={{ marginTop: 10 }}>
                {review.company}
              </h5>
              <p className="p-text">{review.feedback}</p>
            </motion.div>
          ))
        )}
      </div>

      <div className="app__testimonial-brands app__flex">
        {brands.map((brand) => (
          <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, type: "tween" }}
            key={brand.slug}
          >
            <img src={brand.brand_image} alt={brand.name} />
          </motion.div>
        ))}
      </div>
    </>
  );
}

export default AppWrap(
  MotionWrap(Testimonial, "app__testimonial"),
  "testimonial",
  "app__whitebg"
);
