import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector } from "react-redux"

import Logo from "../Images/Ruh_logo.png"
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
import { DarkModeContext } from '../../App';

const NavBar = ({user}) => {


 
  const { isDarkMode, dispatch: darkModeDispatch } = useContext(DarkModeContext);

  const toggleMode = () => {
    darkModeDispatch({ type: 'TOGGLE_DARK_MODE' });
  };

  const history = useHistory()
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log("233")
  // console.log(currentUser.user);
 
  
 

  

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
    <nav className={isDarkMode ? 'nav dark-mode' : 'nav light-mode'}>
      <div className={isDarkMode ? 'nav-container dark-mode' : 'nav-container light-mode'} ref={menuref}>
        <img src={Logo} className='logo' style={{cursor:"pointer"}}/>
        <div className="names">
          <a href="#" className="name1" >STUDENT MANAGEMENT SYSTEM</a>
          <a href="#" className='name2'>FACULTY OF ENGINEERING - UNIVERSITY OF RUHUNA</a>
        </div>
        <div>
        
          <i class="fa fa-sun fa-2x" aria-hidden="true" style={{width:"10px",marginRight:"30px",cursor:"pointer"}} onClick={toggleMode} ></i>
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
        </div>
        <div className={`drop-menu ${open? 'active' : 'inactive'} ${isDarkMode? 'dark-mode' : ''}`}>
  
            <ul>
              <li><Link to={`/student/dashboard`}><i class="fa fa-user-circle-o iconclass" aria-hidden="true"></i>Profile</Link></li>
                <li><Link to={`/student/dashboard/edit`}><i class="fa fa-pencil iconclass" aria-hidden="true"></i>Edit profile</Link></li>
                <li><Link to={`/student/dashboard/subject`}><i class="fa fa-leanpub iconclass" aria-hidden="true"></i>Modules</Link></li>
                <li><Link to={`/student/dashboard/report`}><i class="fa fa-flag iconclass" aria-hidden="true"></i>Complains</Link></li>
                <li style={{"cursor":"pointer",color:"black"}}onClick={() => logoutUserProfile()} ><a><i class="fa fa-sign-out iconclass" aria-hidden="true"></i>Logout</a></li>
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

export default NavBar;