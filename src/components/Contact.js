import React, { Component } from 'react';
import { Grid, Cell, List, ListItem, ListItemContent } from 'react-mdl';

class Contact extends Component {
  render() {
    return(
      <div className="contact-body">
      <Grid>
        <Cell className="text-center" col={4}>
            <img
              src="https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="avatar"
              className="contact-img"
              style={{height: '300px', width: '300px'}}
            />
            <h1 style={{fontFamily: 'Roboto'}}>Eunju</h1>
        </Cell>
        <Cell className="text-center" col={8}>
        <h2 style={{fontFamily:'Anton'}}>Contact Me</h2>
        <hr />
        <div className="contact-list">
          <List>
            <ListItem>
              <ListItemContent>
                <i className="fa fa-envelope" aria-hidden="true"/>
                <h2>ksioop@naver.com</h2>
              </ListItemContent>
            </ListItem>

            <ListItem>
              <ListItemContent>
                <i className="fab fa-internet-explorer" aria-hidden="true"/>
                <a href="http://electricburglar.tistory.com/" rel="noopener noreferrer" target="_blank"><h3>http://electricburglar.tistory.com/</h3></a>
              </ListItemContent>
            </ListItem>

            <ListItem>
              <ListItemContent>
                <i className="fab fa-github" aria-hidden="true"/>
                <a href="https://github.com/Electricburglar" rel="noopener noreferrer" target="_blank"><h3>https://github.com/Electricburglar</h3></a>
              </ListItemContent>
            </ListItem>
          </List>
          <hr />
        </div>
        </Cell>
      </Grid>
    </div>
    )
  }
}

export default Contact;
