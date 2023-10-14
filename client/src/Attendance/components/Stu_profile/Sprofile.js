import React, { useEffect, useState,useContext } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { UpdateProfile } from '../../actions/user_action';
import './Sprofile.css';
import { DarkModeContext } from '../../../App';

const Sprofile = () => {
  const [image, setImage] = useState('');
  const { isDarkMode } = useContext(DarkModeContext);
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
    <div className={`maincard ${isDarkMode ? "darkmodecard" : ""}`}>
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
