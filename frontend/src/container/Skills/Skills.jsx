import React, { useEffect, useReducer } from "react";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import { Helmet } from "react-helmet-async";
import "./Skills.scss";
import axios from "axios";
import MessageBox from "../../components/MessageBox";
import LoadingBox from "../../components/LoadingBox";
//import data from "../../data";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, skills: action.payload, loading: false };
    case "FETCH_SUCCESS_EXP":
      return { ...state, experiences: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function Skills() {
  const [{ loading, error, skills, experiences }, dispatch] = useReducer(
    reducer,
    {
      skills: [],
      experiences: [],
      loading: true,
      error: "",
    }
  );
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/skills");
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
        const result = await axios.get("/api/experiences");
        dispatch({ type: "FETCH_SUCCESS_EXP", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Helmet>
        <title>SKILLS</title>
      </Helmet>

      <h2 className="head-text">Skills & Experiences</h2>
      <div className="app__skills-container">
        <motion.div className="app__skills-list">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            skills.map((skill) => (
              <motion.div
                whileInView={{ opacity: [0, 1] }}
                transition={{ duration: 0.5 }}
                className="app__skills-item app__flex"
                key={skill.slug}
              >
                <div className="app__flex">
                  <img src={skill.image} alt={skill.skillname} />
                </div>
                <p className="p-text">{skill.skillname}</p>
              </motion.div>
            ))
          )}
        </motion.div>
        <div className="app__skills-exp">
          <motion.div className="app__skills-list">
            {loading ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              experiences.map((experience) => (
                <motion.div
                  className="app__skills-exp-item"
                  key={experience.year}
                >
                  <div className="app__skills-exp-year">
                    <p className="bold-text">{experience.year}</p>
                  </div>

                  <motion.div
                    whileInView={{ opacity: [0, 1] }}
                    transition={{ duration: 0.5 }}
                    className="app__skills-exp-work"
                    data-tip
                    data-for={experience.name}
                    key={experience.name}
                  >
                    <h4 className="bold-text">{experience.name}</h4>
                    <p className="p-text">{experience.company}</p>
                  </motion.div>
                  <small className="experience-desc">
                    {experience.description}
                  </small>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default AppWrap(
  MotionWrap(Skills, "app__skills"),
  "skills",
  "app__whitebg"
);
