// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { userProfile } from "../../actions/user_action";
// import Titleheading from "../Titleheading";
// import Pdf from "react-to-pdf";

// const Marks = () => {
//   const [show, setShow] = useState();
//   const [semesterGPAs, setSemesterGPAs] = useState([]);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     if (localStorage.getItem("currentUser")) {
//       const userId = JSON.parse(localStorage.getItem("currentUser")).user._id;
//       dispatch(userProfile(userId));
//     }

//     // dispatch(userProfile())
//   }, []);

//   // useEffect(()=>{

//   // })
//   const { currentUser } = useSelector((state) => state.userProfileReducer);

//   const ref = React.useRef();
//   let sum = 0;

//   var pointArr = [];
//   const semesters = {};
//   const calculateCPGA = () => {
//     currentUser &&
//       currentUser[0].markList &&
//       currentUser[0].markList.forEach((user) => {
//         let semester = user.sem;
//         let num = user.credit;
//         let smark = user.smark;
//         let gradePoint;
//         sum += parseInt(num);

//         if (!semesters[semester]) {
//           semesters[semester] = {
//             totalCredit: 0,
//             totalGradePoint: 0,
//           };
//         }

//         if (smark >= 80) {
//           gradePoint = 4.0 * num;
//           pointArr.push(4.0 * num);
//         } else if (smark >= 75) {
//           gradePoint = 4.0 * num;
//           pointArr.push(4.0 * num);
//         } else if (smark >= 70) {
//           gradePoint = 3.7 * num;
//           pointArr.push(3.7 * num);
//         } else if (smark >= 65) {
//           gradePoint = 3.3 * num;
//           pointArr.push(3.3 * num);
//         } else if (smark >= 60) {
//           gradePoint = 3.0 * num;
//           pointArr.push(3.0 * num);
//         } else if (smark >= 55) {
//           gradePoint = 2.7 * num;
//           pointArr.push(2.7 * num);
//         } else if (smark >= 50) {
//           gradePoint = 2.3 * num;
//           pointArr.push(2.3 * num);
//         } else if (smark >= 45) {
//           gradePoint = 2.0 * num;
//           pointArr.push(2.0 * num);
//         } else if (smark >= 35) {
//           gradePoint = 1.7 * num;
//           pointArr.push(1.7 * num);
//         } else {
//           gradePoint = 0;
//           pointArr.push(0);
//         }

//         // semesters[semester].totalCredit += num;
//         semesters[semester].totalCredit += parseInt(num);
//         semesters[semester].totalGradePoint += parseFloat(gradePoint);
//       });

//       for (const key in semesters) {
//         let semester_gpa =
//           semesters[key].totalGradePoint / semesters[key].totalCredit;
//           semester_gpa = semester_gpa.toFixed(4);
//           console.log(semesters);
//         // console.log(`The ${key} semester GPA is : ${semester_gpa}`);
//         semesterGPAs.push({ semester: key, gpa: semester_gpa });
//       }
      

//   };

//   calculateCPGA();
//       useEffect(()=>{
//         setSemesterGPAs(semesterGPAs);
//         console.log("HI");
//       })

  
     

//   var cgpa = pointArr.reduce((a, b) => a + b, 0) / sum;
  // return (
  //   <div>
  //     {/* <button type="button" onClick={handleDownloadPdf}>
  //         Download as PDF
  //       </button> */}
  //     <div>
  //       <div>
  //         <h4
  //           style={{
  //             textAlign: "center",
  //             marginLeft: "-140px",
  //             marginBottom: "50px",
  //             marginTop: "50px",
  //           }}
  //         >
  //           Your Result Sheet
  //         </h4>
  //       </div>

  //       <table style={{ width: "80%", margin: "auto" }} ref={ref}>
  //         <thead style={{ fontSize: "22px" }}>
  //           <tr>
  //             <th>Semester</th>
  //             <th>Subject</th>
  //             <th>Credit</th>
  //             <th>Mark </th>
  //             <th>Grade</th>
  //             <th>Point</th>
  //           </tr>
  //         </thead>

  //         {currentUser &&
  //           currentUser[0].markList &&
  //           currentUser[0].markList.map((user) => (
  //             <tbody key={user.name} style={{ padding: "5px" }}>
  //               <tr style={{ height: "50px" }}>
  //                 <td>{user.sem}</td>
  //                 <td>{user.subject}</td>
  //                 <td>{user.credit}</td>
  //                 <td>{user.smark}</td>
  //                 <td style={{ fontSize: "19px", fontWeight: "700" }}>
  //                   {user.smark >= 80 && <>A+</>}
  //                   {user.smark < 80 && user.smark >= 75 && <>A</>}
  //                   {user.smark < 75 && user.smark >= 70 && <>A-</>}
  //                   {user.smark < 70 && user.smark >= 65 && <>B+</>}
  //                   {user.smark < 65 && user.smark >= 60 && <>B</>}
  //                   {user.smark < 60 && user.smark >= 55 && <>B-</>}
  //                   {user.smark < 55 && user.smark >= 50 && <>C+</>}
  //                   {user.smark < 50 && user.smark >= 45 && <>C</>}
  //                   {user.smark < 45 && user.smark >= 35 && <>C-</>}
  //                   {user.smark < 35 && user.smark >= 0 && <>E</>}
  //                 </td>
  //                 <td style={{ fontSize: "19px", fontWeight: "700" }}>
  //                   {user.smark >= 80 && <>4.0</>}
  //                   {user.smark < 80 && user.smark >= 75 && <>4.0</>}
  //                   {user.smark < 75 && user.smark >= 70 && <>3.7</>}
  //                   {user.smark < 70 && user.smark >= 65 && <>3.3</>}
  //                   {user.smark < 65 && user.smark >= 60 && <>3.0</>}
  //                   {user.smark < 60 && user.smark >= 55 && <>2.7</>}
  //                   {user.smark < 55 && user.smark >= 50 && <>2.3</>}
  //                   {user.smark < 50 && user.smark >= 45 && <>2.0</>}
  //                   {user.smark < 45 && user.smark >= 35 && <>1.7</>}
  //                   {user.smark < 35 && user.smark >= 0 && <>0</>}
  //                 </td>
  //               </tr>
  //             </tbody>
  //           ))}
  //       </table>

  //       <hr />
  //       <div style={{ width: "55%", margin: "auto" }}>
  //         <p style={{ float: "right" }}>
  //           CGPA:<b> {cgpa.toFixed(2)} </b>
  //         </p>
  //         <div>
  //           {semesterGPAs.map((semesterGPA, index) => (
  //             <div key={index}>
  //             Semester {semesterGPA.semester} GPA: {semesterGPA.gpa}
  //           </div>
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //     <div></div>
  //   </div>
  // );
// };

// export default Marks;



import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userProfile } from "../../actions/user_action";
import Titleheading from "../Titleheading";
import Pdf from "react-to-pdf";
import { useReactToPrint } from "react-to-print";
import "./Result.css";

const Marks = () => {
  const [show, setShow] = useState();
  const [semesterGPAs, setSemesterGPAs] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      const userId = JSON.parse(localStorage.getItem("currentUser")).user._id;
      dispatch(userProfile(userId));
    }
  }, []);

  const { currentUser } = useSelector((state) => state.userProfileReducer);

  const ref = React.useRef();
  const componentPDF = useRef();

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    onAfterPrint: () => alert("Data Saved in PDF"),
  });

  let sum = 0;
  var pointArr = []; // Declare pointArr here

  //calculate GPA function
  const calculateCPGA = () => {
    if (currentUser && currentUser[0].markList) {
      const semesters = {};

      currentUser[0].markList.forEach((user) => {
        const semester = user.sem;
        const num = user.credit;
        const smark = user.smark;
        let gradePoint;
        sum += parseInt(num);

        if (!semesters[semester]) {
          semesters[semester] = {
            totalCredit: 0,
            totalGradePoint: 0,
          };
        }

        if (smark >= 80) {
          gradePoint = 4.0 * num;
          pointArr.push(4.0 * num);
        } else if (smark >= 75) {
          gradePoint = 4.0 * num;
          pointArr.push(4.0 * num);
        } else if (smark >= 70) {
          gradePoint = 3.7 * num;
          pointArr.push(3.7 * num);
        } else if (smark >= 65) {
          gradePoint = 3.3 * num;
          pointArr.push(3.3 * num);
        } else if (smark >= 60) {
          gradePoint = 3.0 * num;
          pointArr.push(3.0 * num);
        } else if (smark >= 55) {
          gradePoint = 2.7 * num;
          pointArr.push(2.7 * num);
        } else if (smark >= 50) {
          gradePoint = 2.3 * num;
          pointArr.push(2.3 * num);
        } else if (smark >= 45) {
          gradePoint = 2.0 * num;
          pointArr.push(2.0 * num);
        } else if (smark >= 35) {
          gradePoint = 1.7 * num;
          pointArr.push(1.7 * num);
        } else {
          gradePoint = 0;
          pointArr.push(0);
        }

        semesters[semester].totalCredit += parseInt(num);
        semesters[semester].totalGradePoint += parseFloat(gradePoint);
        console.log(pointArr);
      });

      const calculatedSemesterGPAs = [];
      for (const key in semesters) {
        const semester_gpa =
          semesters[key].totalGradePoint / semesters[key].totalCredit;
        calculatedSemesterGPAs.push({
          semester: key,
          gpa: semester_gpa.toFixed(4),
        });
      }

      setSemesterGPAs(calculatedSemesterGPAs);
    }
  };

  useEffect(() => {
    calculateCPGA();
  }, [currentUser]);

return (
    <div style={{ width: "75%", margin: "auto" }}>
      <div className="resultsheet" ref={componentPDF}>
        <Titleheading title="Result Sheet" />

        <table style={{ width: "90%", margin: "auto" }} ref={ref}>
          <thead
            style={{
              fontSize: "16px",
              backgroundColor: "black",
              color: "white",
              textAlign: "center",
              fontFamily: "Arial",
              gap: "15px",
            }}
          >
            <tr>
              <th>Semester</th>
              <th>Subject</th>
              <th>Credit</th>
              <th>Mark </th>
              <th>Grade</th>
              <th>Point</th>
            </tr>
          </thead>

          {currentUser &&
            currentUser[0].markList &&
            currentUser[0].markList.map((user) => (
              <tbody
                key={user.name}
                style={{
                  padding: "5px",
                  textAlign: "center",
                  fontFamily: "Arial",
                  fontSize: "15px",
                }}
              >
                <tr style={{ height: "50px" }}>
                  <td>{user.sem}</td>
                  <td>{user.subject}</td>
                  <td>{user.credit}</td>
                  <td>{user.smark}</td>
                  <td style={{ fontSize: "15px", fontWeight: "100" }}>
                    {user.smark >= 80 && <>A+</>}
                    {user.smark < 80 && user.smark >= 75 && <>A</>}
                    {user.smark < 75 && user.smark >= 70 && <>A-</>}
                    {user.smark < 70 && user.smark >= 65 && <>B+</>}
                    {user.smark < 65 && user.smark >= 60 && <>B</>}
                    {user.smark < 60 && user.smark >= 55 && <>B-</>}
                    {user.smark < 55 && user.smark >= 50 && <>C+</>}
                    {user.smark < 50 && user.smark >= 45 && <>C</>}
                    {user.smark < 45 && user.smark >= 35 && <>C-</>}
                    {user.smark < 35 && user.smark >= 0 && <>E</>}
                  </td>

                  <td style={{ fontSize: "15px", fontWeight: "100" }}>
                    {user.smark >= 80 && <>4.0</>}
                    {user.smark < 80 && user.smark >= 75 && <>4.0</>}
                    {user.smark < 75 && user.smark >= 70 && <>3.7</>}
                    {user.smark < 70 && user.smark >= 65 && <>3.3</>}
                    {user.smark < 65 && user.smark >= 60 && <>3.0</>}
                    {user.smark < 60 && user.smark >= 55 && <>2.7</>}
                    {user.smark < 55 && user.smark >= 50 && <>2.3</>}
                    {user.smark < 50 && user.smark >= 45 && <>2.0</>}
                    {user.smark < 45 && user.smark >= 35 && <>1.7</>}
                    {user.smark < 35 && user.smark >= 0 && <>0</>}
                  </td>
                </tr>
              </tbody>
            ))}
        </table>

        <hr />
        <div style={{ width: "55%", margin: "auto" }}>
          {/* <p style={{ float: "right" }}>
            CGPA:<b> {cgpa.toFixed(2)} </b>
          </p> */}
          <div>
            {semesterGPAs.map((semesterGPA, index) => (
              <div key={index}>
                Semester {semesterGPA.semester} GPA:{" "}
                {parseFloat(semesterGPA.gpa).toFixed(2)}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <button className="pdfbtn" onClick={generatePDF}>
          Download as PDF
        </button>
      </div>
    </div>
  );
};

export default Marks;

