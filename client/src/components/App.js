import React, { Component } from "react";
import ChapterList from "./Chapters/ChapterList";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ChapterList />
      </div>
    );
  }
}

export default App;
