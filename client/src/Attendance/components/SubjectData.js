import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStuBySubject, updateStudentMarks } from "../actions/student_action";
import * as XLSX from "xlsx";
import { getAllSubAction } from "../actions/admin_action";
import "./SubjectData.css";
import { BASE_URL } from "../../helper";

const SubjectData = (props) => {
  const [error, setError] = useState(null);
  const [uploadedData, setUploadedData] = useState(null);
  const [excelData, setExcelData] = useState(null);
  const [exportedData, setExportedData] = useState(null);
  const [excelMarksUrl, setexcelMarksUrl] = useState(null);
  const [subject, setsubject] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
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
      setsubject(obj.sub_code);
      dispatch(getStuBySubject(obj));
    } catch (err) {
      setError(err.message);
    }
  }, [props.match.params.id]);

  useEffect(() => {
    if (filteredSubject.length > 0 && filteredSubject[0].excelSheet_marksUrl) {
      fetch(filteredSubject[0].excelSheet_marksUrl)
        .then((res) => res.arrayBuffer())
        .then((data) => {
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
        };
      });

      // Update the exportedData state with the new data
      setExportedData(data);
    }
  };

  useEffect(() => {
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
    <div>
      <h2>Students enrolled in module {props.match.params.id}</h2>
      <button onClick={handleExport}>Export to Excel</button>
      <h3>Upload new updated Excel sheet</h3>
      {/* The label is styled as a button and is used to trigger the file input */}
      <label htmlFor="fileInput" className="choose-file-button">
        Choose File
      </label>
      <input
        type="file"
        id="fileInput"
        onChange={handleFileUpload}
        accept=".xlsx, .xls"
      />
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
  );
};

export default SubjectData;














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
