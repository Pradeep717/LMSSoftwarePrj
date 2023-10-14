import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStuBySubject, getStudentByClass, updateStudentMarks,makeStuAttendance } from "../actions/student_action";
import * as XLSX from "xlsx";
import { getAllSubAction } from "../actions/admin_action";
import "./SubjectData.css";
import { BASE_URL } from "../../helper";

import { useHistory, Link } from "react-router-dom";
import moment from "moment";
// import { useDispatch, useSelector } from "react-redux";
// import { getStudentByClass, makeStuAttendance } from "../actions/student_action";



const SubjectData = (props) => {
  const [error, setError] = useState(null);
  const [uploadedData, setUploadedData] = useState(null);
  const [excelData, setExcelData] = useState(null);
  const [exportedData, setExportedData] = useState(null);
  const [exportedDataAtt, setExportedDataAtt] = useState(null);
  const [excelMarksUrl, setexcelMarksUrl] = useState(null);
  const [excelMarksUrl2, setexcelMarksUrl2] = useState(null);
  const [subject, setsubject] = useState(null);

  const [currentDate, setCurrentDate] = useState("");
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [sem, setSem] = useState("");
  //const [subject, setSubject] = useState("");
  const [smark, setMark] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState("");
  const [attendanceInput, setAttendanceInput] = useState("");

  //for single input
 

  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    console.log("getAllSubAction")
    dispatch(getAllSubAction());
  }, []);

  //1
  useEffect(() => {
    console.log("getStudentByClass")

    var obj = {
      clsName: props.match.params.id,
    };
    dispatch(getStudentByClass(obj));
  }, [props.match.params.id]);  // need to add subject

 // const students = useSelector((state) => state.getStuByClassReducer);
  // console.log("Student by class")
  // console.log(props)
  // console.log(students); // no need

  const exTractNumber = (str) => {
    return str.replace(/[^0-9]/g, "");
  };//

  var ans, curDate;

  const newFun = async () => {
    const formatted = moment(Date.now()).format("L");

    curDate = await exTractNumber(formatted);
    setCurrentDate(curDate);
  };

  newFun(); ///

  /// method
  const makeAttendance = async (item, value) => {
    let currentTimestamp = Date.now();
  
    const formatted = moment(currentTimestamp).format("L");
  
    ans = await exTractNumber(formatted);
    const Obj = {
      timestamp: currentTimestamp,
      type: value,
      StudentId: item._id,
      dateId: ans,
      date: date,
      startTime: startTime,
      endTime: endTime,
    };
  
    var another = {
      clsName: props.match.params.id,
    };
    dispatch(makeStuAttendance(another, Obj));
    dispatch(getStudentByClass(another));
  };/////

  ///
  

  const { allSubject } = useSelector((state) => state.getAllSubReducer);
  const filteredSubject = allSubject.filter(
    (subject) => subject.sub_code == props.match.params.id
  );


  useEffect(() => {
    console.log("getStuBySubject2")

    try {
      var obj = {
        sub_code: props.match.params.id,
      };
      setsubject(obj.sub_code);
      dispatch(getStuBySubject(obj));
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    console.log("filteredSubject")
    if (filteredSubject.length > 0 && filteredSubject[0].excelSheet_marksUrl) {
      console.log("url in now")
      console.log(excelMarksUrl);
      fetch(filteredSubject[0].excelSheet_marksUrl)
        .then((res) => res.arrayBuffer())
        .then((data) => {
          console.log(`Data is in url ${data}`)
          // Parse the data as an array buffer
          const workbook = XLSX.read(data, { type: "array" });

          // Get the first worksheet in the workbook
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];

          // Convert the worksheet data to an array of objects
          const newData = XLSX.utils.sheet_to_json(worksheet);

          // Update the excelData state with the new data
          setExcelData(newData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [filteredSubject]);

  const studentsBySub = useSelector(
    (state) => state.getStuBySubjectReducer.studentsBySub
  );
  console.log("stuBySub")
  console.log(studentsBySub);

  const generateData = () => {
    if (studentsBySub) {
      // Map over the studentsBySub array to create an array of objects
      // where each object represents a row in the Excel file
      const data = studentsBySub.map((student) => {
        // Find the marks for the current subject in the student's markList array
        const marks = student.markList.find(
          (mark) => mark.subject == props.match.params.id
        );
        return {
          Name: student.name,
          Index_No: student.Roll_No,
          Addmision_year: student.addmision_year,
          Marks: marks ? marks.smark : "N/A", // add marks data here
          CA_Marks:marks ? marks.CA_Marks : "N/A",
          End_Marks:marks ? marks.End_Marks : "N/A"
        };
      });

      // Update the exportedData state with the new data
      setExportedData(data);
    }
  };

  useEffect(() => {
    console.log("generateData")
    generateData();
  }, [studentsBySub]);

  const handleExport = () => {
    generateData();

    // Create a new worksheet and add the data to it
    const ws = XLSX.utils.json_to_sheet(exportedData);

    // Create a new workbook and add the worksheet to it
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");

    // Write the workbook to a file and trigger a download
    XLSX.writeFile(wb, "students.xlsx");
  };

  const handleExportAttendance = () => {
    console.log("Hi in download")
    // Get the data from the table
    const data = studentsBySub.map((student) => ({
      Name: student.name,
      Index_No: student.Roll_No,
      Module: subject,
      Batch_Name: student.clsName,
      Attendance: student.attendance === "present" ? "✔️" : "",
      Start_Time: startTime,
      End_Time: endTime,
      Date: date,
    }));
  
    // Generate an Excel file from the data
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");
    XLSX.writeFile(workbook, "attendance.xlsx");
  };

  const handleFileUploadAttendance = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
  
    // Upload the file to Cloudinary
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "voting");
    data.append("cloud_name", "dj76d2css");
    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dj76d2css/raw/upload", {
        method: "post",
        body: data,
      });
      const cloudinaryData = await res.json();
      // Store the URL of the uploaded file in filteredSubject.excelSheet_marksUrl
      filteredSubject[0].excelSheet_marksUrl = cloudinaryData.url;
      console.log(`calling update url using ${cloudinaryData.url}`);
      setexcelMarksUrl2(cloudinaryData.url);
  
      // Update the subject's excelSheet_marksUrl in the database
      // dispatch(updateSubject(props.match.params.id, cloudinaryData.url));
    } catch (err) {
      console.log(err);
    }
  
    // Read the file using a FileReader
    const reader = new FileReader();
    reader.onload = async (e) => {
      // Parse the data in the file as an array buffer
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      // Assuming the first row contains the headers
      const headers = excelData[0];
      // Loop through the rest of the rows
      for (let i = 1; i < excelData.length; i++) {
        const row = excelData[i];
        // Assuming the columns are in the order: Name, Index_No, Module, Batch Name, Attendance, Start Time, End Time, Date
        const studentId = row[1];
        const attendance = row[4];
        console.log("Attendance upload")
        console.log(studentId)
        console.log(attendance)
        const student = studentsBySub.find(student => student._id === studentId);
        console.log(student);
  
        // Call makeAttendance with the appropriate arguments
         await makeAttendance(student, attendance);
      }
    };
    reader.readAsArrayBuffer(file);
  };
  
  
  

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
  
    if (!file) {
      return;
    }
  
    // Upload the file to Cloudinary
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "voting");
    data.append("cloud_name", "dj76d2css");
    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dj76d2css/raw/upload", {
        method: "post",
        body: data,
      });
      const cloudinaryData = await res.json();
      // Store the URL of the uploaded file in filteredSubject.excelSheet_marksUrl
      filteredSubject[0].excelSheet_marksUrl = cloudinaryData.url;
      console.log(`calling update url using ${cloudinaryData.url}`);
      setexcelMarksUrl(cloudinaryData.url);
  
      // Update the subject's excelSheet_marksUrl in the database
      // dispatch(updateSubject(props.match.params.id, cloudinaryData.url));
    } catch (err) {
      console.log(err);
    }
  
    // Read the file using a FileReader
    const reader = new FileReader();
    reader.onload = async (e) => {
      // Parse the data in the file as an array buffer
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      // Assuming the first row contains the headers
      const headers = excelData[0];
      // Loop through the rest of the rows
      for (let i = 1; i < excelData.length; i++) {
        const row = excelData[i];
        // Assuming the columns are in the order: Name, Index_No, Admission year, Marks
        const studentId = row[1];
        const marks = String(row[3]);;
        // Call updateStudentMarks with the appropriate arguments
        await dispatch(updateStudentMarks(studentId, subject, marks));
      }
      window.location.reload();
    };
    reader.readAsArrayBuffer(file);
  };
  console.log("Att url")
  console.log(excelMarksUrl2)
  
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!Array.isArray(studentsBySub)) {
    return (
      <div>
        <div className="centered-text">Loading....</div>
      </div>
    );
  }

  if (studentsBySub.length === 0) {
    return (
      <div>
        <div className="centered-text">Any student does not enroll yet!</div>
      </div>
    );
  }

  return (
    <div className="maindiv">
      {/* section 1 */}
      <div className="section1">
        <h2> Student Marks for module {props.match.params.id}</h2>
        <div className="btndiv">
          <button onClick={handleExport} className="getexcel">
            Get Excel Sheet
          </button>
          <label htmlFor="fileInput" className="uplodbtn">
            Upload Excel Sheet
          </label>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileUpload}
            accept=".xlsx, .xls"
          />
        </div>
        <table className="table table-bordered table-responsive-sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Index_No</th>
              <th>Addmision year</th>
              <th>Marks</th>
              <th>CA_Marks</th>
              <th>End_Marks</th>
            </tr>
          </thead>
          <tbody>
            {(exportedData || []).map((student) => (
              <tr key={student._id}>
                <td>{student.Name}</td>
                <td>{student.Index_No}</td>
                <td>{student.Addmision_year}</td>
                <td>{student.Marks}</td>
                <td>{student.CA_Marks}</td>
                <td>{student.End_Marks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* section 2 */}
      <div className="section1">
        <h2> Attendance of module {props.match.params.id}</h2>
        <div className="btndiv">
          <button onClick={handleExportAttendance} className="getexcel">
            Download Excel Sheet
          </button>
          <label htmlFor="fileInput" className="uplodbtn">
            Upload Excel Sheet for Attendace
          </label>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileUploadAttendance}
            accept=".xlsx, .xls"
          />

          <Link to={`/teacher/dashboard/attendance/${subject}`}>
            <button>{subject}</button>
          </Link>
        </div>
        {/* table */}
        <div>
          <br />
          <div style={{ width: "80%", margin: "auto" }}>
            <h3 style={{ textAlign: "center" }}>
              Make Attendance at {new Date().toISOString().slice(0, 10)}
            </h3>
          </div>
          <br />
          <div style={{ width: "80%", margin: "auto" }}>
            <label htmlFor="startTime">Start Time:</label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <label htmlFor="endTime">End Time:</label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
          <br />
          <div style={{ width: "80%", margin: "auto" }}>
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <table
            className="table table-bordered table-responsive-sm"
            style={{ width: "80%", margin: "auto" }}
          >
            <thead style={{ fontSize: "22px" }}>
              <tr>
                <th>Name</th>
                <th>Index_No</th>
                <th>Module</th>
                <th>Batch Name</th>
                <th>Attendance</th>
                <th>Start time</th>
                <th>End time</th>
                <th>Date</th>
              </tr>
            </thead>
            {(studentsBySub || []).map((item) => (
              <tbody key={item.name} style={{ padding: "5px" }}>
                <tr>
                  <td>{item.name}</td>

                  <td>{item.Roll_No}</td>
                  <td>{subject}</td>
                  <td style={{ fontSize: "19px", fontWeight: "700" }}>
                    {item.clsName}
                  </td>
                  <td>
                    <>
                      <td>
                        <input
                          type="text"
                          value={attendanceInput}
                          onChange={(e) => setAttendanceInput(e.target.value)}
                        />
                        {attendanceInput === "present" ||
                        attendanceInput === "absent" ? (
                          <button
                            onClick={() => {
                              makeAttendance(item, attendanceInput);
                              setAttendanceInput("");
                            }}
                          >
                            OK
                          </button>
                        ) : null}
                      </td>
                    </>
                  </td>
                  <td>{startTime}</td>
                  <td>{endTime}</td>
                  <td>{date}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
      {/* section 3 */}
      <div className="section1">
        <h2> Module Content for module {props.match.params.id}</h2>
        <div className="btndiv">
          <button onClick={handleExport} className="getexcel">
            Get Excel Sheet
          </button>
          <label htmlFor="fileInput" className="uplodbtn">
            Upload Excel Sheet
          </label>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileUpload}
            accept=".xlsx, .xls"
          />
        </div>
        <table className="table table-bordered table-responsive-sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Index_No</th>
              <th>Addmision year</th>
              <th>Marks</th>
            </tr>
          </thead>
          <tbody>
            {(exportedData || []).map((student) => (
              <tr key={student._id}>
                <td>{student.Name}</td>
                <td>{student.Index_No}</td>
                <td>{student.Addmision_year}</td>
                <td>{student.Marks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubjectData;



// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getStuBySubject, updateStudentMarks } from "../actions/student_action";
// import * as XLSX from "xlsx";
// import { getAllSubAction } from "../actions/admin_action";
// import "./SubjectData.css";
// import { BASE_URL } from "../../helper";

// const SubjectData = (props) => {
//   const [error, setError] = useState(null);
//   const [uploadedData, setUploadedData] = useState(null);
//   const [excelData, setExcelData] = useState(null);
//   const [exportedData, setExportedData] = useState(null);
//   const [excelMarksUrl, setexcelMarksUrl] = useState(null);
//   const [subject, setsubject] = useState(null);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getAllSubAction());
//   }, []);

//   const { allSubject } = useSelector((state) => state.getAllSubReducer);
//   const filteredSubject = allSubject.filter(
//     (subject) => subject.sub_code == props.match.params.id
//   );

//   useEffect(() => {
//     try {
//       var obj = {
//         sub_code: props.match.params.id,
//       };
//       setsubject(obj.sub_code);
//       dispatch(getStuBySubject(obj));
//     } catch (err) {
//       setError(err.message);
//     }
//   }, [props.match.params.id]);

//   useEffect(() => {
//     if (filteredSubject.length > 0 && filteredSubject[0].excelSheet_marksUrl) {
//       fetch(filteredSubject[0].excelSheet_marksUrl)
//         .then((res) => res.arrayBuffer())
//         .then((data) => {
//           // Parse the data as an array buffer
//           const workbook = XLSX.read(data, { type: "array" });

//           // Get the first worksheet in the workbook
//           const sheetName = workbook.SheetNames[0];
//           const worksheet = workbook.Sheets[sheetName];

//           // Convert the worksheet data to an array of objects
//           const newData = XLSX.utils.sheet_to_json(worksheet);

//           // Update the excelData state with the new data
//           setExcelData(newData);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   }, [filteredSubject]);

//   const studentsBySub = useSelector(
//     (state) => state.getStuBySubjectReducer.studentsBySub
//   );

//   const generateData = () => {
//     if (studentsBySub) {
//       // Map over the studentsBySub array to create an array of objects
//       // where each object represents a row in the Excel file
//       const data = studentsBySub.map((student) => {
//         // Find the marks for the current subject in the student's markList array
//         const marks = student.markList.find(
//           (mark) => mark.subject == props.match.params.id
//         );

//         return {
//           Name: student.name,
//           Index_No: student.Roll_No,
//           Addmision_year: student.addmision_year,
//           Marks: marks ? marks.smark : "N/A", // add marks data here
//         };
//       });

//       // Update the exportedData state with the new data
//       setExportedData(data);
//     }
//   };

//   useEffect(() => {
//     generateData();
//   }, [studentsBySub]);

//   const handleExport = () => {
//     generateData();

//     // Create a new worksheet and add the data to it
//     const ws = XLSX.utils.json_to_sheet(exportedData);

//     // Create a new workbook and add the worksheet to it
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Students");

//     // Write the workbook to a file and trigger a download
//     XLSX.writeFile(wb, "students.xlsx");
//   };

//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
  
//     if (!file) {
//       return;
//     }
  
//     // Upload the file to Cloudinary
//     const data = new FormData();
//     data.append("file", file);
//     data.append("upload_preset", "voting");
//     data.append("cloud_name", "dj76d2css");
//     try {
//       const res = await fetch("https://api.cloudinary.com/v1_1/dj76d2css/raw/upload", {
//         method: "post",
//         body: data,
//       });
//       const cloudinaryData = await res.json();
//       // Store the URL of the uploaded file in filteredSubject.excelSheet_marksUrl
//       filteredSubject[0].excelSheet_marksUrl = cloudinaryData.url;
//       console.log(`calling update url using ${cloudinaryData.url}`);
//       setexcelMarksUrl(cloudinaryData.url);
  
//       // Update the subject's excelSheet_marksUrl in the database
//       // dispatch(updateSubject(props.match.params.id, cloudinaryData.url));
//     } catch (err) {
//       console.log(err);
//     }
  
//     // Read the file using a FileReader
//     const reader = new FileReader();
//     reader.onload = async (e) => {
//       // Parse the data in the file as an array buffer
//       const data = new Uint8Array(e.target.result);
//       const workbook = XLSX.read(data, { type: 'array' });
//       const firstSheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[firstSheetName];
//       const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
//       // Assuming the first row contains the headers
//       const headers = excelData[0];
//       // Loop through the rest of the rows
//       for (let i = 1; i < excelData.length; i++) {
//         const row = excelData[i];
//         // Assuming the columns are in the order: Name, Index_No, Admission year, Marks
//         const studentId = row[1];
//         const marks = String(row[3]);;
//         // Call updateStudentMarks with the appropriate arguments
//         await dispatch(updateStudentMarks(studentId, subject, marks));
//       }
//       window.location.reload();
//     };
//     reader.readAsArrayBuffer(file);
//   };
  
//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!Array.isArray(studentsBySub)) {
//     return (
//       <div>
//         <div className="centered-text">Loading....</div>
//       </div>
//     );
//   }

//   if (studentsBySub.length === 0) {
//     return (
//       <div>
//         <div className="centered-text">Any student does not enroll yet!</div>
//       </div>
//     );
//   }

//   return (
//     <div className="maindiv">
//       {/* section 1 */}
//       <div className="section1">
//       <h2> Student Marks for module {props.match.params.id}</h2>
//       <div className="btndiv">
//         <button onClick={handleExport} className="getexcel">Get Excel Sheet</button>
//         <label htmlFor="fileInput" className="uplodbtn">
//           Upload Excel Sheet
//         </label>
//           <input
//             type="file"
//             id="fileInput"
//             onChange={handleFileUpload}
//             accept=".xlsx, .xls"
//           />
//       </div>
//       <table className="table table-bordered table-responsive-sm">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Index_No</th>
//             <th>Addmision year</th>
//             <th>Marks</th>
//           </tr>
//         </thead>
//         <tbody>
//           {(exportedData || []).map((student) => (
//             <tr key={student._id}>
//               <td>{student.Name}</td>
//               <td>{student.Index_No}</td>
//               <td>{student.Addmision_year}</td>
//               <td>{student.Marks}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
      
      
//       </div>
//       {/* section 2 */}
//       <div className="section1">
//       <h2> Attendance of module {props.match.params.id}</h2>
//       <div className="btndiv">
//         <button onClick={handleExport} className="getexcel">Get Excel Sheet</button>
//         <label htmlFor="fileInput" className="uplodbtn">
//           Upload Excel Sheet
//         </label>
//           <input
//             type="file"
//             id="fileInput"
//             onChange={handleFileUpload}
//             accept=".xlsx, .xls"
//           />
//       </div>
//       {/* table */}
//       <div>
//       <br />
//       <div style={{ width: "80%", margin: "auto" }}>
//         <h3 style={{ textAlign: "center" }}>
//           Make Attendance at {new Date().toISOString().slice(0, 10)}
//         </h3>
//       </div>
//       <br />

//       <div style={{ width: "80%", margin: "auto" }}>
//         <label htmlFor="startTime">Start Time:</label>
//         <input
//           type="time"
//           id="startTime"
//           name="startTime"
//           value={startTime}
//           onChange={(e) => setStartTime(e.target.value)}
//         />
//         <label htmlFor="endTime">End Time:</label>
//         <input
//           type="time"
//           id="endTime"
//           name="endTime"
//           value={endTime}
//           onChange={(e) => setEndTime(e.target.value)}
//         />
//       </div>
//       <br />
    
//     <div style={{ width: "80%", margin: "auto" }}>
//       <label htmlFor="date">Date:</label>
//       <input
//         type="date"
//         id="date"
//         name="date"
//         value={date}
//         onChange={(e) => setDate(e.target.value)}
//       />
//     </div>

//       <table
//         className="table table-bordered table-responsive-sm"
//         style={{ width: "80%", margin: "auto" }}
//       >
//         <thead style={{ fontSize: "22px" }}>
//           <tr>
//             <th>Name</th>
//             {/* <th>Roll_No</th> */}
//             <th>Index_No</th>
//             {/* <th>className</th> */}
//             <th>Batch Name</th>
//             <th>Attendance</th>
//           </tr>
//         </thead>

//         {students &&
//           students.students &&
//           students.students.map((item) => (
//             <tbody key={item.name} style={{ padding: "5px" }}>
//               <tr>
//                 <td>{item.name}</td>

//                 <td>{item.Roll_No}</td>
//                 <td style={{ fontSize: "19px", fontWeight: "700" }}>
//                   {item.clsName}
//                 </td>

//                 <td>
//                   {item && item.pList && item.pList.includes(currentDate) ? (
//                     <>
//                       {item.attdenList.filter(
//                         (ele) => ele.dateId == currentDate
//                       ) ? (
//                         <>
//                           <p>{item.attdenList[item.attdenList.length - 1].type}</p>
//                         </>
//                       ) : (
//                         <>
//                           <p>okkk</p>
//                         </>
//                       )}
//                     </>
//                   ) : (
//                     <>
//                       <button
//                         className="btn btn-success"
//                         onClick={() => makeAttendance(item, "present")}
//                       >
//                         Present
//                       </button>{" "}
//                       <button
//                         className="btn btn-danger"
//                         onClick={() => makeAttendance(item, "absent")}
//                       >
//                         Absent
//                       </button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             </tbody>
//           ))}
//       </table>
//     </div>
      
      
//       </div>
//       {/* section 3 */}
//       <div className="section1">
//       <h2> Module Content for module {props.match.params.id}</h2>
//       <div className="btndiv">
//         <button onClick={handleExport} className="getexcel">Get Excel Sheet</button>
//         <label htmlFor="fileInput" className="uplodbtn">
//           Upload Excel Sheet
//         </label>
//           <input
//             type="file"
//             id="fileInput"
//             onChange={handleFileUpload}
//             accept=".xlsx, .xls"
//           />
//       </div>
//       <table className="table table-bordered table-responsive-sm">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Index_No</th>
//             <th>Addmision year</th>
//             <th>Marks</th>
//           </tr>
//         </thead>
//         <tbody>
//           {(exportedData || []).map((student) => (
//             <tr key={student._id}>
//               <td>{student.Name}</td>
//               <td>{student.Index_No}</td>
//               <td>{student.Addmision_year}</td>
//               <td>{student.Marks}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
      
      
//       </div>

      


      
//     </div>
//   );
// };

// export default SubjectData;














// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getStuBySubject, updateSubject } from "../actions/student_action";
// import * as XLSX from "xlsx";
// import { getAllSubAction } from "../actions/admin_action";
// import "./SubjectData.css";
// import { BASE_URL } from "../../helper";

// const SubjectData = (props) => {
//   const [error, setError] = useState(null);
//   const [uploadedData, setUploadedData] = useState(null);
//   const [excelData, setExcelData] = useState(null);
//   const [exportedData, setExportedData] = useState(null);
//   const [excelMarksUrl, setexcelMarksUrl] = useState(null);
//   const [subject, setsubject] = useState(null);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getAllSubAction());
//   }, []);

//   const { allSubject } = useSelector((state) => state.getAllSubReducer);
//   const filteredSubject = allSubject.filter(
//     (subject) => subject.sub_code == props.match.params.id
//   );

//   useEffect(() => {
//     try {
//       var obj = {
//         sub_code: props.match.params.id,
        
//       };
//       setsubject(obj.sub_code)
//       dispatch(getStuBySubject(obj));
//     } catch (err) {
//       setError(err.message);
//     }
//   }, [props.match.params.id]);

//   useEffect(() => {
//     if (filteredSubject.length > 0 && filteredSubject[0].excelSheet_marksUrl) {
//       fetch(filteredSubject[0].excelSheet_marksUrl)
//         .then((res) => res.arrayBuffer())
//         .then((data) => {
//           // Parse the data as an array buffer
//           const workbook = XLSX.read(data, { type: "array" });

//           // Get the first worksheet in the workbook
//           const sheetName = workbook.SheetNames[0];
//           const worksheet = workbook.Sheets[sheetName];

//           // Convert the worksheet data to an array of objects
//           const newData = XLSX.utils.sheet_to_json(worksheet);

//           // Update the excelData state with the new data
//           setExcelData(newData);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   }, [filteredSubject]);

//   const studentsBySub = useSelector(
//     (state) => state.getStuBySubjectReducer.studentsBySub
//   );

//   const generateData = () => {
//     if (studentsBySub) {
//       // Map over the studentsBySub array to create an array of objects
//       // where each object represents a row in the Excel file
//       const data = studentsBySub.map((student) => {
//         // Find the marks for the current subject in the student's markList array
//         const marks = student.markList.find(
//           (mark) => mark.subject == props.match.params.id
//         );

//         return {
//           Name: student.name,
//           Index_No: student.Roll_No,
//           Addmision_year: student.addmision_year,
//           Marks: marks ? marks.smark : "N/A", // add marks data here
//         };
//       });

//       // Update the exportedData state with the new data
//       setExportedData(data);
//     }
//   };

//   useEffect(() => {
//     generateData();
//   }, [studentsBySub]);

//   const handleExport = () => {
//     generateData();

//     // Create a new worksheet and add the data to it
//     const ws = XLSX.utils.json_to_sheet(exportedData);

//     // Create a new workbook and add the worksheet to it
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Students");

//     // Write the workbook to a file and trigger a download
//     XLSX.writeFile(wb, "students.xlsx");
//   };

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
  
//     if (!file) {
//       return;
//     }
  
//     // Upload the file to Cloudinary
//     const data = new FormData();
//     data.append("file", file);
//     data.append("upload_preset", "voting");
//     data.append("cloud_name", "dj76d2css");
//     fetch("https://api.cloudinary.com/v1_1/dj76d2css/raw/upload", {
//       method: "post",
//       body: data,
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         // Store the URL of the uploaded file in filteredSubject.excelSheet_marksUrl
//         filteredSubject[0].excelSheet_marksUrl = data.url;
//         console.log(`calling update url using  ${data.url}`)
//         setexcelMarksUrl(data.url);

  
//         // Update the subject's excelSheet_marksUrl in the database
//         // dispatch(updateSubject(props.match.params.id, data.url));
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     // Read the file using a FileReader
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       // Parse the data in the file as an array buffer
//       const data = new Uint8Array(e.target.result);
//       const workbook = XLSX.read(data, { type: "array" });
  
//       // Get the first worksheet in the workbook
//       const sheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[sheetName];
  
//       // Convert the worksheet data to an array of objects
//       const newData = XLSX.utils.sheet_to_json(worksheet);
  
//       // Update the uploadedData state with the new data
//       setUploadedData(newData);
  
//       // Update the excelData state with the new data
//       setExcelData(newData);
  
//       // Send the updated data to the server
//       handleUpdate();
//     };
//     reader.readAsArrayBuffer(file);
//   };
  
//   const handleUpdate = () => {
//   };

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!Array.isArray(studentsBySub)) {
//     return (
//       <div>
//         <div className="centered-text">Loading....</div>
//       </div>
//     );
//   }

//   if (studentsBySub.length === 0) {
//     return (
//       <div>
//         <div className="centered-text">Any student does not enroll yet!</div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2>Students enrolled in module {props.match.params.id}</h2>
//       <button onClick={handleExport}>Export to Excel</button>
//       <h3>Upload new updated Excel sheet</h3>
//       {/* The label is styled as a button and is used to trigger the file input */}
//       <label htmlFor="fileInput" className="choose-file-button">
//         Choose File
//       </label>
//       <input
//         type="file"
//         id="fileInput"
//         onChange={handleFileUpload}
//         accept=".xlsx, .xls"
//       />
//       <table className="table table-bordered table-responsive-sm">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Index_No</th>
//             <th>Addmision year</th>
//             <th>Marks</th>
//           </tr>
//         </thead>
//         <tbody>
//           {(exportedData || []).map((student) => (
//             <tr key={student._id}>
//               <td>{student.Name}</td>
//               <td>{student.Index_No}</td>
//               <td>{student.Addmision_year}</td>
//               <td>{student.Marks}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default SubjectData;
