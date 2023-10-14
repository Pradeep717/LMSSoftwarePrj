import React, { useState, useEffect } from "react";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userProfile, logoutUser } from "./actions/user_action";
import UpdateModulePage from "./components/Tec_profile/updateModule";// Import the new component
import BatchSelection from "./components/Tec_profile/BatchSelection"; // Import the new component
import Tatten from "./components/Tec_profile/Tatten";
import Matten from "./components/Tec_profile/Matten";
import Tprofile from "./components/Tec_profile/Tprofile";
import ViewNotice from "./screens/AdminPage/ViewNotice";
import Complain from "./components/Stu_profile/Complain";
import TEdit from "./components/Tec_profile/TEdit";
import AddSubject from "./screens/AdminPage/AddSub";
import './Home.css';
import SubjectUpdate from "./components/Tec_profile/SubjectUpdate";
import SubjectData from "./components/SubjectData";

import { useContext } from 'react';
import { DarkModeContext } from "../App";

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      const userId = JSON.parse(localStorage.getItem("currentUser")).user._id;
      dispatch(userProfile(userId, "Teacher"));
    }
  }, []);

  const { currentUser } = useSelector((state) => state.userProfileReducer);
  const { isDarkMode } = useContext(DarkModeContext);
  return (
    <div style={{ display: "flex" }}>
      <div
  style={{
    height: '550px',
    marginTop: '50px',
    paddingTop: '20px',
    background: isDarkMode ? '#333' : '#800000',
    borderRadius: '0px 5px 0px 0px',
    width: '13%',
    paddingLeft: '10px',
  }}
>

        <div onClick={() => history.push('/teacher/dashboard')} // Navigate to batch selection page
            style={{ fontSize: "14px", color: "white", cursor: "pointer" }} className="sideitems">
          <p>
            <i className="fas fa-user-crown"></i> Profile
          </p>
        </div>

        <div 
            onClick={() => history.push('/teacher/dashboard/batchSelection')} // Navigate to batch selection page
            style={{ fontSize: "14px", color: "white", cursor: "pointer" }} className="sideitems">
          <p>
            <i className="fas fa-user-crown"></i> Update Module
          </p>
        </div>

        <div 
            onClick={() => history.push('/teacher/dashboard/notice')} // Navigate to batch selection page
            style={{ fontSize: "14px", color: "white", cursor: "pointer" }} className="sideitems">
          <p>
            <i className="fas fa-user-crown"></i> Notice
          </p>
        </div>

      
        <div onClick={() => history.push('/teacher/dashboard/addSubject')} // Navigate to batch selection page
            style={{ fontSize: "14px", color: "white", cursor: "pointer" }} className="sideitems">
          <p>
            <i className="fas fa-exclamation-square"></i> Add Subject
          </p>
        </div>

        <div style={{ fontSize: "14px", color: "white", cursor: "pointer" }}
            onClick={() => dispatch(logoutUser())} className="sideitems">
          <p>
            <i
              className="fas fa-exclamation-square"
              onClick={() => dispatch(logoutUser())}
            ></i>{" "}
            Logout
          </p>
        </div>
      </div>

      <div style={{ flex: 1 }}>
        {history.location.pathname === "/teacher/dashboard" && (
          <>
            <Tprofile user={currentUser} />
          </>
        )}

        <Switch>
          {/* Other routes */}
          <Route
            path="/teacher/dashboard/updateModule/:batch"
            component={UpdateModulePage}
          />
          <Route
            path="/teacher/dashboard/batchSelection"
            component={BatchSelection}
          />
          <Route path="/teacher/dashboard/mark/:id" component={Matten} />
          <Route
            path="/teacher/dashboard/attendance/:id"
            component={Tatten}
            exact
          />
          <Route
            path="/teacher/dashboard/notice"
            component={ViewNotice}
            exact
          />
          <Route path="/teacher/dashboard/edit/:id" component={TEdit} />
          <Route
            path="/teacher/dashboard/addSubject"
            component={AddSubject}
          />
          <Route path="/teacher/dashboard/report" component={Complain} />
          <Route
            path="/teacher/dashboard/subjectUpdate/:id"
            component={SubjectUpdate}
          />
          <Route
            path="/teacher/dashboard/subjectData/:id"
            component={SubjectData}
          />
        </Switch>
      </div>
    </div>
  );
};

export default Home;