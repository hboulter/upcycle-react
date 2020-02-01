import React from "react";

const Form = () => {
  return (
    <div className="form">
      <select defaultValue="none">
        <option value="none" disabled hidden>
          Please Select Item Condition
        </option>
        <option value="Poor">Poor</option>
        <option value="Fair">Fair</option>
        <option value="Good">Good</option>
        <option value="New">Like New</option>
      </select>
      <br />
      <input className="form" type="text" placeholder="Description"></input>
      <br />
      <input className="button button__primary" type="submit" value="Post" />
    </div>
  );
};

export default Form;
