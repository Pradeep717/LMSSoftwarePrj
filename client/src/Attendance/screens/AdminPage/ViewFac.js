import React, { useEffect, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllFaculty, deleteSingleTeacher } from '../../actions/admin_action';
import Titleheading from '../../components/Titleheading';
import './ViewFac.css';
import { DarkModeContext } from '../../../App';
import { DotLoader, HashLoader } from 'react-spinners';

const Allfaculty = () => {
  const dispatch = useDispatch();
  const { isDarkMode } = useContext(DarkModeContext);

  const [loading, setLoading] = useState(false);
  const [loadingTeacherEmail, setLoadingTeacherEmail] = useState('');

  useEffect(() => {
    dispatch(getAllFaculty());
  }, []);

  const data = useSelector(state => state.getAllFacReducer);

  const handleDelete = async (Email) => {
    try {
      setLoading(true);
      setLoadingTeacherEmail(Email);
      const data = { email: Email };
      await dispatch(deleteSingleTeacher(data));
      console.log("Deleting teacher with Email:", Email);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const [joiningYearFilter, setJoiningYearFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');

  const filterFaculty = () => {
    const filteredFaculty = data.allFaculty.filter(user => {
      const yearMatch = !joiningYearFilter || user.joining_year === joiningYearFilter;
      const genderMatch = !genderFilter || user.gender === genderFilter;
      return yearMatch && genderMatch;
    });
    return filteredFaculty;
  };

  const filteredFaculty = filterFaculty();

  return (
    <div className={`maindiv ${isDarkMode ? "d-mode" : ""}`}>
      <Titleheading style={{ marginTop: "20px" }} title="View All Faculty Member" />
      <div className="filter-controls">
        <label htmlFor="joiningYear">Joining Year:</label>
        <select id="joiningYear" onChange={e => setJoiningYearFilter(e.target.value)}>
          <option value="">All</option>
          <option value="2021">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2020">2019</option>
          <option value="2020">2018</option>
          <option value="2021">2017</option>
          <option value="2020">2016</option>
          <option value="2020">2015</option>
          <option value="2021">2014</option>
          <option value="2020">2013</option>
          <option value="2021">2012</option>
          <option value="2020">2011</option>
          <option value="2021">2010</option>

          
          {/* Add more options for other years */}
        </select>

        <label htmlFor="gender">Gender:</label>
        <select id="gender" onChange={e => setGenderFilter(e.target.value)}>
          <option value="">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          {/* Add more options for other genders */}
        </select>
      </div>
      <table className="table table-bordered table-responsive-sm">
        <thead className={`thead-dark ${isDarkMode ? "dark-x" : ""}`}>
          <tr>
            <th>Name</th>
            <th>Staff Id </th>
            <th>Joining Year</th>
            <th>Gender</th>
            <th>Contact Number</th>
            <th>Profile Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className={`thead-dark ${isDarkMode ? "dark-x" : ""}`}>
          {filteredFaculty.map(user => (
            <tr key={user.name}>
              <td>{user.name}{" "}{user.surname}</td>
              <td>{user.empolyee_id}</td>
              <td>{user.joining_year}</td>
              <td>{user.gender}</td>
              <td>{user.mobile}</td>
              <td><img src={user.pic} alt="sksk" style={{ height: "50px", width: "50px",borderRadius:"50px" }} /></td>
              <td>
                <button className="delbtn" onClick={() => handleDelete(user.email)} style={{ marginLeft: "2px" }}> Delete </button>
                {loading && loadingTeacherEmail === user.email && (
              <div className="loading-overlay">
                <HashLoader color="#ffc107" loading={loading} size={40} />
              </div>
            )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Allfaculty;
