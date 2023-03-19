import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { Store } from "../../Store";
import { getError } from "../../utils";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
//import "./AboutListScreen.scss";
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        experiences: action.payload.experiences,
        page: action.payload.page,
        pages: action.payload.pages,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "CREATE_REQUEST":
      return { ...state, loadingCreate: true };
    case "CREATE_SUCCESS":
      return {
        ...state,
        loadingCreate: false,
      };
    case "CREATE_FAIL":
      return { ...state, loadingCreate: false };

    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true, successDelete: false };
    case "DELETE_SUCCESS":
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false, successDelete: false };

    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};

export default function ExperienceListScreen() {
  const [
    {
      loading,
      error,
      experiences,
      pages,
      loadingCreate,
      loadingDelete,
      successDelete,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const page = sp.get("page") || 1;

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/experiences/admin?page=${page} `,
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );

        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {}
    };

    if (successDelete) {
      dispatch({ type: "DELETE_RESET" });
    } else {
      fetchData();
    }
  }, [page, userInfo, successDelete]);

  const createHandler = async () => {
    if (window.confirm("Are you sure to create?")) {
      try {
        dispatch({ type: "CREATE_REQUEST" });
        const { data } = await axios.post(
          "/api/experiences",
          {},
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        toast.success("experience created successfully");
        dispatch({ type: "CREATE_SUCCESS" });
        navigate(`/admin/experience/${data.experience._id}`);
      } catch (err) {
        toast.error(getError(error));
        dispatch({
          type: "CREATE_FAIL",
        });
      }
    }
  };

  const deleteHandler = async (experience) => {
    if (window.confirm("Are you sure to delete?")) {
      try {
        await axios.delete(`/api/experiences/${experience._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        toast.success("experience deleted successfully");
        dispatch({ type: "DELETE_SUCCESS" });
      } catch (err) {
        toast.error(getError(error));
        dispatch({
          type: "DELETE_FAIL",
        });
      }
    }
  };

  return (
    <div>
      <Row>
        <Col>
          <h1>Experiences</h1>
        </Col>
        <Col className="col text-end">
          <div>
            <Button className="mt-0" type="button" onClick={createHandler}>
              Create Experiences
            </Button>
          </div>
        </Col>
      </Row>

      {loadingCreate && <LoadingBox></LoadingBox>}
      {loadingDelete && <LoadingBox></LoadingBox>}

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>YEAR</th>
                <th>NAME</th>
                <th>COMPANY</th>
                <th>DESCRIPTION</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {experiences.map((experience) => (
                <tr key={experience._id}>
                  <td>{experience._id}</td>
                  <td>{experience.year}</td>
                  <td>{experience.name}</td>
                  <td>{experience.company}</td>
                  <td>{experience.description}</td>
                  <td>
                    <Button
                      size="sm"
                      type="button"
                      onClick={() =>
                        navigate(`/admin/experience/${experience._id}`)
                      }
                    >
                      <BiEdit />
                    </Button>
                    &nbsp;
                    <Button
                      size="sm"
                      type="button"
                      onClick={() => deleteHandler(experience)}
                    >
                      <BsTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            {[...Array(pages).keys()].map((x) => (
              <Link
                className={x + 1 === Number(page) ? "btn text-bold" : "btn"}
                key={x + 1}
                to={`/admin/experiences?page=${x + 1}`}
              >
                {x + 1}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
