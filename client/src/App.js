import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from "./components/views/Home/Home";
import Login from "./components/views/Login/Login";
import Register from "./components/views/Register/Register";
import Navbar from "./components/views/Navbar/Navbar";
import Footer from "./components/views/Footer/Footer";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
        <hr></hr>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

