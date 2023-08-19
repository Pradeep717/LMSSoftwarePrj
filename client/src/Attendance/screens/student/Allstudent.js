import React,{useEffect,useContext,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {getAllStudent} from "../../actions/student_action"
import Titleheading from "../../components/Titleheading"
import { deleteSingleStu } from '../../actions/admin_action';
import { editSingleStu } from '../../actions/admin_action';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './Allstudent.css'
import BatchChart from './batchchart';
import { DarkModeContext } from '../../../App';
import { setBatchCounts } from '../../actions/admin_action'; // Update the path to your 

const Allstudent = () => {
    const dispatch = useDispatch() ;
    const { isDarkMode } = useContext(DarkModeContext);
    useEffect(()=>{
         dispatch(getAllStudent())
    },[])
    const data =useSelector(state=>state.getAllStuReducer)

    const Datafilter = data && data.allstudents && data.allstudents.filter(item => item.name !== "Admin")
    const allStudents = data.allstudents.filter((item) => item.name !== 'Admin');

    const batches = ['19', '20', '21', '22', '23', '24'];
  const academicYears = [
    '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'
  ];

  const [batchFilter, setBatchFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [admissionYearFilter, setAdmissionYearFilter] = useState('');

  const applyFilters = (student) => {
    const batchMatch = batchFilter === '' || student.clsName === batchFilter;
    const genderMatch = genderFilter === '' || student.gender === genderFilter;
    const admissionYearMatch =
      admissionYearFilter === '' || student.addmision_year === admissionYearFilter;

    return batchMatch && genderMatch && admissionYearMatch;
  };

  const filteredStudents = allStudents.filter(applyFilters);

     console.log(Datafilter)
   var  min = Math.ceil(1);
   var  max = Math.floor(12);

   const handleDelete = (Email) => {
      const data = {email: Email}
      dispatch(deleteSingleStu(data))
      console.log("Deleting student with Email:", Email);
      window.location.reload(); 
  };

   const handleEdit = (Email) => {
    console.log("Edit");
    const data = {email: Email}
    dispatch(editSingleStu(data))
    console.log("Editing student with Email:", Email);
    window.location.reload(); 
  };
  const [batchCounts, setBatchCounts] = useState({});
  
  useEffect(() => {
    // Calculate batch counts
    const counts = {};
    allStudents.forEach((student) => {
      if (student.clsName in counts) {
        counts[student.clsName]++;
      } else {
        counts[student.clsName] = 1;
      }
    });
    setBatchCounts(counts);
  }, [allStudents]);

 
    return (
      <div className={`maindiv ${isDarkMode ? "dark-mode" : ""}`}>
      <Titleheading title="View All Student" />

      <div className="filter-options">
        <select value={batchFilter} onChange={(e) => setBatchFilter(e.target.value)}>
          <option value="">All Batches</option>
          {batches.map((batch) => (
            <option key={batch} value={batch}>
              {batch}
            </option>
          ))}
        </select>

        <select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <select
          value={admissionYearFilter}
          onChange={(e) => setAdmissionYearFilter(e.target.value)}
        >
          <option value="">All Admission Years</option>
          {academicYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <table className="table table-bordered table-responsive-sm">
        <thead className={`thead-dark ${isDarkMode ? "dark-x" : ""}`}>
          <tr>
            <th>Name</th>
            <th>Batch</th>
            <th>Index No</th>
            <th>Mobile</th>
            <th>Gender</th>
            <th>AdmissionYear</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className={`thead-dark ${isDarkMode ? "dark-x" : ""}`}>
          {filteredStudents.map((user) => (
            <tr key={user.name}>
              <td>{user.name}</td>
              <td>{user.clsName}</td>
              <td>{user.Roll_No}</td>
              <td>{user.mobile}</td>
              <td>{user.gender}</td>
              <td>{user.addmision_year}</td>
              <td className="picture">
                <img src={user.pic} alt="student-pic" className="picture" />
              </td>
              <td className="btnrow">
                <button className="editbtn" onClick={() => handleEdit(user.email)}>
                  Edit
                </button>
                <button className="deletebtn" onClick={() => handleDelete(user.email)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={`batch-counts ${isDarkMode ? 'dark-mode' : ''}`}>
        <h3>Student Counts per Batch:</h3>
        <div className='batches'>
        {batches.map((batch) => (
          <p key={batch}>
            Batch {batch}: {batchCounts[batch] || 0} students
          </p>
        ))}
        </div>
        
      </div>
      <BatchChart batchCounts={batchCounts} />
    </div>
    );
};

export default Allstudent;