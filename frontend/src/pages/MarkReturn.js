import React from "react";

const MarkReturn = () => {
    return (
    <div>
    <h1>Mark a Book as Returned</h1>
    <label for="memberid">MemberID: </label>
      <input
        type="text"
        id="memberid"
        name="memberid"
        value="1234567"
      ></input><br />
      <label for="isbn_number">ISBN : </label>
      <input
        type="text"
        id="isbn_number"
        name="isbn_number"
        value="000123558899322588"
      ></input>
    </div>
    );
  };
  
  export default MarkReturn;