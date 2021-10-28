import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';
import StudyUseRef from './page/studyUseRef/index.jsx';
import StudyUseRef1 from './page/studyUseRef/useRef1';
import StudyUseContext from './page/studyUseContext/useContext';
function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/study/main" component={StudyUseRef} />
        <Route path="/study/useref" component={StudyUseRef1} />
        <Route path="/study/useContext" component={StudyUseContext} />
      </Switch>
    </HashRouter>
  );
}

export default App;
