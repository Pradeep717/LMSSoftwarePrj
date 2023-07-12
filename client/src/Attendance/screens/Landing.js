import React from 'react';
import { Link } from "react-router-dom"
import StudentIMage from "../Images/student4.jpg"
import AdminIMage from "../Images/admin2.jpg"
import TeacherImage from "../Images/backgg.JPG"
import backg from "../Images/backg.jpg"
import './Landing.css'

const Landing = () => {
    return (
        <div className="HomePage" style={{minHeight:"80vh"}} >
            <div className='box-container'>
                <div className="items-container">
                    <Link to="/adminlogin"> <div className="item" >Signin as  Admin</div></Link>
                    <Link to="/stulogin" ><div className="item" style={{ marginLeft: "30px" }}> Signin as  Student</div></Link>
                    <Link to="/teclogin" > <div className="item" style={{ marginLeft: "30px" }}>Signin as  Teacher </div></Link>
                </div>
            </div>
        </div>
    );
};

export default Landing;