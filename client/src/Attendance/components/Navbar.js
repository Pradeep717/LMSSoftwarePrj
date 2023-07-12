
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector } from "react-redux"

import Logo from "../Images/logo_red.png"
import './Navbar.css'
import ProfileIcon from '../Images/profileicon.png'
import SettingsIcon from '../Images/settingicon.png'
import { useDispatch } from 'react-redux'
import ProfIcon from '../Images/proficon.png'
import EditIcon from '../Images/edit.png'
import ModIcon from '../Images/modicon.png'
import CompIcon from '../Images/compicon.png'
import LogoutIcon from '../Images/logouicon.png'
import {userProfile} from "../actions/user_action"


const NavBar = ({user}) => {
  const history = useHistory()
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const dispatch = useDispatch() ;
    useEffect(()=>{
         if(localStorage.getItem("currentUser")){
             const userPic = JSON.parse(localStorage.getItem("currentUser")).user.pic;
             dispatch(userProfile(userPic))
         }

       // dispatch(userProfile())
    },[])
  
  const[open,setOpen]=useState(false);
  let menuref = useRef();
  useEffect(()=>{
    let handler = (e)=>{
      if(!menuref.current.contains(e.target)){
        setOpen(false);
        console.log(menuref.current);
      } 
    };
    document.addEventListener("mousedown",handler);

    return()=>{
      document.removeEventListener("mousedown",handler);
    }
  });

  const logoutUserProfile = () => {
    localStorage.removeItem('currentUser');
    history.push('/landing')
  }

  return (
    <nav className='nav'>
      <div className="nav-container" ref={menuref}>
        <img src={Logo} className='logo' />
        <div className="names">
          <a href="#" className="name1" >STUDENT MANAGEMENT SYSTEM</a>
          <a href="#" className='name2'>FACULTY OF ENGINEERING - UNIVERSITY OF RUHUNA</a>
        </div>
        {currentUser == null && <><div className='empty'></div></>}
        {currentUser !== null && <>

           <img src={currentUser.user.pic} onClick={()=>{setOpen(!open)}} className='profile-icon'/>

        
            {/* {isOpen && 
            <div className='dropdown-menu'>
            <ul>
              <li> <Link to={`/student/dashboard`}>Profile</Link></li>
              <li  onClick={() => logoutUserProfile()} >Logout</li>
            </ul>
            </div>
            } */}
        </>}
            <div className={`drop-menu ${open? 'active' : 'inactive'}`}>
  
              <ul>
                <li><Link to={`/student/dashboard`}><img src={ProfIcon} className='imgclass'></img>Profile</Link></li>
                <li><Link to={`/student/dashboard/edit`}><img src={EditIcon} className='imgclass'></img>Edit profile</Link></li>
                <li><Link to={`/student/dashboard/subject`}><img src={ModIcon} className='imgclass'></img>Modules</Link></li>
                <li><Link to={`/student/dashboard/report`}><img src={CompIcon} className='imgclass'></img>Complains</Link></li>
                <li style={{"cursor":"pointer"}}onClick={() => logoutUserProfile()} ><img src={LogoutIcon} className='imgclass'></img>Logout</li>
              </ul>
            </div>
      </div>
      
    </nav>
  )
}

function DropdownItem(props){
  return(
    <li className='dropItem'>
      <img src={props.img}></img>
      <a>{props.text}</a>
    </li>
  );
}

export default NavBar

// import React,{useContext} from 'react'
// import {Link ,useHistory} from 'react-router-dom'
// import {useSelector} from "react-redux"
// import {logoutUser} from "./actions/user_action"

// const NavBar = ()=>{
    
//      const history = useHistory()
     
//      const currentUser = JSON.parse(localStorage.getItem("currentUser"))
     
//     const logoutUserProfile = ()=>{
//         localStorage.removeItem('currentUser');
//         history.push('/signin')
//     }
//     return(
//         <nav className='navbar navbar-dark bg-success'>
//         <div className="nav-wrapper blue" style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
           
//            <div >
//            <Link to={""} className="brand-logo center" 
//           style={{color:"white",fontSize:"30px",textDecoration:"none",fontFamily:"Acme"}}>School Management System</Link>
//            </div>
//            {/* <div style={{marginLeft:"60px"}}>
//                 {currentUser !== null && <><button  onClick={()=> logoutUserProfile()} >logout</button></>}
//            </div> */}
        
         
//         </div>
//       </nav>
//     )
// }


// export default NavBar