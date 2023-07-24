// import React,{useEffect,useState} from 'react';
// import { useDispatch, useSelector } from 'react-redux'
// import { Link } from 'react-router-dom';
// import {UpdateProfile} from "../../actions/user_action"
// import './Sprofile.css'

// const Sprofile = () => {
//     const [image, setImage] = useState("");
//     const [url, setUrl] = useState(undefined);
//     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//     const user = currentUser.user;

//     console.log('sprofile')
//     console.log(user)
//     console.log('sprofile')


//     const dispatch = useDispatch() ;

    
//     useEffect(() => {
//         if (url) {
//           uploadFields();
//         }
//       });
    
//       const uploadPic = () => {
//         const data = new FormData();
//         data.append("file", image);
//         // data.append("upload_preset", "voting");
//         // data.append("cloud_name", "dvfpkko1z");
//         // fetch("https://api.cloudinary.com/v1_1/dvfpkko1z/image/upload", {
//         //   method: "post",
//         //   body: data,
//         // })
//         data.append("upload_preset", "voting");
//         data.append("cloud_name", "dj76d2css");
//         fetch("https://api.cloudinary.com/v1_1/dj76d2css/image/upload", {
//           method: "post",
//           body: data,
//         })
//           .then((res) => res.json())
//           .then((data) => {
//             setUrl(data.url);
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       };

//       const uploadFields = () => {
//         dispatch(UpdateProfile(url));
//       };

//       const PostData = () => {
//         if (image) {
//           uploadPic();
//         } else {
//           uploadFields();
//         }
//       };

//     return (
//         <div className='maincard'>
//             {user && <>
//                 <div className='inneritems'>
//                     <div style={{marginLeft:"30%",marginBottom:"20px"}}>
//                     {/* <img src={ user[0].pic} alt="Profile" className='profilepic'/> */}
//                     </div>
//                     <Link to="/student/dashboard/edit" className='editicon'><i className="far fa-edit fa-2x"></i> </Link>
               
//                     <div>
                    
//                     <div className="file-field input-field">
//                     <div className="" style={{ marginLeft: "30px",marginTop:"10px" }}>
//                      <input type="file" onChange={(e) => setImage(e.target.files[0])} style={{marginTop:"10px"}}/>
//                      </div>
            
//                     </div>
//                     <button className="uploadbtn" onClick={() => PostData()}>
//                       Upload Image
//                     </button>

//                     </div>
//                    <div className='details'>
                    
//                        <div className='rowdet'>
//                          <p><b>FullName : </b>{user[0].name}{user[0].surname}</p>
//                          <p><b>Gender : </b>{user[0].gender}</p>
//                           {/* <p><b>Mother Name: </b>{user[0].mother_name}</p> */}
//                           <p><b>Email : </b>{user[0].email}</p>
//                           <p><b>Batch : </b>{user[0].clsName}</p>
//                           {/* <p><b>Date Of Birth: </b>{}</p> */}
                          
                          
                          
//                        </div>
                       
//                        <div className='rowdet'>
//                         <p><b>Registration Number. : </b> {user[0].Roll_No}</p>
//                         {/* <p><b>Father Name:</b>{user[0].father_name}</p> */}
//                         <p><b>Admission Year : </b>{user[0].addmision_year}</p>
//                         {/* <p><b>Age:</b>{user[0].age}</p> */}
//                         <p><b>Mobile No : </b>{user[0].mobile}</p>
//                         <p><b>Address : </b>{user[0].address}</p>
//                        </div>
//                    </div>
                 
//                 </div>
//             </>}
           
         
//         </div>
//     );
// };

// export default Sprofile;

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { UpdateProfile } from '../../actions/user_action';
import './Sprofile.css';

const Sprofile = () => {
  const [image, setImage] = useState('');
  const [url, setUrl] = useState(undefined);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const user = currentUser.user;
  console.log(user)
  console.log(user.pic)

  const dispatch = useDispatch();

  useEffect(() => {
    if (url) {
      uploadFields();
    }
  });

  const uploadPic = () => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'voting');
    data.append('cloud_name', 'dj76d2css');
    fetch('https://api.cloudinary.com/v1_1/dj76d2css/image/upload', {
      method: 'post',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadFields = () => {
    dispatch(UpdateProfile(url));
  };

  const PostData = () => {
    if (image) {
      uploadPic();
    } else {
      uploadFields();
    }
  };

  return (
    <div className="maincard">
      {user && (
        <>
          <div className="inneritems">
            <div style={{ marginLeft: '30%', marginBottom: '20px' }}>
              <img src={user.pic} alt="Profile" className="profilepic" />
            </div>
            <Link to="/student/dashboard/edit" className="editicon">
              <i className="far fa-edit fa-2x"></i>{' '}
            </Link>

            <div>
              <div className="file-field input-field">
                <div
                  className=""
                  style={{ marginLeft: '30px', marginTop: '10px' }}
                >
                  <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    style={{ marginTop: '10px', display: 'flex'}}
                    />
                </div>
              </div>
              <button className="uploadbtn" onClick={() => PostData()}>
                Upload Image
              </button>
            </div>
            <div className="details">
              <div className="rowdet">
                <p>
                  <b>FullName : </b>
                  {user.name}
                  {user.surname}
                </p>
                <p>
                  <b>Gender : </b>
                  {user.gender}
                </p>
                {/* <p><b>Mother Name: </b>{user.mother_name}</p> */}
                <p>
                  <b>Email : </b>
                  {user.email}
                </p>
                <p>
                  <b>Batch : </b>
                  {user.clsName}
                </p>
                {/* <p><b>Date Of Birth: </b>{}</p> */}
              </div>

              <div className="rowdet">
                <p>
                  <b>Registration Number. : </b> {user.Roll_No}
                </p>
                {/* <p><b>Father Name:</b>{user.father_name}</p> */}
                <p>
                  <b>Admission Year : </b>
                  {user.addmision_year}
                </p>
                {/* <p><b>Age:</b>{user.age}</p> */}
                <p>
                  <b>Mobile No : </b>
                  {user.mobile}
                </p>
                <p>
                  <b>Address : </b>
                  {user.address}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Sprofile;
