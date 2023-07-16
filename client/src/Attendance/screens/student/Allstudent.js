import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {getAllStudent} from "../../actions/student_action"
import Titleheading from "../../components/Titleheading"
import { deleteSingleStu } from '../../actions/admin_action';
import { editSingleStu } from '../../actions/admin_action';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './Allstudent.css'

const Allstudent = () => {
    const dispatch = useDispatch() ;
    useEffect(()=>{
         dispatch(getAllStudent())
    },[])
    const data =useSelector(state=>state.getAllStuReducer)

    const Datafilter = data && data.allstudents && data.allstudents.filter(item => item.name !== "Admin")

     console.log(Datafilter)
   var  min = Math.ceil(1);
   var  max = Math.floor(12);

   const handleDelete = (Email) => {
      const data = {email: Email}
      dispatch(deleteSingleStu(data))
      console.log("Deleting student with Email:", Email);
      window.location.reload(); 
  };

   const handleEdit = (Email) => {
    console.log("Edit");
    const data = {email: Email}
    dispatch(editSingleStu(data))
    console.log("Editing student with Email:", Email);
    window.location.reload(); 
  };

 
    return (
      <div className='maindiv'>
        <Titleheading title="View All Student" />
        <table
          className="table table-bordered table-responsive-sm"
          style={{ width: "90%", border: "2px solid black", margin: "auto",backgroundColor:"white",borderRadius:"10px" }}
        >
          <thead style={{fontSize:"14px",textAlign:'center'}} className="thead-dark">
            <tr>
              <th>Name</th>

              {/* <th>class </th> */}
              <th>Batch</th>
              {/* <th>Roll No</th> */}
              <th>Index No</th>
              <th>Mobile</th>
              <th>Gender</th>
              <th>AdmissionYear</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>

          {Datafilter &&
            Datafilter.map((user) => (
              <tbody key={user.name} style={{ padding: "5px" }}>
                <tr className='tab_row' style={{padding:"5px",fontSize:"14px",lineHeight:"30px",justifyContent:"center"}}>
                  <td>{user.name}</td>

                  <td>{user.clsName}</td>
                  <td>{user.Roll_No}</td>
                  <td>{user.mobile}</td>
                  <td>{user.gender}</td>
                  <td>{user.addmision_year}</td>
                  <td  className='picture'> <img src={user.pic} alt="sksk1" className='picture'/></td>
                  {/* <td>
                  {!imageError ? (
                    <img
                      src={user.pic}
                      alt={user.name}
                      style={{ height: "50px", width: "50px" }}
                      onError={handleImageError}
                    />
                  ) : (
                    <span>Image Unavailable</span>
                  )}
                </td> */}
                  <td className='btnrow'>
                    <button className="editbtn" onClick={() => handleEdit(user.email)} style={{ marginLeft:"2px"}} > Edit </button>
                    <button className="deletebtn" onClick={() => handleDelete(user.email)} style={{ marginLeft:"2px"}} > Delete </button>
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
    );
};

export default Allstudent;