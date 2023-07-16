import React,{useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import useWindowDimensions from '../../components/UseWindowDimensions';
import {addSubjectAction} from "../../actions/admin_action"
import Titleheading from "../../components/Titleheading"
import {CName,Credit_Data} from "../../Utills"

const AddSubject = () => {

    const dispatch = useDispatch();

    const { height, width } = useWindowDimensions();
   
     const[sName,setsName]=useState("")
     const[sCode,setsCode]=useState("")
     const[sKey,setsKey]=useState("")
     const[sClass,setsClass]=useState("")
     const[sCredit,setsCredit]=useState("")
     const[sSemesrter,setsSemesrter]=useState("")
     const[selectedOption,setSelectedOption] = useState("")
     const [errorMessage, setErrorMessage] = useState("");

    const handleRequest= ()=>{
        const data = {sub_name:sName,sub_code:sCode,sub_enrollmentkey:sKey,sub_class:sClass,
            sub_credit:sCredit,sub_sem:sSemesrter ,sub_type:selectedOption}

            dispatch(addSubjectAction(data))
            // dispatch(addSubjectAction(data)).then((response) => {
            //   if (response.status === 400) {
            //     // Set error message
            //     setErrorMessage(response.data.error);
            //   } else {
            //     // Clear error message
            //     setErrorMessage("");
            //   }
            // });


    }

    return (
      <div className="col-7" style={{ margin: "auto",marginBottom:"200px" }}>
        <div className="card px-5 py-2" style={{ margin: "5%" }}>
          <Titleheading title="Add New Subject" />

          <div className="row">
            <div className="col">
              <input
                type="text"
                placeholder="Subject Name"
                value={sName}
                className="form-control stregis_incls"
                onChange={(e) => setsName(e.target.value)}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col">
              <input
                type="text"
                placeholder="Subject Code"
                value={sCode}
                className="form-control stregis_incls"
                onChange={(e) => setsCode(e.target.value)}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col">
              <input
                type="text"
                placeholder="Enrollment Key"
                value={sKey}
                className="form-control stregis_incls"
                onChange={(e) => setsKey(e.target.value)}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col" style={{ display: "flex" }}>
              <p style={{ marginRight: "10px", fontSize: "20px" }}>Batch :</p>
              <select
                value={sClass}
                id="selectId"
                onChange={(e) => setsClass(e.target.value)}
              >
                {CName.map((item) => (
                  <option value={item} key={item}>
                    {" "}
                    {item}{" "}
                  </option>
                ))}
              </select>
            </div>
            <div className="col" style={{ display: "flex" }}>
              <p style={{ marginRight: "10px", fontSize: "20px" }}>
                Semester :
              </p>
              <select
                value={sSemesrter}
                id="selectId"
                onChange={(e) => setsSemesrter(e.target.value)}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <option value={item} key={item}>
                    {" "}
                    {item}{" "}
                  </option>
                ))}
              </select>
            </div>

            <div className="col" style={{ display: "flex" }}>
              <p style={{ marginRight: "10px", fontSize: "20px" }}>
                Credit :
              </p>
              <select
                value={sCredit}
                id="selectId"
                onChange={(e) => setsCredit(e.target.value)}
              >
                {Credit_Data.map((item) => (
                  <option value={item} key={item}>
                    {" "}
                    {item}{" "}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <br />

          <div className="row">
            <div className="col" style={{ display: "flex" }}>
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    value="Compulsary"
                    checked={selectedOption == "Compulsary"}
                    onChange={(e) => setSelectedOption(e.target.value)}
                  />
                  Compulsary
                </label>
              </div>
              <div className="radio" style={{ marginLeft: "15px" }}>
                <label>
                  <input
                    type="radio"
                    value="Elective"
                    checked={selectedOption == "Elective"}
                    onChange={(e) => setSelectedOption(e.target.value)}
                  />
                  Elective
                </label>
              </div>
            </div>
          </div>
          <br />

          <button
            className="btn btn-success mb-4 mt-2"
            onClick={() => handleRequest()}
          >
            Submit
          </button>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        </div>
      </div>
    );
};

export default AddSubject;