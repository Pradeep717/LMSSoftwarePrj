import React, { useState, useEffect, useCallback,useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSubAction } from "../../actions/admin_action";
import { Link, useParams } from "react-router-dom";
import { Switch, Route, useHistory } from "react-router-dom";
import { getStuBySubject, getSubByBatch } from "../../actions/student_action";
import { DarkModeContext } from "../../../App";
import './SubjectUpdate.css';

const SubjectsMaskUpd = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isDarkMode } = useContext(DarkModeContext);

  useEffect(() => {
    var obj = {
      sub_class: props.match.params.id,
    };
    dispatch(getSubByBatch(obj));
  }, [props.match.params.id]);
  const subjects = useSelector(
    (state) => state.getSubByBatchReducer.subjects
  );
  const loading = useSelector((state) => state.getSubByBatchReducer.loading);

  const handleClick = useCallback(
    async (value) => {
      var obj = {
        sub_code: value,
      };
      dispatch(getStuBySubject(obj));
    },
    [dispatch]
  );

  const studentsBySub = useSelector(
    (state) => state.getStuBySubjectReducer.studentsBySub
  );

  if (!Array.isArray(subjects)) {
    return <div>Loading...1</div>;
  }

  return (
    <div className={`div-main ${isDarkMode ? "dark-mode" : ""}`}>
      <table style={{ width: "95%", margin: "auto" }}>
        <thead style={{background:"none"}}>
          <tr>
            <th>No.</th>
            <th>Semester</th>
            <th>Subject Name</th>
            <th>Subject Code </th>
            <th>Subject Credit</th>
            <th>Subject Type</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subitem, index) => (
            <tr key={subitem._id} style={{ height: "50px" }}>
              <td>{index + 1}</td>
              <td>{subitem.sub_sem}</td>
              <td onClick={() => handleClick(subitem.sub_code)}>
                <Link
                  to={`/teacher/dashboard/subjectData/${subitem.sub_code}`}
                >
                  {subitem.sub_name}
                </Link>
              </td>
              <td onClick={() => handleClick(subitem.sub_code)}>
                <Link
                  to={`/teacher/dashboard/SubjectAttendance/${subitem.sub_code}`}
                >
                  {subitem.sub_code}
                </Link>
              </td>
              {/* <td>{subitem.sub_code}</td> */}
              <td>{subitem.sub_credit}</td>
              <td>{subitem.sub_type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubjectsMaskUpd;



// //new
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllSubAction } from "../../actions/admin_action";
// import { Link,useParams } from "react-router-dom";
// import { Switch,Route,useHistory } from 'react-router-dom';
// import { getStuBySubject, getSubByBatch } from "../../actions/student_action";


// const SubjectsMaskUpd = (props) => {
//   const dispatch = useDispatch();
//   const history = useHistory();

//   useEffect(() => { 
//     var obj = {
//       sub_class: props.match.params.id,
//     };
//     dispatch(getSubByBatch(obj));
//   }, [props.match.params.id]);
//   const subjects = useSelector((state) => state.getSubByBatchReducer.subjects);
//   const loading = useSelector((state) => state.getSubByBatchReducer.loading);
//   console.log(loading);

//   console.log("Nice");
//   console.log(subjects);


//   const filterSub = subjects;
//   // if (loading || !Array.isArray(subjects)) {
//   //   return <div>Loading...1</div>;
//   // }
//   const handleClick = async (value) => {
//     var obj = {
//       sub_code: value
//     }
//     // setSClass(value);
//     dispatch(getStuBySubject(obj));
// }

// // const studentsBySub=useSelector(state=>state.getStuBySubjectReducer)
// const studentsBySub = useSelector((state) => state.getStuBySubjectReducer.studentsBySub);

// console.log(studentsBySub);




//   if ( !Array.isArray(subjects)) {
//     return <div>Loading...1</div>;
//   }

//   return (
//     <div>
//       <table style={{ width: "80%", margin: "auto" }}>
//         <thead style={{ fontSize: "22px" }}>
//           <tr>
//             <th>No.</th>
//             <th>Semester</th>
//             <th>Subject Name</th>
//             <th>Subject Code </th>
//             <th>Subject Credit</th>
//             <th>Subject Type</th>
//           </tr>
//         </thead>
//         <tbody>
//         {subjects.map((subitem, index) => (
//           <tr key={subitem._id} style={{ height: "50px" }}>
//       <td>{index + 1}</td>
//       <td>{subitem.sub_sem}</td>
//       <td onClick={()=> handleClick(subitem.sub_code)}>
//       <Link to={`/teacher/dashboard/subjectUpdate/subjectData/${subitem.sub_code}`}>
//         {subitem.sub_name}
//       </Link>
//       {/* <li key={item} onClick={()=> handleClick(item)} style={{color:"white",fontSize:"20px",height:"30px",textDecoration:"none"}}>
//                         <Link to={`/teacher/dashboard/attendance/${item}`} style={{color:"white",fontSize:"20px",height:"30px",textDecoration:"none"}}>{item} Batch </Link></li>
//   */}
//     </td>      
//       <td>{subitem.sub_code}</td>
//       <td>{subitem.sub_credit}</td>
//       <td>{subitem.sub_type}</td>
//     </tr>
  
// ))}
//         </tbody>
//       </table>


//     </div>
//   );
// };

// export default SubjectsMaskUpd;


// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getSubByBatch } from "../../actions/student_action";
// import { Link, useParams, useHistory } from "react-router-dom";

// const SubjectsMaskUpd = () => {
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const { id } = useParams();

//   useEffect(() => {
//     dispatch(getSubByBatch({ sub_class: id }));
//   }, [dispatch, id]);

//   const subjects = useSelector((state) => state.getSubByBatchReducer.subjects);
//   const loading = useSelector((state) => state.getSubByBatchReducer.loading);

//   if (loading || !Array.isArray(subjects)) {
//     return <div>Loading...</div>;
//   }

//   const handleSubjectClick = (sub_code) => {
//     history.push(`/teacher/dashboard/subjectUpdate/subject/${sub_code}`);
//   };

//   return (
//     <div>
//       <table style={{ width: "80%", margin: "auto" }}>
//         <thead style={{ fontSize: "22px" }}>
//           <tr>
//             <th>No.</th>
//             <th>Semester</th>
//             <th>Subject Name</th>
//             <th>Subject Code</th>
//             <th>Subject Credit</th>
//             <th>Subject Type</th>
//           </tr>
//         </thead>
//         <tbody>
//           {subjects.map((subitem, index) => (
//             <tr key={subitem._id} style={{ height: "50px" }}>
//               <td>{index + 1}</td>
//               <td>{subitem.sub_sem}</td>
//               <td>
//                 <Link
//                   to={`/teacher/dashboard/subjectUpdate/subjectData/${subitem.sub_code}`}
//                   onClick={() => handleSubjectClick(subitem.sub_code)}
//                 >
//                   {subitem.sub_name}
//                 </Link>
//               </td>
//               <td>{subitem.sub_code}</td>
//               <td>{subitem.sub_credit}</td>
//               <td>{subitem.sub_type}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default SubjectsMaskUpd;
