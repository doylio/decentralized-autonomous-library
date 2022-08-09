//import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Ethereum Public Library System
        </p>
        <label for="barcode">Barcode</label>
        <input type="text" id="barcode" name="barcode"></input>
        <label for="item_title">Title</label>
        <input type="text" id="item_title" name="item_title"></input>
        <label for="author_name">Author</label>
        <input type="text" id="author_name" name="author_name"></input>
        <br></br>
        <input type="submit" value="Search"></input>
      </header>
    </div>
  );
}

export default App;
