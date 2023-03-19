import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Store } from "../../Store";
import { getError } from "../../utils";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { Helmet } from "react-helmet-async";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        summary: action.payload,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default function DashboardScreen() {
  const [{ loading, summary, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });
  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/dashboards/summary", {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [userInfo]);

  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <h1 className="dashboard">Dashboard</h1>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <Row>
            <Col md={2} className="dashboard">
              <Card>
                <Card.Body>
                  <Card.Title>
                    {summary.users && summary.users[0]
                      ? summary.users[0].numUsers
                      : 0}
                  </Card.Title>
                  <Card.Text>USERS</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={2} className="dashboard">
              <Card>
                <Card.Body>
                  <Card.Title>
                    {summary.abouts && summary.abouts[0]
                      ? summary.abouts[0].numAbouts
                      : 0}
                  </Card.Title>
                  <Card.Text>ABOUT DATA</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={2} className="dashboard">
              <Card>
                <Card.Body>
                  <Card.Title>
                    {summary.works && summary.works[0]
                      ? summary.works[0].numWorks
                      : 0}
                  </Card.Title>
                  <Card.Text>WORK DATA</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={2} className="dashboard">
              <Card>
                <Card.Body>
                  <Card.Title>
                    {summary.skills && summary.skills[0]
                      ? summary.skills[0].numSkills
                      : 0}
                  </Card.Title>
                  <Card.Text>SKILL DATA</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={2} className="dashboard">
              <Card>
                <Card.Body>
                  <Card.Title>
                    {summary.experiences && summary.experiences[0]
                      ? summary.experiences[0].numExperiences
                      : 0}
                  </Card.Title>
                  <Card.Text>EXPERIENCE DATA</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={2} className="dashboard">
              <Card>
                <Card.Body>
                  <Card.Title>
                    {summary.reviews && summary.reviews[0]
                      ? summary.reviews[0].numReviews
                      : 0}
                  </Card.Title>
                  <Card.Text>REVIEW DATA</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={2} className="dashboard">
              <Card>
                <Card.Body>
                  <Card.Title>
                    {summary.brands && summary.brands[0]
                      ? summary.brands[0].numBrands
                      : 0}
                  </Card.Title>
                  <Card.Text>BRAND DATA</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="dashboard">
              <Card>
                <Card.Body>
                  <Card.Title>
                    {summary.contacts && summary.contacts[0]
                      ? summary.contacts[0].numContacts
                      : 0}
                  </Card.Title>
                  <strong>
                    {" "}
                    <Card.Text>Your Total Contact Data</Card.Text>
                  </strong>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}
