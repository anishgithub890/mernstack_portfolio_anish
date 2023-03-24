import React, { useContext } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import About from './container/About/About';
import AboutScreen from './container/About/AboutScreen';
import { LinkContainer } from 'react-router-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import Header from './container/Header/Header';
import Skills from './container/Skills/Skills';
import Work from './container/Work/Work';
import Testimonial from './container/Testimonial/Testimonial';
import PageNotFound from './container/PageNotFound/PageNotFound';
import Contact from './container/Contact/ContactScreen';
import SigninScreen from './container/Signin/SigninScreen';
import { Store } from './Store';
import SignupScreen from './container/Signup/SignupScreen';
import ProfileScreen from './container/Profile/ProfileScreen';
import ProtectedRoute from './components/ProtectedRoute';
import UserListScreen from './container/UserList/UserListScreen';
import UserEditScreen from './container/UserEdit/UserEditScreen';
import AdminRoute from './components/AdminRoute';
import AboutEditScreen from './container/aboutEdit/AboutEditScreen';
import AboutListScreen from './container/aboutList/AboutListScreen';
import WorkListScreen from './container/WorkList/WorkListScreen';
import WorkEditScreen from './container/WorkEdit/WorkEditScreen';
import ExperienceListScreen from './container/ExperienceList/ExperienceListScreen';
import ExperienceEditScreen from './container/ExperienceEdit/ExperienceEditScreen';
import SkillListScreen from './container/SkillList/SkillListScreen';
import SkillEditScreen from './container/SkillEdit/SkillEditScreen';
import ReviewListScreen from './container/ReviewList/ReviewListScreen';
import ReviewEditScreen from './container/ReviewEdit/ReviewEditScreen';
import DashboardScreen from './container/Dashboard/DashboardScreen';
import ContactListScreen from './container/ContactList/ContactListScreen';
//import data from "./data";

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    window.location.href = '/signin';
  };

  return (
    <BrowserRouter>
      <div>
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>ANISH</Navbar.Brand>
              </LinkContainer>

              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto  w-100  justify-content-end">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                  <Link to="/about" className="nav-link">
                    About
                  </Link>
                  <Link to="/work" className="nav-link">
                    Work
                  </Link>
                  <Link to="/skill" className="nav-link">
                    Skills
                  </Link>
                  <Link to="/testimonial" className="nav-link">
                    Testimonial
                  </Link>
                  <Link to="/contact" className="nav-link">
                    Contact
                  </Link>
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item"
                        to="#signout"
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">
                      Sign In{' '}
                    </Link>
                  )}
                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown title="Admin" id="admin-nav-dropdown">
                      <LinkContainer to="/admin/dashboard">
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <LinkContainer to="/admin/users">
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/abouts">
                        <NavDropdown.Item>Abouts</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/works">
                        <NavDropdown.Item>Works</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/experiences">
                        <NavDropdown.Item>Experiences</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/skills">
                        <NavDropdown.Item>Skills</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/reviews">
                        <NavDropdown.Item>Testimonial</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/contacts">
                        <NavDropdown.Item>Contact</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container>
            <Routes>
              <Route path="/about/:slug" element={<AboutScreen />}></Route>
              <Route path="/" element={<Header />}></Route>
              <Route path="/about" element={<About />}></Route>
              <Route path="/skill" element={<Skills />}></Route>
              <Route path="/work" element={<Work />}></Route>
              <Route path="/testimonial" element={<Testimonial />}></Route>
              <Route path="/contact" element={<Contact />}></Route>
              <Route path="/signin" element={<SigninScreen />}></Route>
              <Route path="/signup" element={<SignupScreen />}></Route>
              {/* Protected Routes */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfileScreen />
                  </ProtectedRoute>
                }
              />
              {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <DashboardScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/users"
                element={
                  <AdminRoute>
                    <UserListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/user/:id"
                element={
                  <AdminRoute>
                    <UserEditScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/abouts"
                element={
                  <AdminRoute>
                    <AboutListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/about/:id"
                element={
                  <AdminRoute>
                    <AboutEditScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/work/:id"
                element={
                  <AdminRoute>
                    <WorkEditScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/works"
                element={
                  <AdminRoute>
                    <WorkListScreen />
                  </AdminRoute>
                }
              ></Route>

              <Route
                path="/admin/experience/:id"
                element={
                  <AdminRoute>
                    <ExperienceEditScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/experiences"
                element={
                  <AdminRoute>
                    <ExperienceListScreen />
                  </AdminRoute>
                }
              ></Route>

              <Route
                path="/admin/skill/:id"
                element={
                  <AdminRoute>
                    <SkillEditScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/skills"
                element={
                  <AdminRoute>
                    <SkillListScreen />
                  </AdminRoute>
                }
              ></Route>

              <Route
                path="/admin/review/:id"
                element={
                  <AdminRoute>
                    <ReviewEditScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/reviews"
                element={
                  <AdminRoute>
                    <ReviewListScreen />
                  </AdminRoute>
                }
              ></Route>

              <Route
                path="/admin/contacts"
                element={
                  <AdminRoute>
                    <ContactListScreen />
                  </AdminRoute>
                }
              ></Route>

              {/* 👇️ only match this when no other routes match */}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Container>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
