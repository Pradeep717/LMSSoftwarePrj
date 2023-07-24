import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UpdateTProfile } from "../../actions/user_action";

const Tprofile = ({ user }) => {
  console.log(user);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined);

  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  // console.log("B")
  // console.log(user)
  // console.log("A")
  console.log("Current User:");
  console.log(currentUser.user);
  console.log("Pic URL from user[0]:");
  if (user && user.length > 0 && user[0]) {
    console.log("Pic URL from user[0]:");
    console.log(user[0].pic);
  } else {
    console.log("User is undefined or empty");
  }
  console.log(currentUser.user[0]?.pic);

  useEffect(() => {
    if (url) {
      uploadFields();
    }
  }, [url]);

  const uploadPic = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "voting");
    data.append("cloud_name", "dj76d2css");
    fetch("https://api.cloudinary.com/v1_1/dj76d2css/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Url in uplaodpic");
        console.log(`url ${data.url}`);
        setUrl(data.url);
      })
      .catch((err) => {
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
    <div
      className="card"
      style={{
        width: "60%",
        margin: "auto",
        marginTop: "40px",
        overflow: "hidden",
        padding: "10px",
      }}
    >
      {user && (
        <>
          <div>
            <div style={{ margin: "auto" }}>
              <div style={{ textAlign: "center" }}>
                {user && user.length > 0 && user[0] && (
                  <img
                    src={user[0].pic}
                    alt="photo"
                    style={{
                      height: "200px",
                      width: "200px",
                      borderRadius: "100px",
                      margin: "auto",
                      marginBottom: "10px",
                    }}
                  />
                )}
              </div>
            </div>

            <Link
              to={`/teacher/dashboard/edit/${currentUser.user._id}`}
              className="edit_profile"
            >
              {" "}
              <i className="far fa-edit fa-2x"></i>{" "}
            </Link>

            <div
              style={{
                display: "flex",
                marginBottom: "50px",
                marginLeft: "60px",
              }}
            >
              <div className="file-field input-field">
                <div
                  className="btn #64b5f6 input-field2"
                  style={{ marginLeft: "20px" }}
                >
                  <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    style={{ marginTop: "10px", display: "flex" }}
                  />
                </div>
              </div>

              <button
                className="btn btn-success ml-2  btn_regis "
                onClick={() => PostData()}
              >
                Upload Image
              </button>
            </div>

            <div style={{ display: "flex" }}>
              <div style={{ width: "5%" }}></div>
              <div style={{ width: "50%" }}>
                <p>
                  <b>FullName:</b>
                  {currentUser.user.name}
                  {currentUser.user.surname}
                </p>

                <p>
                  <b>Teaching Area:</b>
                  {currentUser.user.teaching_area}
                </p>
                <p>
                  <b>Date Of Birth:{currentUser.user.date_of_birth}</b>
                  {}
                </p>
                <p>
                  <b>Email:</b>
                  {currentUser.user.email}
                </p>
                <p>
                  <b>Gender:</b>
                  {currentUser.user.gender}
                </p>
                <p>
                  <b>Qualification:</b>
                  {currentUser.user.qulification}
                </p>
              </div>
              <div style={{ width: "10%" }}></div>
              <div>
                <p>
                  <b>Employee Id :</b> {currentUser.user.empolyee_id}
                </p>

                <p>
                  <b>Joining Year:</b>
                  {currentUser.user.joining_year}
                </p>
                <p>
                  <b>Age:</b>
                  {currentUser.user.age}
                </p>
                <p>
                  <b>Mobile No.</b>
                  {currentUser.user.mobile}
                </p>
                <p>
                  <b>Address:</b>
                  {currentUser.user.address}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Tprofile;
