import React, { Component } from 'react';
import './App.css';
import { Layout, Header, Navigation, Drawer, Content } from 'react-mdl';
import { Link } from 'react-router-dom';
import Main from './components/Main';
class App extends Component {
  render() {
    return (
      <div className="header">
          <Layout>
              <Header className="header-color" title={<Link to="/" style={{textDecoration: 'none', color:'#274046'}}>Eunju HOME</Link>} scroll>
                  <Navigation>
                      <Link to="/aboutme" style={{color:'#274046'}}>About me</Link>
                      <Link to="/project" style={{color:'#274046'}}>Projects</Link>
                      <Link to="/board" style={{color:'#274046'}}>Board</Link>
                      <Link to="/contact" style={{color:'#274046'}}>Contact</Link>
                  </Navigation>
              </Header>
              <Drawer title={<Link to="/" style={{textDecoration: 'none', color:'black'}} onClick={() => this.hideToggle()}>Eunju HOME</Link>}>
                    <Navigation>
                        <Link to="/aboutme" onClick={() => this.hideToggle()}>About me</Link>
                        <Link to="/project" onClick={() => this.hideToggle()}>Projects</Link>
                        <Link to="/board" onClick={() => this.hideToggle()}>Board</Link>
                        <Link to="/contact" onClick={() => this.hideToggle()}>Contact</Link>
                    </Navigation>
              </Drawer>
              <Content>
                  <div className="page-content" />
                  <Main />
              </Content>
          </Layout>
      </div>
    );
  }
}

export default App;
