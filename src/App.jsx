import React, { Suspense } from 'react';
import { HashRouter, Route, Switch, BrowserRouter, Router } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';
import { Main } from './Main.jsx';

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div style={{ margin: 'auto' }}>Lazy Loading...</div>}>
        <Switch>
          <Route path="/" component={Main} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
