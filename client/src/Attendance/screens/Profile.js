import React,{useEffect,useContext,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Switch,Route,Link,useHistory } from 'react-router-dom';
import {userProfile,logoutUser} from "../actions/user_action"
import Marks from "../components/Stu_profile/Result"
import Attendance from "../components/Stu_profile/Attendence"
import Subj from '../components/Stu_profile/Subj';
import Complain from "../components/Stu_profile/Complain"
import Clubs from "./student/Clubs"
import Payment from "./student/Payment"
import MySub from "./student/MySub"
import MySubEnrolled from "./student/MySubEnrolled"
import EditS from "../components/Stu_profile/EditS"
import MyTimeTable from "./student/MyTimeTable"
import Sprofile from "../components/Stu_profile/Sprofile"
import ViewNotice from "./AdminPage/ViewNotice"
import Home from "./student/Home";
import "./Profile.css";
import 'boxicons';
import { DarkModeContext } from '../../App';


const Profile = () => {
    const dispatch = useDispatch() ;
    const history = useHistory();

    const { isDarkMode } = useContext(DarkModeContext);
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    useEffect(()=>{
         if(localStorage.getItem("currentUser")){
             const userId = JSON.parse(localStorage.getItem("currentUser")).user._id ;
             dispatch(userProfile(userId))
         }

       // dispatch(userProfile())
    },[])
    const {currentUser} = useSelector(state => state.userProfileReducer) ;

    const handleSidebarToggle = () => {
      setSidebarOpen((prevState) => !prevState);
    };

    window.onload = function () {
      const sidebar = document.querySelector(".sidebar");
      const closeBtn = document.querySelector("#btn");
      
  
      closeBtn.addEventListener("click", function () {
        sidebar.classList.toggle("open");
        menuBtnChange();
      });
  
  
      
      function menuBtnChange() {
        if (sidebar.classList.contains("open")) {
          closeBtn.classList.replace("fa-bars", "fa-times");
        } else {
          closeBtn.classList.replace("fa-times", "fa-bars");
        }
      }
    

    };


    return (
      <div>
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''} ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <div class="logo_details">
          <i class="fa fa-bars" id="btn" onClick={handleSidebarToggle}></i>
        </div>
        <ul className="nav-list" style={{"paddingLeft":"0px"}}>

          <li>
          <Link to={`/student/dashboard/home`} className="">
              <i className="fas fa-home"></i>
              <span class="link_name">Home</span>
            </Link>
            <span class="tooltip">Home</span>
          </li>

          <li>
            <Link to={`/student/dashboard/timetable`} className="">
              <i className="fal fa-table"></i>
              <span class="link_name">Timetable</span>
            </Link>
            <span class="tooltip">Timetable</span>
          </li>

          <li>
          <Link to={`/student/dashboard/attendance`} className="">
              
              <i className="fas fa-check"></i>
              <span class="link_name">Attendance</span>
            
          </Link>
          <span class="tooltip">Attendance</span>
          </li>

          <li>
            <Link to={`/student/dashboard/mark`} className="">
              <i className="fas fa-list-ol"></i>
              <span class="link_name">Results</span>
            </Link>
            <span class="tooltip">Results</span>
          </li>

          <li>
            <Link to={`/student/dashboard/subject`} className="">
              <i className="fad fa-books"></i>
              <span class="link_name">Module Enrolment</span>
            </Link>
            <span class="tooltip">Module Enrolment</span>
          </li>

          <li>
            <Link to={`/student/dashboard/enrollsubject`} className="">
              <i className="fad fa-books"></i>
              <span class="link_name">Enrolled modules</span>
            </Link>
            <span class="tooltip">Enrolled modules</span>
          </li>

          <li>
    
            <Link to={`/student/dashboard/mark`} className="">
              <i className="fas fa-list-ol"></i>
              <span class="link_name">Results</span>
            </Link>
            <span class="tooltip">Results</span>
          </li>

          <li>
            <Link to={`/student/dashboard/notice`} className="">
              <i className="fa fa-sticky-note"></i>
              <span class="link_name">Notices</span>
            </Link>
            <span class="tooltip">Notices</span>
          </li>

          {/* <li><Link to={`/student/dashboard/payment`} className="links"><i className="fab fa-amazon-pay"></i> Payment</Link><hr /></li> */}
          {/* <li onClick={() => dispatch(logoutUser())} className="links"> <i className="fad fa-sign-out"></i> Logout<hr /></li> */}
        </ul>
      </div>
      <div>
        {history.location.pathname == "/student/dashboard" && (
          <>
            <Sprofile user={currentUser} />{" "}
          </>
        )}

        <Switch>
          <Route path="/student/dashboard/home" component={Home} />
          <Route path="/student/dashboard/mark" component={Marks} />
          <Route path="/student/dashboard/attendance" component={Attendance} />
          <Route path="/student/dashboard/subject" component={MySub} />
          <Route  path="/student/dashboard/enrollsubject"  component={MySubEnrolled} />
          <Route path="/student/dashboard/report" component={Complain} />
          <Route path="/student/dashboard/joinclub" component={Clubs} />
          <Route path="/student/dashboard/notice" component={ViewNotice} />
          <Route path="/student/dashboard/payment" component={Payment} />
          <Route path="/student/dashboard/timetable" component={MyTimeTable} />
          <Route path="/student/dashboard/edit" component={EditS} />
        </Switch>
      </div>
    </div>
  );




      // <div >
      //   <div className="sidebar">

           

      //      <div style={{height:"880px",background:"gray",width:"10%",paddingTop:"1%"}}>
              
      //          <div>
      //           <ul style={{listStyleType:"none" }}>
      //             <li><Link to={`/student/dashboard`} className="link_class"><i className="fas fa-user-circle"></i> Profile</Link> <hr /></li>
      //             <li><Link to={`/student/dashboard/attendance`} className="link_class"><i className="fas fa-calendar-plus"></i> Attendance</Link><hr /></li>
      //             <li><Link  to={`/student/dashboard/timetable`}className="link_class" ><i className="fal fa-table"></i> TimeTable</Link><hr /></li>
      //             <li><Link  to={`/student/dashboard/mark`}className="link_class" ><i className="fas fa-poll-people"></i> Result</Link><hr /></li>
      //             <li><Link to={`/student/dashboard/subject`} className="link_class"><i className="fad fa-books"></i> Subject</Link><hr /></li> 
      //             <li><Link to={`/student/dashboard/enrollsubject`} className="link_class"><i className="fad fa-books"></i> EnrollSubject</Link><hr /></li> 
      //             <li> <Link to={`/student/dashboard/joinclub`} className="link_class"><i className="fab fa-gg-circle"></i> Join Club</Link> <hr /></li>
      //             <li><Link to={`/student/dashboard/report`} className="link_class"><i className="fal fa-bug"></i> Complain</Link><hr /></li>
      //             <li><Link to={`/student/dashboard/notice`} className="link_class"><i className="fas fa-exclamation-square"></i> Notice</Link><hr /></li> 
      //             <li><Link to={`/student/dashboard/payment`} className="link_class"><i className="fab fa-amazon-pay"></i> Payment</Link><hr /></li>
      //             <li onClick={() => dispatch(logoutUser())} className="link_class"> <i className="fad fa-sign-out"></i> Logout<hr /></li>
      //           </ul>
                   

                 
      //          </div>
            
      //      </div>
      //      <div style={{flex:"1",marginLeft:"2%"}}>
      //         {history.location.pathname == "/student/dashboard" && <>
      //             <Sprofile  user={currentUser} /> </>
      //         }
             
           
      //      <Switch>
      //                <Route  path="/student/dashboard/mark"  component={Marks} />
      //                <Route  path="/student/dashboard/attendance"  component={Attendance} />
      //                <Route  path="/student/dashboard/subject"  component={MySub} />
      //                <Route  path="/student/dashboard/enrollsubject"  component={MySubEnrolled} />
      //                <Route  path="/student/dashboard/report"  component={Complain} />
      //                <Route  path="/student/dashboard/joinclub"  component={Clubs} />
      //                <Route  path="/student/dashboard/notice"  component={ViewNotice} />
      //                <Route  path="/student/dashboard/payment"  component={Payment} />
      //                <Route  path="/student/dashboard/timetable"  component={MyTimeTable} />
      //                <Route  path="/student/dashboard/edit"  component={EditS} />
      //              </Switch>
       
      //      </div>
      //   </div>
        
      
      // </div>
  
};

export default Profile;