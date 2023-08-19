import React, { useEffect, useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { UpdateTProfile } from '../../actions/user_action';
import './Tprofile.css';
import { DarkModeContext } from '../../../App';

const Tprofile = ({ user }) => {
  const [image, setImage] = useState('');
  const [url, setUrl] = useState(undefined);
  const { isDarkMode } = useContext(DarkModeContext);
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    if (url) {
      uploadFields();
    }
  }, [url]); // Add url as a dependency for the useEffect

  const uploadPic = () => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'voting');
    data.append('cloud_name', 'dj76d2css');
    fetch('https://api.cloudinary.com/v1_1/dj76d2css/image/upload', {
      method: 'post',
      body: data,
    }) 
      .then(res => res.json())
      .then(data => {
        setUrl(data.url);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const uploadFields = () => {
    dispatch(UpdateTProfile(url));
  };

  const PostData = () => {
    if (image) {
      uploadPic();
    } else {
      uploadFields();
    }
  };

  return (
    <div className={`divmain ${isDarkMode ? 'd-mode' : ''}`}>
      {user && (
        <>
        <div className="profile-container">
          <div className="profile-image">
            {user[0] && (
            <img src={user[0].pic} alt="profile" />
            )}
          </div>

          <Link to={`/teacher/dashboard/edit/${currentUser.user._id}`} className="edit-profile-btn">
            Edit Profile
          </Link>

          <div className="upload-container">
            <input type="file" onChange={e => setImage(e.target.files[0])} />
            <button className="upload-btn" onClick={() => PostData()}>
              Upload Image
            </button>
          </div>

          <div className="profile-details">
            <div className="left-details">
              <p><b>Full Name:</b> {currentUser.user.name} {currentUser.user.surname}</p>
              <p><b>Teaching Area:</b> {currentUser.user.teaching_area}</p>
              <p><b>Date Of Birth:</b> {currentUser.user.date_of_birth}</p>
              <p><b>Email:</b> {currentUser.user.email}</p>
              <p><b>Gender:</b> {currentUser.user.gender}</p>
              <p><b>Qualification:</b> {currentUser.user.qulification}</p>
            </div>
            <div className="right-details">
              <p><b>Employee Id:</b> {currentUser.user.empolyee_id}</p>
              <p><b>Joining Year:</b> {currentUser.user.joining_year}</p>
              <p><b>Age:</b> {currentUser.user.age}</p>
              <p><b>Mobile No.:</b> {currentUser.user.mobile}</p>
              <p><b>Address:</b> {currentUser.user.address}</p>
            </div>
          </div>
        </div>
        </>
      )}
    </div>
  );
};

export default Tprofile;