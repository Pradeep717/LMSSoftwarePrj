import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSubAction } from "../../actions/admin_action";
import Titleheading from "../../components/Titleheading";

const MyTimeTable = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSubAction());
  }, []);

  const { allSubject } = useSelector((state) => state.getAllSubReducer);
  const { currentUser } = useSelector((state) => state.userProfileReducer);

  const className = currentUser && currentUser[0].clsName;

  const filterSub =
    allSubject && allSubject.filter((item) => item.sub_class == className);
  var TheroSub = [];
  var PracSub = [];
  const sepSub = () => {
    filterSub &&
      filterSub.map((item) => {
        if (item.sub_type == "Theory") {
          TheroSub.push(item.sub_name);
        } else {
          PracSub.push(item.sub_name);
        }
      });
  };

  sepSub();

  return (
    <div
      style={{
        width: "65%",
        margin: "auto",
        backgroundColor: "white",
        padding: "40px",
        marginTop: "40px",
        minHeight: "90vh",
        marginBottom: "40px",
        borderRadius: "5px",
      }}
    >
      <Titleheading title="Academic Timetable" />
      <table className="table table-bordered table-responsive-sm">
        <thead>
          <tr
            style={{
              height: "40px",
              backgroundColor: "black",
              color: "white",
              textAlign: "center",
              verticalAlign: "center",
              paddingBottom: "20px",
              fontSize:"10px",
              alignContent: "center",
            }}
          >
            <th> Day </th>
            <th>8:30AM - 9:30AM</th>
            <th>9:30AM - 10:30AM </th>
            <th>10:30AM - 11.30PM</th>
            <th>11.30PM - 12:30PM</th>
            <th>12:30PM - 1:30PM</th>
            <th>1:30PM - 2:30PM </th>
            <th>2:30PM - 3.30PM</th>
            <th>3:30PM - 4.30PM</th>
          </tr>
        </thead>

        <tbody style={{ padding: "5px" }}>
          <tr
            style={{
              height: "50px",
              textAlign: "center",
              fontFamily: "Arial",
              fontSize: "12px",
              alignContent: "middle",
            }}
          >
            <td>Monday</td>
            <td> {TheroSub[0]} </td>
            <td>{TheroSub[1]}</td>

            <td>{PracSub[0]}</td>
            <td>Break</td>
            <td>{TheroSub[2]}</td>
            <td>{TheroSub[3]}</td>
            <td>{PracSub[1]}</td>
          </tr>

          <tr
            style={{
              height: "50px",
              textAlign: "center",
              fontFamily: "Arial",
              fontSize: "12px",
              alignContent: "middle",
            }}
          >
            <td>Tuesday</td>
            <td> {TheroSub[0]} </td>
            <td>{TheroSub[1]}</td>

            <td>{PracSub[0]}</td>
            <td>Break</td>
            <td>{TheroSub[2]}</td>
            <td>{TheroSub[3]}</td>
            <td>{PracSub[1]}</td>
          </tr>

          <tr
            style={{
              height: "50px",
              textAlign: "center",
              fontFamily: "Arial",
              fontSize: "12px",
              alignContent: "middle",
            }}
          >
            <td>Wednesday</td>
            <td> {TheroSub[0]} </td>
            <td>{TheroSub[1]}</td>

            <td>{PracSub[0]}</td>
            <td>Break</td>
            <td>{TheroSub[2]}</td>
            <td>{TheroSub[3]}</td>
            <td>{PracSub[1]}</td>
          </tr>

          <tr
            style={{
              height: "50px",
              textAlign: "center",
              fontFamily: "Arial",
              fontSize: "12px",
              alignContent: "middle",
            }}
          >
            <td>Thursday</td>
            <td> {TheroSub[0]} </td>
            <td>{TheroSub[1]}</td>

            <td>{PracSub[0]}</td>
            <td>Break</td>
            <td>{TheroSub[2]}</td>
            <td>{TheroSub[3]}</td>
            <td>{PracSub[1]}</td>
          </tr>

          <tr
            style={{
              height: "50px",
              textAlign: "center",
              fontFamily: "Arial",
              fontSize: "12px",
              alignContent: "middle",
            }}
          >
            <td>Friday</td>
            <td> {TheroSub[0]} </td>
            <td>{TheroSub[1]}</td>

            <td>{PracSub[0]}</td>
            <td>Break</td>
            <td>{TheroSub[2]}</td>
            <td>{TheroSub[3]}</td>
            <td>{PracSub[1]}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MyTimeTable;