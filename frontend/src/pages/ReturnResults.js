import React from 'react';

class bookAuthor extends React.Component {
  componentDidMount() {
    const apiAuthorUrl = 'http://localhost:8080/bookByAuthor';
    fetch(apiAuthorUrl)
      .then((response) => response.json())
      .then((data) => console.log('This is your data', data));
  }
  render() {
    return <h1>my Component has Mounted, Check the browser 'console' </h1>;
  }
}
export default bookAuthor;


class bookBarcode extends React.Component {
  componentDidMount() {
    const apiBarcodeUrl = 'http://localhost:8080/bookByBarcode';
    fetch(apiBarcodeUrl)
      .then((response) => response.json())
      .then((data) => console.log('This is your data', data));
  }
  render() {
    return <h1>my Component has Mounted, Check the browser 'console' </h1>;
  }
}
export default bookBarcode;

class bookTitle extends React.Component {
  componentDidMount() {
    const apiTitleUrl = 'http://localhost:8080/bookByTitle';
    fetch(apiTitleUrl)
      .then((response) => response.json())
      .then((data) => console.log('This is your data', data));
  }
  render() {
    return <h1>my Component has Mounted, Check the browser 'console' </h1>;
  }
}
export default bookTitle
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