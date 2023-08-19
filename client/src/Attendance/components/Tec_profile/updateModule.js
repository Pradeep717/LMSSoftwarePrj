import React from "react";
import BatchSelection from "./BatchSelection"; // Make sure to import the correct path
import Titleheading from "../Titleheading";

const UpdateModulePage = () => {
  return (
    <div>
      <Titleheading style={{ marginTop: "20px" }} title="Module Update" />
      <BatchSelection />
    </div>
  );
};

export default UpdateModulePage;
