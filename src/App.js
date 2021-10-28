import React from 'react';
import { Route } from 'react-router-dom';
import i01Hover from './pages/i01Hover';
import i02Click from './pages/i02Click';
import i03Page from './pages/i03Page'
import i04Draw from './pages/i04Draw'
import i05Stamp from './pages/i05Stamp'
import i06Weave from './pages/i06Weave'
import i07Walk from './pages/i07Walk'
import Zoom from './pages/Zoom'


import Main from './pages/Main'
import Interactions from './pages/Interactions'

function App() {
  return (
    <div>
      <Route exact path="/" component={Main} />
      <Route path="/interactions" component={Interactions} />
      <Route path="/01" component={i01Hover} />
      <Route path="/02" component={i02Click} />
      <Route path="/03" component={i03Page} />
      <Route path="/04" component={i04Draw} />
      <Route path="/05" component={i05Stamp} />
      <Route path="/06" component={i06Weave} />
      <Route path="/07" component={i07Walk} />
      <Route path="/zoom" component={Zoom} />
    </div>
  );
}


export default App
