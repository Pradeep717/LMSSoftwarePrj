import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import {getAllFaculty} from "../../actions/admin_action"
import Titleheading from "../../components/Titleheading"
import { deleteSingleTeacher } from '../../actions/admin_action';

const Allfaculty = () => {
    const dispatch = useDispatch() ;
    useEffect(()=>{
         dispatch(getAllFaculty())
    },[])
    const data =useSelector(state=>state.getAllFacReducer)

    const handleDelete = (Email) => {
      const data = {email: Email}
      dispatch(deleteSingleTeacher(data))
      console.log("Deleting teacher with Email:", Email);
      window.location.reload(); 
  };
    
    return (
      <div style={{width:"65%",minHeight:"100vh",margin:"auto",padding:"10px",backgroundColor:"white",borderRadius:"5px",marginTop:"40px",marginBottom:"80px"}}>
             
      <Titleheading style={{marginTop:"20px"}} title="View All Faculty Member" />
      <table  className='table table-bordered table-responsive-sm' style={{width:"90%",border:"2px solid black",margin:"auto"}}>
  <thead style={{fontSize:"12px",margin: "auto",textAlign:"center",backgroundColor:"black",color:"white",borderRadius:"10px" }} className='thead-dark'>
    <tr>
        <th >Name</th>
        <th>Staff Id </th>
        <th>Joining Year</th>
        <th>Gender</th>
        <th>Contact Number</th>

        {/* <th>Age</th> */}
        <th>Profile Image</th>
        <th>Actions</th>
    </tr>
  </thead>

     {data && data.allFaculty && data.allFaculty.map(user =>(
      
              <tbody key={user.name} style={{padding:"5px"}}>
          <tr >
             <td>{user.name}{" "}{user.surname}</td>
          
            <td>
            {user.empolyee_id}
            </td>
            <td >
            {user.joining_year}
            </td>
            <td>{user.gender}</td>
            <td>
               
               {user.mobile}
            </td>
            {/* <td>{user.date_of_birth}</td> */}
            {/* <td>{user.age}</td> */}
            <td><img src={user.pic} alt="sksk" style={{height:"50px",width:"50px"}} /></td>
            <td>

              <button className="btn btn-danger" onClick={() => handleDelete(user.email)} style={{ marginLeft:"2px"}} > Delete </button>
            </td>
          </tr>
        
        </tbody>

     ))}
     
    
</table>
  </div>
);
};

export default Allfaculty;