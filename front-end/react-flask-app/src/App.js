import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from "./Navbar";
import Posts from "./Posts";
import Comment from "./Comment";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar />
        </header>
        <Switch>
          <Route path="/posts" component={Posts} />
          <Route path="/comment" component={Comment} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;