import React,{useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import useWindowDimensions from '../../components/UseWindowDimensions';
 import {addReportAction} from "../../actions/student_action"
import Titleheading from "../Titleheading"
const Complain = () => {

    const dispatch = useDispatch();

  
   
    const [title,setTitle] = useState("")
    const [content,setContent] = useState("")
    const {currentUser} = useSelector(state => state.userProfileReducer) ;
    
    const handleRequest= ()=>{
        const data = {title,body:content,postedBy:currentUser[0]}
       
         dispatch(addReportAction(data))          
         setTitle("")
         setContent("")
    }

    return (
        <div className='col-7' style={{marginLeft:'auto',marginRight:"auto",marginBottom:"250px"}}>
          <div className="card px-5 py-2" style={{margin:"5%"}}>
          <Titleheading title="Report Your Complain" />
          <div className="row">
            <div className="col" style={{fontSize:"12px"}}>
            <input
            type="text"
            placeholder="title"
            value={title}
           className='form-control'
            onChange={(e)=>setTitle(e.target.value)
            
          }
            />
            </div>
          
          </div>
          <br />
              <div className="row">
              <div className="col">
           
             <textarea class="form-control" id="exampleFormControlTextarea1"  placeholder="Write The content"
            value={content}
            onChange={(e)=>setContent(e.target.value)} rows="10" />
            </div>
              </div>
          <br />

           <button style={{fontSize:"15px",width:"30%",margin:"auto",height:"50px",backgroundColor:"#0c8c8c"}} className='btn btn-success mb-4 mt-2' onClick={() => handleRequest()}>Submit</button>
      </div>
      </div>
    );
};

export default Complain;