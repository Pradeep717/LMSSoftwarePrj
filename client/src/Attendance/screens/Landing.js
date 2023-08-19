import React,{useContext} from "react";
import { Link } from "react-router-dom";
import StudentIMage from "../Images/student4.jpg";
import AdminIMage from "../Images/admin2.jpg";
import TeacherImage from "../Images/backgg.JPG";
import backg from "../Images/backg.jpg";
import "./Landing.css";
import image1 from "../Images/1.jpg";
import image2 from "../Images/2.jpg";
import { DarkModeContext } from '../../App';

const Landing = () => {
    const { isDarkMode } = useContext(DarkModeContext);
  return (
    <div className="HomePage" style={{ minHeight: "80vh" }}>
      {/* <div className='box-container'> */}
      {/* <div className="items-container"> */}
      {/* <Link to="/adminlogin"> <div className="item" >Signin as  Admin</div></Link>
                    <Link to="/stulogin" ><div className="item" style={{ marginLeft: "30px" }}> Signin as  Student</div></Link>
                    <Link to="/teclogin" > <div className="item" style={{ marginLeft: "30px" }}>Signin as  Teacher </div></Link> */}
      {/* <Link to="/login" > <div className="item" style={{ marginLeft: "30px" }}>Signin </div></Link> */}
      {/* </div> */}
      {/* </div> */}
      <div className="main-car">
        <div className='item1'>
          <p className={isDarkMode ? 'itemP dark-mode' : 'itemP'}>Welcome to Learning Management system! </p>
        </div>
        <div
          id="carouselExampleSlidesOnly"
          class="carousel slide"
          data-ride="carousel"
        >
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img class="d-block w-100" src={image1} alt="First slide" />
            </div>
            <div class="carousel-item">
              <img class="d-block w-100" src={image2} alt="Second slide" />
            </div>
          </div>
        </div>
         <div className="logging">
         <p className={isDarkMode ? 'itemP dark-mode' : 'itemP'} >You are not logged. Please login from <Link to="/login" >here </Link></p>
        </div>           
        
      </div>
      {/* <div
        id="carouselExampleControls"
        class="carousel slide"
        data-ride="carousel"
      >
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img class="d-block w-100" src={image1} alt="First slide" />
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src={image2} alt="Second slide" />
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src={image2} alt="Third slide" />
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExampleControls"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselExampleControls"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div> */}
    </div>
  );
};

export default Landing;
