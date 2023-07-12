import React, { useState, useEffect } from "react";
import StuList from "./StuList";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStudentByClass, getSubByBatch } from "./actions/student_action";
import Tatten from "./components/Tec_profile/Tatten";
import Matten from "./components/Tec_profile/Matten";
import Tprofile from "./components/Tec_profile/Tprofile";
import ViewNotice from "./screens/AdminPage/ViewNotice";
import Complain from "./components/Stu_profile/Complain";
import TEdit from "./components/Tec_profile/TEdit";
import { userProfile, logoutUser } from "./actions/user_action";
import AddSubject from "./screens/AdminPage/AddSub";
import './Home.css';

import SubjectUpdate from "./components/Tec_profile/SubjectUpdate";
import SubjectData from "./components/SubjectData";
// import SubjectData from './components/SubjectData';

const Home = () => {
  const [user, setUser] = useState([]);
  const [sClass, setSClass] = useState("");
  const [show, setShow] = useState(false);
  const [cshow, setCshow] = useState(false);
  const [mshow, setMshow] = useState(false);
  const [sshow, setSshow] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      const userId = JSON.parse(localStorage.getItem("currentUser")).user._id;
      dispatch(userProfile(userId, "Teacher"));
    }

    // dispatch(userProfile())
  }, []);
  const { currentUser } = useSelector((state) => state.userProfileReducer);
  console.log(currentUser);
  const handleClick = async (value) => {
    var obj = {
      clsName: value,
    };
    setSClass(value);
    setShow(true);
    dispatch(getStudentByClass(obj));
  };

  const handleClick2 = async (value) => {
    var obj = {
      sub_class: value,
    };
    setSClass(value);
    setShow(true);
    dispatch(getSubByBatch(obj));
  };

  const students = useSelector((state) => state.getStuByClassReducer);
  //  let classNum = [6,7,8,9,10]
  let classNum = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          height: "1500px",
          marginTop:"50px",
          paddingTop:"20px",
          background: "#0c8c8c",
          borderRadius:"0px 5px 0px 0px",
          width: "13%",
          paddingLeft: "10px",
        }}
      >
        <div>
          <Link to={`/teacher/dashboard`} className="linkitems">
            {" "}
            <i className="fas fa-exclamation-square"></i> Profile
          </Link>
          <hr style={{ color: "black" }} />
        </div>

        <div>
          <p
            onClick={() => setCshow(!cshow)}
            style={{ fontSize: "14px", color: "white",cursor:"pointer"}}
          >
            <i className="fas fa-user-friends" /> Make Attendance
          </p>
          {cshow && (
            <ul style={{ listStyleType: "none" }}>
              {classNum.map((item) => (
                <>
                  <li
                    key={item}
                    onClick={() => handleClick(item)}
                    style={{
                      color: "white",
                      fontSize: "12px",
                      height: "14px",
                      textDecoration: "none",
                    }}
                  >
                    <Link
                      to={`/teacher/dashboard/attendance/${item}`}
                      style={{
                        color: "white",
                        fontSize: "10px",
                        height: "15px",
                        textDecoration: "none",
                      }}
                    >
                      {item} Batch{" "}
                    </Link>
                  </li>
                  <hr style={{ color: "black" }} />
                </>
              ))}
            </ul>
          )}
          <hr />
        </div>

        <div>
          <p
            onClick={() => setMshow(!mshow)}
            style={{ fontSize: "14px", color: "white",cursor:"pointer" }}
          >
            {" "}
            <i className="fas fa-user-crown"></i> Upload Mark
          </p>
          {mshow && (
            <ul style={{ listStyleType: "none" }}>
              {classNum.map((item) => (
                <>
                  <li key={item} onClick={() => handleClick(item)}>
                    <Link
                      to={`/teacher/dashboard/mark/${item}`}
                      style={{
                        color: "white",
                        fontSize: "12px",
                        height: "14px",
                        textDecoration: "none",
                      }}
                    >
                      {item} Batch
                    </Link>
                  </li>
                  <hr style={{ color: "black" }} />
                </>
              ))}
            </ul>
          )}
          <hr />
        </div>

        <div>
          <p
            onClick={() => setSshow(!sshow)}
            style={{ fontSize: "14px", color: "white",cursor:"pointer"}}
          >
            {" "}
            <i className="fas fa-user-crown"></i> Update Module
          </p>
          {sshow && (
            <ul style={{ listStyleType: "none" }}>
              {classNum.map((item) => (
                <>
                  <li key={item} onClick={() => handleClick2(item)}>
                    <Link
                      to={`/teacher/dashboard/subjectUpdate/${item}`}
                      style={{
                        color: "white",
                        fontSize: "12px",
                        height: "14px",
                        textDecoration: "none",
                      }}
                    >
                      {" "}
                      {item}Batch
                    </Link>
                  </li>
                  <hr style={{ color: "black" }} />
                </>
              ))}
            </ul>
          )}
          <hr />
        </div>

        <div>
          <p style={{ fontSize: "14px", color: "white",cursor:"pointer"}}>
            <Link to={`/teacher/dashboard/notice`} className="">
              {" "}
              <i className="fas fa-exclamation-square"></i> Notice
            </Link>
          </p>
          <hr style={{ color: "black" }} />
        </div>

        <div>
          <p style={{ fontSize: "14px", color: "white",cursor:"pointer",textDecoration:"none" }}>
            <Link to={`/teacher/dashboard/addSubject`} className="linkitems">
              {" "}
              <i className="fas fa-exclamation-square"></i> Add Subject
            </Link>
          </p>
          <hr style={{ color: "black" }} />
        </div>

        <div>
          <p style={{ fontSize: "14px", color: "white",cursor:"pointer" }}>
            {" "}
            <Link to={`/teacher/dashboard/report`} className="">
              <i className="fal fa-bug"></i> Complain
            </Link>
          </p>
          <hr style={{ color: "black" }} />
        </div>

        <div>
          <p style={{ fontSize: "14px", color: "white",cursor:"pointer" }} onClick={() => dispatch(logoutUser())} >
            {" "}
            <i
              className="fas fa-exclamation-square"
              onClick={() => dispatch(logoutUser())}
            ></i>{" "}
            Logout
          </p>
        </div>
      </div>

      <div style={{ flex: 1 }}>
        {/* <ul>
                    <li>attendance</li>
                    <li>marks student</li>
                </ul> */}
        {history.location.pathname == "/teacher/dashboard" && (
          <>
            <Tprofile user={currentUser} />{" "}
          </>
        )}

        <Switch>
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
          <Route path="/teacher/dashboard/addSubject" component={AddSubject} />
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

      {/* <div style={{display:"flex"}}>
                <div style={{height:"440px",background:"gray",width:"10%"}}>
                    <ul style={{listStyleType:"none" }}>
                        {classNum.map(item =>(
                            <>
                          <li key={item} onClick={()=> handleClick(item)} style={{color:"white",fontSize:"20px",height:"30px",}}>Class {item}</li>
                          <hr style={{color:"black"}} />
                          </>
                        ))}
                        
                    </ul>
                  
                </div>
                <div style={{marginLeft:"2%",flex:1}}>
                    <h3>Make Attendance at {new Date().toISOString().slice(0, 10)}</h3>
                  {show &&   <StuList sClass={sClass} students={students} mark={false} /> } 
                </div>
            </div> */}
      {/* <div style={{display:"flex"}}>
                <div style={{height:"440px",background:"gray",width:"10%"}}>
                    <ul style={{listStyleType:"none" }}>
                        {classNum.map(item =>(
                            <>
                          <li key={item} onClick={()=> handleClick(item)} style={{color:"white",fontSize:"20px",height:"30px",}}>Class {item}</li>
                          <hr style={{color:"black"}} />
                          </>
                        ))}
                        
                    </ul>
                  
                </div>
                <div style={{marginLeft:"2%",flex:1}}>
                    <h3>Make Attendance at {new Date().toISOString().slice(0, 10)}</h3>
                  {show &&   <StuList sClass={sClass} students={students} mark={true} /> } 
                </div>
            </div>  */}
    </div>
  );
};

export default Home;
