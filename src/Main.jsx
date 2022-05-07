import { Route, Switch } from 'react-router-dom';
import React, { lazy } from 'react';
import { SiderBar } from './component/Sider.jsx';

import { Layout } from 'antd';
import 'antd/dist/antd.css';
const UseRef2 = lazy(async () => await import('./page/studyUseRef/useRef2'));
const StudyUseRef = lazy(async () => await import('./page/studyUseRef/index.jsx'));
const StudyUseRef1 = lazy(async () => await import('./page/studyUseRef/useRef1'));
const StudyUseContext = lazy(async () => await import('./page/studyUseContext/useContext'));
const ErrorBoundayCase = lazy(async () => await import('./page/ErrorBoundary/index1'));
const ErrorBoundayCase2 = lazy(async () => await import('./page/ErrorBoundary/index2'));
const ErrorBoundayCase3 = lazy(async () => await import('./page/ErrorBoundary/index3'));
const ErrorBoundayCase4 = lazy(async () => await import('./page/ErrorBoundary/index4'));
const ErrorBoundayCase5 = lazy(async () => await import('./page/ErrorBoundary/index5'));
const ErrorBoundayCase6 = lazy(async () => await import('./page/ErrorBoundary/index6'));
const UseErrorBoundayCase = lazy(async () => await import('./page/UseErrorBoundary/index'));
const { Header, Footer, Sider, Content } = Layout;
export const Main = () => {
  return (
    <Layout>
<<<<<<< HEAD
      <Header className="site-layout-background" style={{ color: '#fcfcfc' }}>
        React Header
      </Header>
=======
      <Header className="site-layout-background">Header</Header>
>>>>>>> 39b736ad9ebc634b1689b7d736bb8bb5718ed81d
      <Layout>
        <Sider width={256}>
          <SiderBar />
        </Sider>
        <Content
<<<<<<< HEAD
=======
          style={{ padding: 20 }}
>>>>>>> 39b736ad9ebc634b1689b7d736bb8bb5718ed81d
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 500,
          }}
        >
          <Switch>
            <Route path="/study/main" component={UseRef2} />
            {/* <Route path="/study/useref" component={StudyUseRef1}>
              <Route path="/study/useref/useref2" exact={true} component={UseRef2} />
              <Route path="/study/useref" exact={true} component={StudyUseRef1} />
            </Route> */}
            <Route path="/study/useref/useref2" exact={true} component={UseRef2} />
            <Route path="/study/useref" exact={true} component={StudyUseRef1} />
            <Route path="/study/useContext" component={StudyUseContext} />
            <Route path="/study/use/useref2" component={UseRef2} />
            <Route path="/study/errorbounary" component={ErrorBoundayCase} />
            <Route path="/study/errorbounary2" component={ErrorBoundayCase2} />
            <Route path="/study/errorbounary3" component={ErrorBoundayCase3} />
            <Route path="/study/errorbounary4" component={ErrorBoundayCase4} />
            <Route path="/study/errorbounary5" component={ErrorBoundayCase5} />
            <Route path="/study/errorbounary6" component={ErrorBoundayCase6} />
            <Route path="/study/useerrorbounary" component={UseErrorBoundayCase} />
          </Switch>
        </Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
};
