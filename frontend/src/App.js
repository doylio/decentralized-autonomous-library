//import logo from './logo.svg';
import './App.css';
import React from "react";



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <b>Ethereum Public Library System</b>
        </p>
        <table>
          <tr>
            <th>Internal Search</th>
            <th>External Search</th>
          </tr>
          <tr>
            <td>
            <label for="barcode">Barcode</label>
            <br></br>
            <input type="text" id="barcode" name="barcode"></input>
            <br></br>
            <label for="item_title">Title</label>
            <br></br>
            <input type="text" id="item_title" name="item_title"></input>
            <br></br>
            <label for="author_name">Author</label>
            <br></br>
            <input type="text" id="author_name" name="author_name"></input>
            <br></br>
            <input type="submit" value="Search"></input>
            </td>
            <td>
            <label for="barcode">Barcode</label>
            <br></br>
            <input type="text" id="barcode" name="barcode"></input>
            <br></br>
            <label for="item_title">Title</label>
            <br></br>
            <input type="text" id="item_title" name="item_title"></input>
            <br></br>
            <label for="author_name">Author</label>
            <br></br>
            <input type="text" id="author_name" name="author_name"></input>
            <br></br>
            <input type="submit" value="Search"></input>
            </td>
          </tr>
        </table>
      </header>
    </div>
  );
}

export default App;
