import React from "react";
import { useEffect, useState,useContext } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import * as XLSX from "xlsx";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getStuBySubject, getStudentByClass, makeStuAttendance } from "../../actions/student_action";
import { getAllSubAction } from "../../actions/admin_action";
import { DarkModeContext } from "../../../App";
import './Tatten.css'

const Tatten = (props) => {
  const [currentDate, setCurrentDate] = useState("");
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [sem, setSem] = useState("");
  const [subject, setSubject] = useState("");
  const [smark, setMark] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState("");
  const [attendanceInput, setAttendanceInput] = useState("");
  const [excelMarksUrl2, setexcelMarksUrl2] = useState(null);
  const { isDarkMode } = useContext(DarkModeContext);
  
  console.log(`probs are ${props}`)


  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    var obj = {
      sub_code: props.match.params.id,
    };
    setSubject(obj.sub_code)
    dispatch(getStudentByClass(obj));
  }, [props.match.params.id]);
  
  const students = useSelector((state) => state.getStuByClassReducer);
  console.log(students);

  const handleClose = () => setShow(false);
  const handleShow = (item) => {
    setShow(true);
    setId(item._id);
  };

  const exTractNumber = (str) => {
    return str.replace(/[^0-9]/g, "");
  };

  const handleRequest = () => {
    const obj = {
      id,
      sem,
      smark,
      subject,
    };
    var another = {
      clsName: props.match.params.id,
    };
    dispatch(getStudentByClass(another));
  };
  useEffect(() => {
    console.log("getAllSubAction")
    dispatch(getAllSubAction());
  }, []);

  const { allSubject } = useSelector((state) => state.getAllSubReducer);
  const filteredSubject = allSubject.filter(
    (subject) => subject.sub_code == props.match.params.id
  );

  useEffect(() => {
    try {
      var obj = {
        sub_code: props.match.params.id,
      };
      setSubject(obj.sub_code);
      dispatch(getStuBySubject(obj));
    } catch (err) {
      //setError(err.message);
    }
  }, [props.match.params.id]);

  const studentsBySub = useSelector(
    (state) => state.getStuBySubjectReducer.studentsBySub
  );

  const makeAttendance = async (item, value) => {
    let currentTimestamp = Date.now();
    console.log(`Item is upload ${item}`);
  
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
      sub_code : subject, 
    };
  
    var another = {
      clsName: props.match.params.id,
    };
    dispatch(makeStuAttendance(another, Obj));
    dispatch(getStudentByClass(another));
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
        console.log(studentId)
        console.log(attendance)
        console.log(studentsBySub)
        console.log("nice to wory")
        const item = studentsBySub.find(student => student.Roll_No === studentId);
        console.log(item);
  
        // Call makeAttendance with the appropriate arguments
         await makeAttendance(item, attendance);
      }
    };
    reader.readAsArrayBuffer(file);
  };


  var ans, curDate;

  const newFun = async () => {
    const formatted = moment(Date.now()).format("L");

    curDate = await exTractNumber(formatted);
    setCurrentDate(curDate);
  };

  newFun();
  console.log("In attendace")
  console.log(studentsBySub)
  console.log(allSubject)
  console.log(subject)
  console.log(filteredSubject)
  console.log("ater")
  
  return (
    <div className={`div-main ${isDarkMode ? "dark-mode" : ""}`}>
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
  );
};

export default Tatten;

// import React from "react";
// import { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
// import moment from "moment";
// import { Button, Modal } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { getStudentByClass, makeStuAttendance } from "../../actions/student_action";

// const Tatten = (props) => {
//   const [currentDate, setCurrentDate] = useState("");
//   const [show, setShow] = useState(false);
//   const [id, setId] = useState("");
//   const [sem, setSem] = useState("");
//   const [subject, setSubject] = useState("");
//   const [smark, setMark] = useState("");
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const [date, setDate] = useState("");

//   const history = useHistory();
//   const dispatch = useDispatch();
//   useEffect(() => {
//     var obj = {
//       clsName: props.match.params.id,
//     };
//     dispatch(getStudentByClass(obj));
//   }, [props.match.params.id]);
  
//   const students = useSelector((state) => state.getStuByClassReducer);
//   console.log(students);

//   const handleClose = () => setShow(false);
//   const handleShow = (item) => {
//     setShow(true);
//     setId(item._id);
//   };

//   const exTractNumber = (str) => {
//     return str.replace(/[^0-9]/g, "");
//   };

//   const handleRequest = () => {
//     const obj = {
//       id,
//       sem,
//       smark,
//       subject,
//     };
//     var another = {
//       clsName: props.match.params.id,
//     };
//     dispatch(getStudentByClass(another));
//   };

//   var ans, curDate;

//   const newFun = async () => {
//     const formatted = moment(Date.now()).format("L");

//     curDate = await exTractNumber(formatted);
//     setCurrentDate(curDate);
//   };

//   newFun();

// //   const makeAttendance = async (student, value) => {
// //     let currentTimestamp = Date.now();

// //     const formatted = moment(currentTimestamp).format("L");

// //     ans = await exTractNumber(formatted);
// //     const Obj = {
// //       timestamp: currentTimestamp,

// //       type: value,
// //       StudentId: student._id,
// //       dateId: ans,
// //     };

// //     var another = {
// //       clsName: props.match.params.id,
// //     };
// //     dispatch(makeStuAttendance(another, Obj));
// //     dispatch(getStudentByClass(another));
// //   };
// const makeAttendance = async (student, value) => {
//     let currentTimestamp = Date.now();
  
//     const formatted = moment(currentTimestamp).format("L");
  
//     ans = await exTractNumber(formatted);
//     const Obj = {
//       timestamp: currentTimestamp,
//       type: value,
//       StudentId: student._id,
//       dateId: ans,
//       date: date,
//       startTime: startTime,
//       endTime: endTime,
//     };
  
//     var another = {
//       clsName: props.match.params.id,
//     };
//     dispatch(makeStuAttendance(another, Obj));
//     dispatch(getStudentByClass(another));
//   };
  

//   return (
//     <div>
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
//   );
// };

// export default Tatten;


// import React from 'react';
// import { useEffect,useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import moment from 'moment';
// import {Button,Modal} from "react-bootstrap"
// import { useDispatch, useSelector } from 'react-redux'
// import {getStudentByClass,makeStuAttendance} from "../../actions/student_action"

// const Tatten = (props) => {
//     const[currentDate,setCurrentDate]=useState("")
//     //const[userItem,setUserItem]=useState("mahen")
//     const [show, setShow] = useState(false);
//     const[id,setId] = useState("");
//     const[sem,setSem] = useState("")
//     const[subject,setSubject] = useState("")
//     const[smark,setMark] = useState("")

//     const history = useHistory()
//     const dispatch=useDispatch()
//     useEffect(()=>{
//         var obj = {
//             clsName: props.match.params.id
//         }
//         dispatch(getStudentByClass(obj));
//     },[props.match.params.id])
//     const students=useSelector(state=>state.getStuByClassReducer)
//      console.log(students)

    
 
//    const handleClose = () => setShow(false);
//    const handleShow = (item) =>{
//      setShow(true)
//      setId(item._id)
//    };
 
  
  
   
 
//  const exTractNumber = (str)=> {
//      return str.replace(/[^0-9]/g, '');
//  }
 
//  const handleRequest = ()=> {
//      const obj = {
//          id,sem,smark,subject
//      }
//      var another = {
//          clsName: props.match.params.id
//      }
//     // dispatch(uploadStuMark(another,obj))
//     dispatch(getStudentByClass(another));
//  }
 
//   var ans,curDate;
 
 
//   const newFun =  async ()=>{
//    const formatted = moment(Date.now()).format('L');
   
//    curDate = await exTractNumber(formatted);
//    setCurrentDate(curDate)
//   }
 
//   newFun();
 
  
 
//      const makeAttendance = async (student,value) => {
//         let currentTimestamp = Date.now()
        
//          const formatted = moment(currentTimestamp).format('L');
 
//           ans = await exTractNumber(formatted);
//          const Obj ={
//            timestamp:currentTimestamp,
          
//            type:value,
//            StudentId:student._id,
//            dateId:ans
//       }
      
//       var another = {
//          clsName: props.match.params.id
//      }
//          dispatch(makeStuAttendance(another,Obj))
//          dispatch(getStudentByClass(another));
       
//      }
 
//     return (
//         <div>
//              <br />
//             <div style={{width:"80%",margin:"auto"}}>
//             <h3 style={{ textAlign:"center" }}>Make Attendance at {new Date().toISOString().slice(0, 10)}</h3>
//             </div>
//             <br />
           
//         <table className='table table-bordered table-responsive-sm' style={{width:"80%",margin:"auto"}}>
//    <thead style={{fontSize:"22px"}}>
//      <tr>
//          <th >Name</th>
//          {/* <th>Roll_No</th> */}
//          <th>Index_No</th>
//          {/* <th>className</th> */}
//          <th>Batch Name</th>
//          <th>Attendance</th>
//      </tr>
//    </thead>

  
//    {
//       students && students.students && students.students.map(item => (
//            <tbody key={item.name} style={{padding:"5px"}}>
//            <tr >
//               <td>{item.name}</td>
           
//              <td>
//                  {item.Roll_No}
//              </td>
//              <td style={{fontSize:"19px",fontWeight:"700"}}>
//                    {item.clsName}
//              </td>
          
//                <td>
                
//                 {item && item.pList && item.pList.includes(currentDate) ?<>
//                     {item.attdenList.filter(ele=>  ele.dateId == currentDate ) ? <>

//                        <p>{item.attdenList[item.attdenList.length-1].type}</p>
//                     </>:<><p>okkk</p></>}
                
//                 </>
                   
//                 :<>
//                     {/* <i className="fas fa-user-times"
//                 onClick={()=>makeAttendance(item,"present")}
//                 ></i>
//                 <i className="fad fa-user-minus" onClick={()=>makeAttendance(item,"absent")}>

//                 </i> */}

//                      <button className='btn btn-success' onClick={()=>makeAttendance(item,"present")}>Present</button> {" "}
//                      <button className='btn btn-danger' onClick={()=>makeAttendance(item,"absent")}>Absent</button>
//                 </>}
//                 </td>
           
//            </tr>
         
//          </tbody>
//        ))
//    }
//  </table>

//    </div>
//     );
// };

// export default Tatten;