

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStuBySubject } from '../actions/student_action';
import * as XLSX from 'xlsx';
import { getAllSubAction } from '../actions/admin_action';

const SubjectData = (props) => {
  const [error, setError] = useState(null);
  const [uploadedData, setUploadedData] = useState(null);
  const [excelData, setExcelData] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSubAction());
  }, []);

  const { allSubject } = useSelector((state) => state.getAllSubReducer);
  const filteredSubject = allSubject.filter(
    (subject) => subject.sub_code === props.match.params.id
  );
  // console.log(filteredSubject);

  useEffect(() => {
    try {
      var obj = {
        sub_code: props.match.params.id,
      };
      dispatch(getStuBySubject(obj));
    } catch (err) {
      setError(err.message);
    }
  }, [props.match.params.id]);

  useEffect(() => {
    if (filteredSubject.length > 0 && filteredSubject[0].excel_marks) {
      fetch(filteredSubject[0].excel_marks)
        .then((res) => res.arrayBuffer())
        .then((data) => {
          // Parse the data as an array buffer
          const workbook = XLSX.read(data, { type: 'array' });

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

  // This function is called when the user clicks the "Export to Excel" button
  const handleExport = () => {
    // Map over the studentsBySub array to create an array of objects
    // where each object represents a row in the Excel file
    const data = studentsBySub.map((student) => {
      // Find the marks for the current subject in the student's markList array
      const marks = student.markList.find(
        (mark) => mark.subject === props.match.params.id
      );

      return {
        Name: student.name,
        Index_No: student.Roll_No,
        Addmision_year: student.addmision_year,
        Marks: marks ? marks.smark : 'N/A', // add marks data here
      };
    });

    // Create a new worksheet and add the data to it
    const ws = XLSX.utils.json_to_sheet(data);

    // Create a new workbook and add the worksheet to it
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Students');

    // Write the workbook to a file and trigger a download
    XLSX.writeFile(wb, 'students.xlsx');
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    // Upload the file to Cloudinary
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'voting');
    data.append('cloud_name', 'dj76d2css');
    fetch('https://api.cloudinary.com/v1_1/dj76d2css/raw/upload', {
      method: 'post',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        // Store the URL of the uploaded file in filteredSubject.excel_marks
        console.log(data);
        console.log(filteredSubject[0].excel_marks);
        console.log(data.url);
        filteredSubject[0].excel_marks = data.url;
        console.log(filteredSubject[0].excel_marks);
      })
      .catch((err) => {
        console.log(err);
      });

    // Read the file using a FileReader
    const reader = new FileReader();
    reader.onload = (e) => {
      // Parse the data in the file as an array buffer
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      // Get the first worksheet in the workbook
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Convert the worksheet data to an array of objects
      const newData = XLSX.utils.sheet_to_json(worksheet);

      // Update the uploadedData state with the new data
      setUploadedData(newData);
    };
    reader.readAsArrayBuffer(file);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!Array.isArray(studentsBySub)) {
    return <div>studentsBySub is not an array</div>;
  }

  if (studentsBySub.length === 0) {
    return <div>studentsBySub is an empty array</div>;
  }

  return (
    <div>
      <h2>Students enrolled in module {props.match.params.id}</h2>
      {/* When this button is clicked, the handleExport function is called */}
      <button onClick={handleExport}>Export to Excel</button>
      <h3>Upload new updated Excel sheet</h3>
      {/* When a file is selected, the handleFileUpload function is called */}
      <input type="file" onChange={handleFileUpload} />
      <table
        className="table table-bordered table-responsive-sm"
        style={{ width: '80%', margin: 'auto' }}
      >
        <thead style={{ fontSize: '22px' }}>
          <tr>
            <th>Name</th>
            <th>Index_No</th>
            <th>Addmision year</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          {(excelData || studentsBySub).map((student) => (
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
  );
};

export default SubjectData;








// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getStuBySubject } from '../actions/student_action';
// import * as XLSX from 'xlsx';

// const SubjectData = (props) => {
//   const [error, setError] = useState(null);
//   const [uploadedData, setUploadedData] = useState(null);

//   const dispatch = useDispatch();
//   useEffect(() => {
//     try {
//       var obj = {
//         sub_code: props.match.params.id,
//       };
//       dispatch(getStuBySubject(obj));
//     } catch (err) {
//       setError(err.message);
//     }
//   }, [props.match.params.id]);

//   const studentsBySub = useSelector(
//     (state) => state.getStuBySubjectReducer.studentsBySub
//   );

//   // This function is called when the user clicks the "Export to Excel" button
//   const handleExport = () => {
//     // Map over the studentsBySub array to create an array of objects
//     // where each object represents a row in the Excel file
//     const data = studentsBySub.map((student) => {
//       // Find the marks for the current subject in the student's markList array
//       const marks = student.markList.find(
//         (mark) => mark.subject === props.match.params.id
//       );

//       return {
//         Name: student.name,
//         Index_No: student.Roll_No,
//         Addmision_year: student.addmision_year,
//         Marks: marks ? marks.smark : 'N/A', // add marks data here
//       };
//     });

//     // Create a new worksheet and add the data to it
//     const ws = XLSX.utils.json_to_sheet(data);

//     // Create a new workbook and add the worksheet to it
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'Students');

//     // Write the workbook to a file and trigger a download
//     XLSX.writeFile(wb, 'students.xlsx');
//   };

//   // This function is called when the user selects a file to upload
//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];

//     if (!file) {
//       return;
//     }

//     // Read the file using a FileReader
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       // Parse the data in the file as an array buffer
//       const data = new Uint8Array(e.target.result);
//       const workbook = XLSX.read(data, { type: 'array' });

//       // Get the first worksheet in the workbook
//       const sheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[sheetName];

//       // Convert the worksheet data to an array of objects
//       const newData = XLSX.utils.sheet_to_json(worksheet);

//       // Update the uploadedData state with the new data
//       setUploadedData(newData);
//     };
//     reader.readAsArrayBuffer(file);
//   };

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!Array.isArray(studentsBySub)) {
//     return <div>studentsBySub is not an array</div>;
//   }

//   if (studentsBySub.length === 0) {
//     return <div><h3>studentsBySub is an empty array</h3></div>;
//   }

//   return (
//     <div>
//       <h2>Students enrolled in module {props.match.params.id}</h2>
//       {/* When this button is clicked, the handleExport function is called */}
//       <button onClick={handleExport}>Export to Excel</button>
//       <h3>Upload new updated Excel sheet</h3>
//       {/* When a file is selected, the handleFileUpload function is called */}
//       <input type="file" onChange={handleFileUpload} />
//       <table
//         className="table table-bordered table-responsive-sm"
//         style={{ width: "80%", margin: "auto" }}
//       >
//         <thead style={{ fontSize: "22px" }}>
//           <tr>
//             <th>Name</th>
//             <th>Index_No</th>
//             <th>Addmision year</th>
//             <th>Marks</th>
//           </tr>
//         </thead>
//         <tbody>
//           {(uploadedData || studentsBySub).map((student) => (
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



// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getStuBySubject } from '../actions/student_action';
// import * as XLSX from 'xlsx';

// const SubjectData = (props) => {
//   const [error, setError] = useState(null);

//   const dispatch = useDispatch();
//   useEffect(() => {
//     try {
//       var obj = {
//         sub_code: props.match.params.id,
//       };
//       dispatch(getStuBySubject(obj));
//     } catch (err) {
//       setError(err.message);
//     }
//   }, [props.match.params.id]);

//   const studentsBySub = useSelector(
//     (state) => state.getStuBySubjectReducer.studentsBySub
//   );

//   // This function is called when the user clicks the "Export to Excel" button
//   const handleExport = () => {
//     // Map over the studentsBySub array to create an array of objects
//     // where each object represents a row in the Excel file
//     const data = studentsBySub.map((student) => ({
//       Name: student.name,
//       Index_No: student.Roll_No,
//       Addmision_year: student.addmision_year,
//       Marks: '', // add marks data here
//     }));

//     // Create a new worksheet and add the data to it
//     const ws = XLSX.utils.json_to_sheet(data);

//     // Create a new workbook and add the worksheet to it
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'Students');

//     // Write the workbook to a file and trigger a download
//     XLSX.writeFile(wb, 'students.xlsx');
//   };

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!Array.isArray(studentsBySub)) {
//     return <div>studentsBySub is not an array</div>;
//   }

//   if (studentsBySub.length === 0) {
//     return <div>studentsBySub is an empty array</div>;
//   }

//   return (
//     <div>
//       <h2>Students enrolled in module {props.match.params.id}</h2>
//       {/* When this button is clicked, the handleExport function is called */}
//       <button onClick={handleExport}>Export to Excel</button>
//       <table
//         className="table table-bordered table-responsive-sm"
//         style={{ width: "80%", margin: "auto" }}
//       >
//         <thead style={{ fontSize: "22px" }}>
//           <tr>
//             <th>Name</th>
//             <th>Index_No</th>
//             <th>Addmision year</th>
//             <th>Marks</th>
//           </tr>
//         </thead>
//         <tbody>
//           {studentsBySub.map((student) => (
//             <tr key={student._id}>
//               <td>{student.name}</td>
//               <td>{student.Roll_No}</td>
//               <td>{student.addmision_year}</td>
//               <td>{/* add marks data here */}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default SubjectData;





    
 
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
//                     {item.attdenList.filter(ele=>  ele.dateId === currentDate ) ? <>

//                        <p>{item.attdenList[item.attdenList.length-1].type}</p>
//                     </>:<><p>okkk</p></>}
                
//                 </>
                   
//                 :<>
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


// return(
//     <div>Hello gggggggggggggggggggggggggggggggggggg</div>
// );
// };

// export default SubjectData;