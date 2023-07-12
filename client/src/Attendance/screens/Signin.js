import React,{useState,useEffect} from 'react'
import { useDispatch } from 'react-redux'
import {Link,useHistory} from 'react-router-dom'
import {loginUser} from '../actions/user_action'
import {userType} from "../Utills/index"
import backg from "../Images/backg.jpg"
import StudentIMage from "../Images/StuImg.png"
import AdminIMage from "../Images/admin2.jpg"
import TeacherImage from "../Images/teach.png"
import './Signin.css'
const SignIn  = ()=>{
    const history = useHistory()
    
    const [password,setPasword] = useState("")
    const [email,setEmail] = useState("")
    const [userItem,setuserItem]=useState("")
 
    const dispatch = useDispatch()
   
    const handleRequest = ()=>{
        const user = {
            password,email
            
        }
        if(history.location.pathname == "/stulogin"){
          dispatch(loginUser(user,"Student"))
        }
        if(history.location.pathname == "/teclogin"){
          const datat = {
            password,empolyee_id:email
            
        }
          dispatch(loginUser(datat,"Teacher"))
        } 
        if(history.location.pathname == "/adminlogin"){
          dispatch(loginUser(user,"Admin"))
        }
       
    }
    
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
          
          {/* <div className="col">
            
            <select  className="form-select" value={userItem}onChange={(e)=> setuserItem(e.target.value)}
              style={{height:"50px",width:"80%",marginLeft:"10%"}}
            >
            {userType.map((item) => (
                  <option value={item} key={item} >
                    {" "}
                    {item}{" "}
                  </option>
                ))}
            </select>
        </div> */}
       

           <button className='btn' onClick={() => handleRequest()}>Signin</button>
      </div>
      </div>
      </div>
   )
}


export default SignIn