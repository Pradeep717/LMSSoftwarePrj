import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSubAction } from "../../actions/admin_action";
import { enrollSubjectAction } from "../../actions/student_action";
import Titleheading from "../../components/Titleheading";
// import { useState } from "react";

const MySub = () => {
  const [enrollkeys, setEnrollkeys] = useState({});
  const [enrolledSubjects, setEnrolledSubjects] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSubAction());
  }, []);

  const { allSubject } = useSelector((state) => state.getAllSubReducer);
  const { currentUser } = useSelector((state) => state.userProfileReducer);

  console.log("Hello at subjects");
  //  console.log(`${currentUser} Hello`);
  const className = currentUser && currentUser[0].clsName;

  const filterSub =
    allSubject && allSubject.filter((item) => item.sub_class == className);
  console.log(filterSub);
  if (currentUser) {
    console.log(currentUser[0]._id);
  }

  const handleEnrollSubject = (subjectDetails) => {
    if (
      enrollkeys[subjectDetails._id] &&
      enrollkeys[subjectDetails._id] == subjectDetails.sub_enrollmentkey
    ) {
      const currentUserId = currentUser && currentUser[0]._id;
      dispatch(enrollSubjectAction({ subjectDetails, currentUserId }));
      setEnrolledSubjects([...enrolledSubjects, subjectDetails.sub_code]);
    } else {
      // Handle incorrect enrollment key
      alert("Incorrect enrollment key");
    }
  };

  return (
    <div style={{width:"65%",margin:"auto",minHeight:"100vh",marginTop:"40px",backgroundColor:"white",borderRadius:"5px",padding:"10px",alignItems:"center",textAlign:"center",marginBottom:"60px"}}>
      <Titleheading  title="Module Enrolment"/>
      <table style={{ width: "95%", margin: "auto",marginTop:"50px"}}>
        <thead style={{ fontSize: "13px",backgroundColor:"black",color:"white",padding:"8px",height:"30px"}}>
          <tr>
            {/* <th>No.</th> */}
            <th>Semester</th>
            <th>Subject Name</th>
            <th>Subject Code </th>
            <th>SubjectCredit</th>
            <th>Subject Type</th>
            <th>Enrolment</th>
          </tr>
        </thead>

        {filterSub &&
          filterSub
            .sort((a, b) => a.sub_sem - b.sub_sem)
            .map((item, index) => {
              const isEnrolled =
                (currentUser &&
                  currentUser[0].subjects &&
                  currentUser[0].subjects.some(
                    (subject) => subject.sub_code == item.sub_code
                  )) ||
                enrolledSubjects.includes(item.sub_code);

              return (
                <tbody key={item._id} style={{ padding: "5px" }}>
                  <tr style={{ height: "50px",fontSize:"12px",alignItems:"center" }}>
                    {/* <td>{index + 1}</td> */}
                    <td>{item.sub_sem}</td>
                    <td>{item.sub_name}</td>
                    <td>{item.sub_code}</td>
                    <td>{item.sub_credit}</td>
                    <td>{item.sub_type}</td>
                    <td>
                      {isEnrolled ? (
                        <span>Enrolled</span>
                      ) : (
                        <>
                          <input
                            type="string"
                            style={{width:"100px",height:"30px",fontSize:"12px",alignItems:"center"}}
                            placeholder="Enrollment key"
                            value={enrollkeys[item._id]}
                            className="form-control mod_input_class"
                            onChange={(e) =>
                              setEnrollkeys({
                                ...enrollkeys,
                                [item._id]: e.target.value,
                              })
                            }
                          />
                          <button
                            style={{backgroundColor:"#0c8c8c",color:"white",borderRadius:"5px",height:"30px",width:"100px"}}
                            onClick={() => handleEnrollSubject(item)}
                          >
                            Enroll
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                </tbody>
              );
            })}
      </table>
    </div>
  );
};

export default MySub;



