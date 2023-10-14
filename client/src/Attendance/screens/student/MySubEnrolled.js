// import React from 'react';
// import { useSelector } from 'react-redux';

// const MySubjects = () => {
//   const { currentUser } = useSelector((state) => state.userProfileReducer);

//   // Access the subjects array from the current user
//   const subjects = currentUser && currentUser[0].subjects;
//   console.log("In enroll sub")
//   console.log(subjects)

//   return (
//     <div>
//       <h2>My Enrolled Subjects</h2>
//       <table style={{ width: "80%", margin: "auto" }}>
//         <thead style={{ fontSize: "22px" }} >
//           <tr>
//             <th>Subject Code</th>
//             <th>Subject Name</th>
//             <th>Credit</th>
//             <th>Batch</th>
//             <th>Semester</th>
//             <th>Type</th>
//           </tr>
//         </thead>

        
//           {subjects &&
//             subjects.map((subject) => (
//               <tbody key={subject.id} style={{ padding: "5px" }}>
//               <tr style={{ height: "50px" }}>
//                 <td>{subject.sub_code}</td>
//                 <td>{subject.sub_name}</td>
//                 <td>{subject.sub_credit}</td>
//                 <td>{subject.sub_class}</td>
//                 <td>{subject.sub_sem}</td>
//                 <td>{subject.sub_type}</td>
//               </tr>
//               </tbody>
//             ))}
        
//       </table>
//     </div>
//   );
// };

// export default MySubjects;


// import React from 'react';
// import { useSelector } from 'react-redux';

// const MySubjects = () => {
//   const { currentUser } = useSelector((state) => state.userProfileReducer);

//   // Access the subjects array from the current user
//   const subjects = currentUser && currentUser[0].subjects;
//   console.log("In enroll sub")
//   console.log(subjects)

//   // Group subjects by semester
//   const subjectsBySemester = subjects && subjects.reduce((acc, subject) => {
//     const semester = subject.sub_sem;
//     if (!acc[semester]) {
//       acc[semester] = [];
//     }
//     acc[semester].push(subject);
//     return acc;
//   }, {});

//   return (
//     <div>
//       <h2>My Enrolled Subjects</h2>
//       {subjectsBySemester &&
//         Object.entries(subjectsBySemester).map(([semester, subjects]) => (
//           <div key={semester}>
//             <h3>Semester {semester}</h3>
//             <table style={{ width: "80%", margin: "auto" }}>
//               <thead style={{ fontSize: "22px" }}>
//                 <tr>
//                   <th>Subject Code</th>
//                   <th>Subject Name</th>
//                   <th>Credit</th>
//                   <th>Batch</th>
//                   <th>Semester</th>
//                   <th>Type</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {subjects.map((subject) => (
//                   <tr key={subject.id} style={{ height: "50px" }}>
//                     <td>{subject.sub_code}</td>
//                     <td>{subject.sub_name}</td>
//                     <td>{subject.sub_credit}</td>
//                     <td>{subject.sub_class}</td>
//                     <td>{subject.sub_sem}</td>
//                     <td>{subject.sub_type}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ))}
//     </div>
//   );
// };

// export default MySubjects;


import React, { useState ,useContext} from 'react';
import { useSelector } from 'react-redux';
import Titleheading from '../../components/Titleheading';
import './MyTimeTable.css';
import { DarkModeContext } from "../../../App";

const MySubjects = () => {
  const { isDarkMode } = useContext(DarkModeContext);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const { currentUser } = useSelector((state) => state.userProfileReducer);
  console.log("Mysub ")
  console.log(currentUser)
  console.log("Mysub ")


  // Access the subjects array from the current user
  const subjects = currentUser && currentUser[0].subjects;

  // Group subjects by semester
  const subjectsBySemester = subjects && subjects.reduce((acc, subject) => {
    const semester = subject.sub_sem;
    if (!acc[semester]) {
      acc[semester] = [];
    }
    acc[semester].push(subject);
    return acc;
  }, {});

  return (
    <div className={isDarkMode ? 'mainall darkmodemain' : 'mainall'}>
      <Titleheading title="My Enrolled Subjects"/>
      {subjectsBySemester &&
        Object.entries(subjectsBySemester).map(([semester, subjects]) => (
          <div key={semester} style={{alignItems:"center",justifyContent:"center",margin:"auto",padding:"auto"}}>
            <p style={{width:"100%",color:"white",backgroundColor:"black",cursor:"pointer",margin:"auto",gap:"10px",marginBottom:"10px",textAlign:"center",fontSize:"20px"}} className='textwrap' onClick={() => setSelectedSemester(semester === selectedSemester ? null : semester)}>Semester {semester}</p>
            {selectedSemester === semester && (
              <table style={{ width: "90%", margin: "auto",marginBottom:"40px",border:"1px #e0f1f solid"}}>
                <thead style={{ fontSize: "13px",fontFamily:"Poppins",backgroundColor:"#800000",color:"white",padding:"5px",fontWeight:"30",height:"50px" }}>
                  <tr style={{fontSize:"20px"}}>
                    <th>Subject Code</th>
                    <th>Subject Name</th>
                    <th>Credit</th>
                    <th>Batch</th>
                    <th>Semester</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((subject) => (
                    <tr key={subject.id} style={{ height: "50px" }}>
                      <td>{subject.sub_code}</td>
                      <td>{subject.sub_name}</td>
                      <td>{subject.sub_credit}</td>
                      <td>{subject.sub_class}</td>
                      <td>{subject.sub_sem}</td>
                      <td>{subject.sub_type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ))}
    </div>
  );
};

export default MySubjects;
