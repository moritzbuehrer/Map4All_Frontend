import React from 'react';
import { Layout, Breadcrumb, Menu } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Overview from './pages/Overview';
import Contact from './pages/Contact';
import Impressum from './pages/Impressum';
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
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['/map']}>
              <Menu.Item key="/map"><a href="/map">Karte</a></Menu.Item>
              <Menu.Item key="/contact"><a href="/contact">Kontakt</a></Menu.Item>
              <Menu.Item key="/impressum"><a href="/impressum">Impressum</a></Menu.Item>
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
                  <Redirect exact from="/" to="/map" />
                  <Route path="/map" component={Overview} />
                  <Route path="/contact" component={Contact} />
                  <Route path="/impressum" component={Impressum} />
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
