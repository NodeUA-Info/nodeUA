import React, { Component } from "react";
import ChapterList from "./Chapters/ChapterList";
import Header from "./Header";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <ChapterList />
      </div>
    );
  }
}

export default App;
