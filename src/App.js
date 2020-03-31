import React from 'react';
import { Layout, Breadcrumb, Menu } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Overview from './pages/Overview';
import './App.css';

const { Header, Content, Footer } = Layout;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    return (
      <div className="App">
        <Layout className="layout">
          <Header>
            
            <span className="title">
              <div>Map4All</div>
            </span>
 
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Start</Breadcrumb.Item>
              <Breadcrumb.Item>Map4All</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-content">
              <Router>
                <Switch>
                  <Route path="/" component={Overview} />
                </Switch>
              </Router>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Map4All ©2020</Footer>
        </Layout>
      </div>
    )
  };
}

export default App;
