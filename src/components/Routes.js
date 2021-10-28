import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import i01Hover from "../Pages/i01Hover";
import i02Click from "../Pages/i02Click";
import i03Click from "../Pages/i03Page";
import Header from "./Header";


export default () => (
    <Router>
      <Route path="/01" component={i01Hover} /> 
      <Route path="/02" component={i02Click} />
      <Route path="/03" component={i03Click} />
    </Router>
  )