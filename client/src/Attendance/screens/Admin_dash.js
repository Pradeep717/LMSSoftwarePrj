import React, { useState, useEffect } from "react";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStudentByClass } from "../actions/student_action";
import { logoutUser } from "../actions/user_action";
import Tatten from "../components/Tec_profile/Tatten";
import Matten from "../components/Tec_profile/Matten";
import Signup from "./Auth/Signup";
import TeacherSignUp from "./Auth/Tecah_regis";
import Allstudent from "./student/Allstudent";
import Allfaculty from "./AdminPage/ViewFac";
import AddNotice from "./AdminPage/AddNotice";
import ViewNotice from "./AdminPage/ViewNotice";
import AddClub from "./AdminPage/AddClub";
import ReqClub from "./AdminPage/ReqClub";
import ViewCom from "./AdminPage/ViewCom";
import AddSubject from "./AdminPage/AddSub";
import AdminIMage from "../Images/admin2.jpg";
import { userProfile } from "../actions/user_action";
import "./Admin_dash.css";

const Home = () => {
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("admin") == undefined) {
      history.push("/landing");
    }
  }, []);

  const [user, setUser] = useState([]);
  const [sClass, setSClass] = useState("");
  const [show, setShow] = useState(false);
  const [cshow, setCshow] = useState(false);
  const [mshow, setMshow] = useState(false);
  const dispatch = useDispatch();

  const handleClick = async (value) => {
    var obj = {
      clsName: value,
    };
    setSClass(value);
    setShow(true);
    dispatch(getStudentByClass(obj));
  };

  const students=useSelector(state=>state.getStuByClassReducer)

    let classNum = [16,17,18,19,20,21,22,23,24,25,26]
  
  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      const userId = JSON.parse(localStorage.getItem("currentUser")).user._id;
      dispatch(userProfile(userId));
    }

    // dispatch(userProfile())
  }, []);
  const { currentUser } = useSelector((state) => state.userProfileReducer);

  window.onload = function () {
    const sidebar = document.querySelector(".sidebar");
    const closeBtn = document.querySelector("#btn");
    

    closeBtn.addEventListener("click", function () {
      sidebar.classList.toggle("open");
      menuBtnChange();
    });


    function menuBtnChange() {
      if (sidebar.classList.contains("open")) {
        closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
      } else {
        closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
      }
    }
  };

  return (
    <div>
      <div>
        <div className="sidebar">
        <div class="logo_details">
          <i class="bx bx-menu" id="btn"></i>
        </div>
          <ul className="nav-list" style={{ paddingLeft: "0px" }}>

            <li>
              <Link to={`/admin/dashboard`} className="">
                <i className="fas fa-user-circle"></i>
                <span class="link_name">Profile</span>
              </Link>
              <span class="tooltip">Profile</span>
            </li>


            <li>
              <Link to={`/admin/dashboard/addStu`} className="">
                <i className="fad fa-user-plus"></i>
                <span class="link_name">Add Student</span>
              </Link>
              <span class="tooltip">Add Student</span>
            </li>


            <li>
              <Link to={`/admin/dashboard/addFac`} className="">
                <i className="far fa-user-plus"></i>
                <span class="link_name">Add Staff Member</span>
              </Link>
              <span class="tooltip">Add Staff Member</span>
            </li>

            <li>
              <Link to={`/admin/dashboard/addSubject`} className="">
                <i className="fas fa-exclamation-square"></i>
                <span class="link_name">Add Module</span>
              </Link>
              <span class="tooltip">Add Module</span>
            </li>

            <li>
              <Link to={`/admin/dashboard/viewStu`} className="">
                <i className="fas fa-users"></i>
                <span class="link_name">View Student</span>
              </Link>
              <span class="tooltip">View Student</span>
            </li>
            
            <li>
              <Link to={`/admin/dashboard/viewFac`} className="">
                <i className="far fa-user-secret"></i>
                <span class="link_name">View Staff Member</span>
              </Link>
              <span class="tooltip">View Staff Member</span>
            </li>


            <li>
              <Link to={`/admin/dashboard/addNotice`} className="">
                <i className="fas fa-flag-checkered"></i>
                <span class="link_name">Add Notice</span>
              </Link>
              <span class="tooltip">Add Notice</span>
            </li>

            <li>
              <Link to={`/admin/dashboard/viewNotice`} className="">
                <i className="fas fa-exclamation-square"></i>
                <span class="link_name">View Notice</span>
              </Link>
              <span class="tooltip">View Notice</span>
            </li>

            
            
            <li>
              <Link to={`/admin/dashboard/viewNotice`} className="" onClick={() => dispatch(logoutUser())}>
                <i className="fad fa-sign-out"></i>
                <span class="link_name">Sign out</span>
              </Link>
              <span class="tooltip">Sign out</span>
            </li>
          
            

            {/* <li className=''>
                    <Link to={`/admin/dashboard`}  className="links">  <i className="fas fa-user-circle"></i> Profile</Link>
                    <hr />
                  </li>
                  <li>
                    <Link to={`/admin/dashboard/addStu`}  className="links">
                    <i className="fad fa-user-plus"></i> Add Student</Link> <hr /></li>
                  <li><Link  to={`/admin/dashboard/addFac`} className="links" ><i className="far fa-user-plus"></i> Add Staff Member</Link><hr /></li>
                  <li><Link to={`/admin/dashboard/viewStu`} className="links"> <i className="fas fa-users"></i>  View Students</Link><hr /></li> 
                  <li><Link to={`/admin/dashboard/viewFac`} className="links"><i className="far fa-user-secret"></i>  View Staff</Link><hr /></li> 
                  {/* <li><Link to={`/admin/dashboard/addClub`} className="links"> <i className="fad fa-club"></i> Add Club </Link><hr /></li> */}
            {/* <li><Link to={`/admin/dashboard/clubjreq`} className="links"> <i className="fab fa-gg-circle"></i> Club  Request</Link><hr /></li> */}
            {/* <li><Link to={`/admin/dashboard/complain`} className="links"> <i className="fal fa-bug"></i> Check Complain</Link><hr /></li>
                  <li><Link to={`/admin/dashboard/addNotice`} className="links"><i className="fas fa-flag-checkered"></i> Upload Notice</Link><hr /></li> 
                  <li><Link to={`/admin/dashboard/viewNotice`} className="links"> <i className="fas fa-exclamation-square"></i>  View Notice</Link><hr /></li> 
                  <li><Link to={`/admin/dashboard/addSubject`} className="links"> <i className="fas fa-exclamation-square"></i>  Add Module</Link><hr /></li>  */}
            {/* <li  className="links" onClick={() => dispatch(logoutUser())} ><i className="fad fa-sign-out"></i> Logout <hr /></li> */}
          </ul>
        </div>
        {/* <div>
                <p  onClick={() => setCshow(!cshow)} style={{fontSize:"20px",color:"white"}}> 
                <i className="fas fa-user-friends"/> Class</p>
                {cshow && (
                    <ul style={{listStyleType:"none" }}>
                    {classNum.map(item =>(
                        <>
                      <li key={item} onClick={()=> handleClick(item)} style={{color:"white",fontSize:"20px",height:"30px",textDecoration:"none"}}>
                        <Link to={`/teacher/dashboard/attendance`} style={{color:"white",fontSize:"20px",height:"30px",textDecoration:"none"}}>Class {item}</Link></li>
                      <hr style={{color:"black"}} />
                      </>
                    ))}
                    
                </ul>
                )}
                <hr />
            </div> */}
        {/* <div>
                <p  onClick={()=> setMshow(!mshow)} style={{fontSize:"20px",color:"white"}}>  <i className="fas fa-user-crown"></i> Mark</p>
                {mshow && (
                    <ul style={{listStyleType:"none" }}>
                    {classNum.map(item =>(
                        <>
                      <li key={item} onClick={()=> handleClick(item)} >
                        
                        <Link to={`/teacher/dashboard/mark/${item}`}  style={{color:"white",fontSize:"20px",height:"30px",textDecoration:"none"}}>Class {item}</Link></li>
                      <hr style={{color:"black"}} />
                      </>
                    ))}
                    
                </ul>
                )}
                <hr />
            </div>
            <div>
                <p style={{fontSize:"20px",color:"white"}}> <i className="fas fa-exclamation-square"></i> Notice</p>
            </div> */}
      </div>
      <div style={{ flex: 1 }}>
        {history.location.pathname == "/admin/dashboard" && (
          <>
            <div className="main-item">
            <div  className='center-item'>
          
            </div>
            <div  className='right-item'>
              
            </div>
            </div>
          </>
        )}

        <Switch>
          <Route path="/admin/dashboard/addStu" component={Signup} />
          <Route path="/admin/dashboard/addFac" component={TeacherSignUp} />
          <Route path="/admin/dashboard/viewStu" component={Allstudent} />
          <Route path="/admin/dashboard/viewFac" component={Allfaculty} />
          <Route path="/admin/dashboard/addClub" component={AddClub} />
          <Route path="/admin/dashboard/clubjreq" component={ReqClub} />
          <Route path="/admin/dashboard/addStu" component={Matten} />
          <Route path="/admin/dashboard/addSubject" component={AddSubject} />
          <Route path="/admin/dashboard/complain" component={ViewCom} />
          <Route path="/admin/dashboard/addNotice" component={AddNotice} />
          <Route path="/admin/dashboard/viewNotice" component={ViewNotice} />
          <Route path="/teacher/dashboard/mark/:id" component={Matten} />
          <Route
            path="/teacher/dashboard/attendance"
            component={Tatten}
            exact
          />
        </Switch>
      </div>
    </div>
  );
};

export default Home;





// import React,{ useState,useEffect } from 'react';
// import { Switch,Route,Link,useHistory } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux'
// import {getStudentByClass} from "../actions/student_action"
// import {logoutUser} from "../actions/user_action"
// import Tatten from "../components/Tec_profile/Tatten"
// import Matten from "../components/Tec_profile/Matten"
// import Signup from "./Auth/Signup"
// import TeacherSignUp from './Auth/Tecah_regis';
// import Allstudent from "./student/Allstudent"
// import Allfaculty from "./AdminPage/ViewFac"
// import AddNotice from "./AdminPage/AddNotice"
// import ViewNotice from "./AdminPage/ViewNotice"
// import AddClub from "./AdminPage/AddClub"
// import ReqClub from "./AdminPage/ReqClub"
// import ViewCom from "./AdminPage/ViewCom"
// import AddSubject from "./AdminPage/AddSub"
// import AdminIMage from "../Images/admin2.jpg"


// const Home = () => {
//   const history = useHistory()

//   useEffect(()=>{
//      if(localStorage.getItem("admin") == undefined){
//       history.push('/landing')
//      }
//   },[])
 
//     const[user,setUser]=useState([])
//     const [sClass,setSClass] = useState("")
//     const [show,setShow]=useState(false)
//     const [cshow,setCshow] = useState(false)
//     const [mshow,setMshow] = useState(false)
//     const dispatch=useDispatch()
    

//     const handleClick = async (value) => {
//         var obj = {
//             clsName: value
//         }
//         setSClass(value);
//         setShow(true)
//         dispatch(getStudentByClass(obj));
//     }
//     const students=useSelector(state=>state.getStuByClassReducer)
//     //  let classNum = [6,7,8,9,10]
//     let classNum = [16,17,18,19,20,21,22,23,24,25,26]


//     return (
//         <div style={{display:"flex"}}>
//            <div style={{height:"880px",background:"gray",width:"13%",paddingLeft:"10px"}}>
           
//           <div>
//                <ul style={{listStyleType:"none" }}>
//                   <li>
//                     <Link to={`/admin/dashboard`}  className="link_class">  <i className="fas fa-user-circle"></i> Profile</Link>
//                     <hr />
//                   </li>
//                   <li>
//                     <Link to={`/admin/dashboard/addStu`}  className="link_class">
//                     <i className="fad fa-user-plus"></i> Add Student</Link> <hr /></li>
//                   <li><Link  to={`/admin/dashboard/addFac`} className="link_class" ><i className="far fa-user-plus"></i> Add Faculty</Link><hr /></li>
//                   <li><Link to={`/admin/dashboard/viewStu`} className="link_class"> <i className="fas fa-users"></i> View Student</Link><hr /></li> 
//                   <li><Link to={`/admin/dashboard/viewFac`} className="link_class"><i className="far fa-user-secret"></i> View Faculty</Link><hr /></li> 
//                   <li><Link to={`/admin/dashboard/addClub`} className="link_class"> <i className="fad fa-club"></i> Add Club </Link><hr /></li>
//                   <li><Link to={`/admin/dashboard/clubjreq`} className="link_class"> <i className="fab fa-gg-circle"></i> Club  Request</Link><hr /></li>
//                   <li><Link to={`/admin/dashboard/complain`} className="link_class"> <i className="fal fa-bug"></i> Check Complain</Link><hr /></li>
//                   <li><Link to={`/admin/dashboard/addNotice`} className="link_class"><i className="fas fa-flag-checkered"></i> Upload Notice</Link><hr /></li> 
//                   <li><Link to={`/admin/dashboard/viewNotice`} className="link_class"> <i className="fas fa-exclamation-square"></i>  View Notice</Link><hr /></li> 
//                   <li><Link to={`/admin/dashboard/addSubject`} className="link_class"> <i className="fas fa-exclamation-square"></i>  Add Subject</Link><hr /></li> 
//                   <li  className="link_class" onClick={() => dispatch(logoutUser())} ><i className="fad fa-sign-out"></i> Logout <hr /></li>
//                 </ul>
                    
//           </div>
//            {/* <div>
//                 <p  onClick={() => setCshow(!cshow)} style={{fontSize:"20px",color:"white"}}> 
//                 <i className="fas fa-user-friends"/> Class</p>
//                 {cshow && (
//                     <ul style={{listStyleType:"none" }}>
//                     {classNum.map(item =>(
//                         <>
//                       <li key={item} onClick={()=> handleClick(item)} style={{color:"white",fontSize:"20px",height:"30px",textDecoration:"none"}}>
//                         <Link to={`/teacher/dashboard/attendance`} style={{color:"white",fontSize:"20px",height:"30px",textDecoration:"none"}}>Class {item}</Link></li>
//                       <hr style={{color:"black"}} />
//                       </>
//                     ))}
                    
//                 </ul>
//                 )}
//                 <hr />
//             </div> */}
//             {/* <div>
//                 <p  onClick={()=> setMshow(!mshow)} style={{fontSize:"20px",color:"white"}}>  <i className="fas fa-user-crown"></i> Mark</p>
//                 {mshow && (
//                     <ul style={{listStyleType:"none" }}>
//                     {classNum.map(item =>(
//                         <>
//                       <li key={item} onClick={()=> handleClick(item)} >
                        
//                         <Link to={`/teacher/dashboard/mark/${item}`}  style={{color:"white",fontSize:"20px",height:"30px",textDecoration:"none"}}>Class {item}</Link></li>
//                       <hr style={{color:"black"}} />
//                       </>
//                     ))}
                    
//                 </ul>
//                 )}
//                 <hr />
//             </div>
//             <div>
//                 <p style={{fontSize:"20px",color:"white"}}> <i className="fas fa-exclamation-square"></i> Notice</p>
//             </div> */}
//            </div>
//            <div style={{flex:1}}>
//            {history.location.pathname == "/admin/dashboard" && <>
//            <div style={{marginLeft:"20%",marginTop:"40px"}}>
//                    <img src={AdminIMage} alt="StudentIMage" style={{height:"250px",width:"250px",borderRadius:"50%"}} />
//                    <br />
//                    <h2 style={{marginLeft:"5.5%"}}>Admin </h2> 
//                    <br />
                  
//                 </div>
//                  </>
//               }

//                    <Switch>
//                    <Route  path="/admin/dashboard/addStu"  component={Signup}  />
//                    <Route  path="/admin/dashboard/addFac"  component={TeacherSignUp}  />
//                    <Route  path="/admin/dashboard/viewStu"  component={Allstudent}  />
//                    <Route  path="/admin/dashboard/viewFac"  component={Allfaculty}  />
//                    <Route  path="/admin/dashboard/addClub"  component={AddClub}  />
//                    <Route  path="/admin/dashboard/clubjreq"  component={ReqClub}  />
//                    <Route  path="/admin/dashboard/addStu"  component={Matten}  />
//                    <Route  path="/admin/dashboard/addSubject"  component={AddSubject}  />
//                    <Route  path="/admin/dashboard/complain"  component={ViewCom}  />
//                    <Route  path="/admin/dashboard/addNotice"  component={AddNotice}  />
//                    <Route  path="/admin/dashboard/viewNotice"  component={ViewNotice}  />
//                      <Route  path="/teacher/dashboard/mark/:id"  component={Matten}  />
//                      <Route  path="/teacher/dashboard/attendance"  component={Tatten} exact />

//                    </Switch>
//            </div>

             
//         </div>
//     );
// };

// export default Home;