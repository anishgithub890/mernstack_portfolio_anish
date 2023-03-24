import React, { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './About.scss';
import { motion } from 'framer-motion';
import { AppWrap, MotionWrap } from '../../wrapper';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
//import data from "../../data";

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, abouts: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function About() {
  const [{ loading, error, abouts }, dispatch] = useReducer(reducer, {
    abouts: [],
    loading: true,
    error: '',
  });

  //const [abouts, setAbouts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/abouts');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }

      // setAbouts(result.data);
    };
    fetchData();
  }, []);
  return (
    <>
      <Helmet>
        <title>ABOUT</title>
      </Helmet>
      <h2 className="head-text">
        I Know that <span>Good Design</span> means <br />
        <span>Good Business</span>
      </h2>
      <div className="app__profiles">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          abouts.map((about) => (
            <motion.div
              whileInView={{ opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5, type: 'tween' }}
              className="app__profile-item"
              key={about.slug}
            >
              <Link to={`/about/${about.slug}`}>
                <img src={about.image} alt={about.title} />
              </Link>
              <Link to={`/about/${about.slug}`}>
                <h2 className="bold-text" style={{ marginTop: 20 }}>
                  {about.title}
                </h2>
              </Link>
              <Link to={`/about/${about.slug}`}>
                <h4 className="p-text" style={{ marginTop: 10 }}>
                  {about.description.substring(0, 100)}{' '}
                  <strong>...readmore</strong>
                </h4>
              </Link>
            </motion.div>
          ))
        )}
      </div>
    </>
  );
}

export default AppWrap(
  MotionWrap(About, 'app__about'),
  'about',
  'app__whitebg'
);
