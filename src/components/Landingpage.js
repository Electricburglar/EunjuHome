import React, { Component } from 'react';
import { Grid, Cell } from 'react-mdl';

class LandingPage extends Component {
  render() {
    return(
      <div style={{width: '100%', height:'100%', margin: 'auto'}}>
        <Grid className="landing-grid">
          <Cell col={12}>
            <img
              src="https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="avartar"
              className="avartar-img"
              style={{width: '250px', height: '250px'}} />

            <div className="banner-text">
              <h1>Developer</h1>
              <hr style={{ borderTop: '2px solid' }}/>
              <p>HTML+CSS | JavaScript | Bootstrap | ReactJS | GraphQL | JAVA</p>
              <div className="social-links">
                <a href="http://mail.naver.com" rel="noopener noreferrer" target="_blank">
                  <i className="fas fa-envelope-square" aria-hidden="true" />
                </a>
                <a href="https://github.com/Electricburglar" rel="noopener noreferrer" target="_blank">
                  <i className="fab fa-github" aria-hidden="true" />
                </a>
                <a href="http://electricburglar.tistory.com/" rel="noopener noreferrer" target="_blank">
                  <i className="fab fa-internet-explorer" aria-hidden="true" />
                </a>
              </div>
            </div>
          </Cell>
        </Grid>
      </div>
    )
  }
}

export default LandingPage;
