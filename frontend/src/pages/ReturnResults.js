import React from 'react';

class bookAuthor extends React.Component {
  componentDidMount() {
    const apiAuthorUrl = 'http://localhost:8080/bookByAuthor';
    const apiBarcodeUrl = 'http://localhost:8080/bookByBarcode';
    const apiTitleUrl = 'http://localhost:8080/bookByTitle';


    fetch(apiAuthorUrl)
      .then((response) => response.json())
      .then((data) => console.log('This is your data', data));
  }
  render() {
    return <h1>my Component has Mounted, Check the browser 'console' </h1>;
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