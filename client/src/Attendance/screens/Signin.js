import React,{useState,useEffect} from 'react'
import { useDispatch } from 'react-redux'
import {Link,useHistory} from 'react-router-dom'
import {loginUser} from '../actions/user_action'
import {userType} from "../Utills/index"
import backg from "../Images/backg.jpg"
import StudentIMage from "../Images/StuImg.png"
import AdminIMage from "../Images/admin2.jpg"
import TeacherImage from "../Images/teach.png"
import { DotLoader, HashLoader } from 'react-spinners';
import LoadingOverlay from './LoadingOverlay'; // Import the LoadingOverlay component
import './Signin.css'

const SignIn  = ()=>{
    const history = useHistory()
    const [loading,setLoading] = useState(false);
    const [password,setPasword] = useState("")
    const [email,setEmail] = useState("")
    const [userItem,setuserItem]=useState("")
 
    const dispatch = useDispatch()
    
   
    const handleRequest = ()=>{
      setLoading(true);
        const user = {
            password,email
            
        }
        console.log(user);
        console.log("Histry");

        if(history.location.pathname == "/stulogin" || email.substring(0, 2).toLowerCase() === "eg"){
          dispatch(loginUser(user,"Student"))
        }
        if(history.location.pathname == "/teclogin" || email.substring(0, 3).toLowerCase() === "eng"){
          const datat = {
            password,empolyee_id:email
            
        }
          dispatch(loginUser(datat,"Teacher"))
        } 
        if(history.location.pathname == "/adminlogin" || email.substring(0, 5).toLowerCase() === "admin"){
          dispatch(loginUser(user,"Admin"))
        }

        setTimeout(() => {
          setLoading(false);
        }, 2000);
       
    };

    
   return (
      <div>
        <div className='col-6' style={{margin:"auto",minHeight:"100vh"}}>
          <div className="card px-5 py-2" style={{margin:"3%"}}>
            <Link to="/landing"><i className="far fa-arrow-square-left fa-2x" style={{paddingTop:"5px"}}></i></Link>
            {history.location.pathname == "/stulogin" && <> 
            <h4 style={{margin:"auto",marginBottom:"10px"}}> Student Login</h4>
            <img src={StudentIMage} alt="StudentIMage" className='landing_img' />
            <br />
             </>}
             {history.location.pathname == "/teclogin" && <>
            <h4 style={{margin:"auto",marginBottom:"20px"}}>
               Teacher Login
               </h4>
               <img src={TeacherImage} alt="StudentIMage" className='landing_img' />
            <br />
            </> }
            {history.location.pathname == "/adminlogin" &&<>
            <h4 style={{margin:"auto",marginBottom:"20px"}}>
               Admin Login
               </h4>
               <img src={AdminIMage} alt="StudentIMage" className='landing_img' />
            <br />
            </>  }
        
         
          <div className="">
            <div className="">
            <input
            type="text"
            placeholder="email"
            value={email}
           className='input_email'
            onChange={(e)=>setEmail(e.target.value)}
            />
            </div>
          
          </div>
          <br />
              <div className="row">
              <div className="col">
            <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e)=>setPasword(e.target.value)}
            className='input_email'
            />
            </div>
              </div>
          <br />
           <button className='btn' onClick={() => handleRequest()} >Signin</button>
           {loading && (
            <div className="loading-overlay">
              <HashLoader color="#36d7b7" loading={loading} size={40} />
            </div>
          )}
      </div>
      </div>
      </div>
   )
}


export default SignIn