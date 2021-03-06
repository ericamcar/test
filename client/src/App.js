import React, { useState, useEffect } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import General from './pages/General';
import ApplicantSettings from './pages/ApplicantSettings';
import EvaluationSettings from './pages/EvaluationSettings';

function App() {
  const [program, setProgram] = useState('');

  useEffect(() => {
    const getProgram = async () => {
      try {
        const res = await axios.get('/api/programs');
        setProgram(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };

    getProgram();
  }, []);

  return (
    <HashRouter>
      <Header />
      <div className='container'>
        <Sidebar />
        <Switch>
          <Route exact path='/'>
            <General />
          </Route>
          <Route exact path='/applicant-settings'>
            <ApplicantSettings program={program} />
          </Route>
          <Route exact path='/evaluation-settings'>
            <EvaluationSettings program={program} />
          </Route>
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
