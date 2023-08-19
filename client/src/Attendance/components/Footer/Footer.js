import React from "react";
import { useContext } from "react";
import "./Footer.css";
import { DarkModeContext } from '../../../App';

const Footer = () => {

  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <div className={`footer ${isDarkMode ? 'darkmod' : ''}`}>
      <div className="ft-main">
        <div className="columns">
          <h6>About Us</h6>
          <p>
            The Faculty of Engineering of University of Ruhuna,was established
            on 1st July 1999 at Hapugala, Galle.Admission to the Faculty of
            Engineering, University of Ruhuna, is subject to the University
            Grants Commission policy on university admissions.
          </p>
        </div>
        <div className="columns">
          <h6 style={{marginLeft:"32px"}}>Main Links</h6>
          <ul>             
          <li><a href="https://www.ruh.ac.lk/index.php/en/"><p>University of Ruhuna</p></a></li>
          <li><a href="http://www.eng.ruh.ac.lk/"><p>Faculty of Engineering</p></a></li>
          <li><a href="http://www.lib.ruh.ac.lk/Eng/index.php"><p>Library</p></a></li>
          <li><a href="https://www.iesl.lk/index.php?lang=en"><p>IESL</p></a></li>
          </ul>
        </div>
        <div className="columns">
          <h6 style={{marginLeft:"32px"}}>Departments</h6>
          <ul>
          <li><a href="https://www.ruh.ac.lk/index.php/en/"><p>University of Ruhuna</p></a></li>
          <li><a href="http://www.eng.ruh.ac.lk/"><p>Faculty of Engineering</p></a></li>
          <li><a href="http://www.lib.ruh.ac.lk/Eng/index.php"><p>Library</p></a></li>
          <li><a href="https://www.iesl.lk/index.php?lang=en"><p>IESL</p></a></li>
          </ul>
        </div>
        <div className="columns">
          <h6>Contact</h6>
          {/* <ul>
            <li><p>Faculty of Engineering,Hapugala,Galle,Sri Lanka.</p></li>
          </ul> */}
          <div className="address">
            <i class="fa fa-location-arrow" aria-hidden="true" style={{color:"white",marginBottom:"7px"}}></i>
            <p>Faculty of Engineering ,</p>
            <p>Hapugala ,</p>
            <p>Sri Lanka ,</p>
            <p>90000</p>
            <p style={{marginBottom:"20px"}}>Phone: +(94)0 91 2245765/6</p>
          </div>
          <div className="icons">
            <a href="https://www.ruh.ac.lk/index.php/en/"><i class="fa fa-facebook-official custom-icon1" aria-hidden="true"></i></a>
            <a href="https://www.ruh.ac.lk/index.php/en/"><i class="fa fa-linkedin-square custom-icon2" aria-hidden="true"></i></a>
            <a href="https://www.ruh.ac.lk/index.php/en/"><i class="fa fa-youtube-play custom-icon3" aria-hidden="true"></i></a>
            
          </div>
          
        </div>
      </div>
      <hr></hr>
      <div className="copyrights">
        <p>Copyright (c) 2023 All rights reserved.</p>
        <p>Faculty of Engineering, University of Ruhuna.</p>
      </div>
    </div>
  );
};

export default Footer;