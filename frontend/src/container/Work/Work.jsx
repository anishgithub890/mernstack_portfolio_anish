import React, { useEffect, useReducer, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
//import data from "../../data";
import "./Work.scss";
import axios from "axios";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, works: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function Work() {
  const [{ loading, error, works }, dispatch] = useReducer(reducer, {
    works: [],
    loading: true,
    error: "",
  });
  const [animateCard] = useState({ y: 0, opacity: 1 });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/works");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }

      // setAbouts(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <>
        <Helmet>
          <title>WORK</title>
        </Helmet>

        <h2 className="head-text">
          My Creative <span>Portfolio</span> Section
        </h2>
        <motion.div
          animate={animateCard}
          transition={{ duration: 0.5, delayChildren: 0.5 }}
          className="app__work-portfolio"
        >
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            works.map((work) => (
              <div key={work.slug} className="app__work-item app__flex">
                <div className="app__work-img app__flex">
                  <img src={work.image} alt={work.slug} />

                  <motion.div
                    whileHover={{ opacity: [0, 1] }}
                    transition={{
                      duration: 0.25,
                      ease: "easeInOut",
                      staggerChildren: 0.5,
                    }}
                    className="app__work-hover app__flex"
                  >
                    <a href={work.view} target="_blank" rel="noreferrer">
                      <motion.div
                        whileInView={{ scale: [0, 1] }}
                        whileHover={{ scale: [1, 0.9] }}
                        transition={{ duration: 0.25 }}
                        className="app__flex"
                      >
                        <AiFillEye />
                      </motion.div>
                    </a>
                    <a
                      key={work.slug}
                      href={work.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <motion.div
                        whileInView={{ scale: [0, 1] }}
                        whileHover={{ scale: [1, 0.9] }}
                        transition={{ duration: 0.25 }}
                        className="app__flex"
                      >
                        <AiFillGithub />
                      </motion.div>
                    </a>
                  </motion.div>
                </div>
                <div className="app__work-content app__flex">
                  <div className="app__work-tag app__flex">
                    <p className="bold-text">{work.name}</p>
                  </div>
                  <h4 className="p-text">{work.title}</h4>
                </div>
              </div>
            ))
          )}
        </motion.div>
      </>
    </div>
  );
}
export default AppWrap(MotionWrap(Work, "app__works"), "work", "app__whitebg");
