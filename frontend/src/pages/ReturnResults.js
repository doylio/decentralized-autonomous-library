import React from "react";

class bookAuthor extends React.Component {
  componentDidMount() {
    const qs = new URLSearchParams(window.location.search);
    const apiAuthorUrl = "http://localhost:8080/bookByAuthor";
    const apiBarcodeUrl = "http://localhost:8080/bookByBarcode";
    const apiTitleUrl = "http://localhost:8080/bookByTitle";
    fetch(apiAuthorUrl+"/"+qs.get(bookAuthor))
      .then((response) => response.json())
      .then((data) => console.log("This is your data", data));
  }
  render() {
    return (
    <div>
    <h1>my Component has Mounted, Check the browser 'console' </h1>
    
    </div>
    );
  }
}
export default bookAuthor;

/*
const ReturnResults = () => {
    return (
    <div>
    <h1>Return Results</h1>

    </div>
    );
  };
  
  export default ReturnResults;
  */
