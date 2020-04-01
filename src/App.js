import React from 'react';
import { Layout, Breadcrumb, Menu } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Overview from './pages/Overview';
import './App.css';
import logo from './resources/logo.png'

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
            <img src={logo} className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
              <Menu.Item key="1">Karte</Menu.Item>
              <Menu.Item key="2">Kontakt</Menu.Item>
              <Menu.Item key="3">Impressum</Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Start</Breadcrumb.Item>
              <Breadcrumb.Item>WoGiltWas?</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-content">
              <Router>
                <Switch>
                  <Route path="/" component={Overview} />
                </Switch>
              </Router>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>WoGiltWas? ©2020</Footer>
        </Layout>
      </div>
    )
  };
}

export default App;
