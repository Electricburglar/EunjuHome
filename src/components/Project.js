import React, { Component } from 'react';
import { Tabs,
  Tab,
  Grid,
  Cell,
  Card,
  CardTitle,
  CardActions,
  CardText,
  Button
 } from 'react-mdl';

class Project extends Component {

  constructor(props) {
    super(props);
    this.state = { activeTab: 0 };
  }

  toggleCategories() {
    if(this.state.activeTab === 0){
      return (
        <div className="projects-grid">
          <Card shadow={5} style={{minwidth: '450', margin: 'auto'}}>
              <CardTitle style={{color: '#000', height: '176px', background: 'url(http://d1841mjet2hm8m.cloudfront.net/thumb-900/fb_1135/1620/0/e2afe0da6cff8e584492eba9abc64071.jpg) center / cover'}}>Movie Web Site #1</CardTitle>
              <CardText>
                This is My First React project.
              </CardText>
              <CardActions border>
                <a href="https://movieapp-ff880.firebaseapp.com/" target="_blank" rel="noopener noreferrer"><Button colored>SHOW</Button></a>
              </CardActions>
          </Card>

          <Card shadow={5} style={{minwidth: '450', margin: 'auto', marginTop: '20px'}}>
              <CardTitle style={{color: '#000', height: '176px', background: 'url(http://d1841mjet2hm8m.cloudfront.net/thumb-900/fr_1099/1620/71/1f08dcacf2536ad2dd539faab023cb16.jpg) center / cover'}}>Movie Web Site #2</CardTitle>
              <CardText>
                This is My Second React project.<br/>
                Make Web App with GraphQL & Apollo.
              </CardText>
              <CardActions border>
                <a href="https://movieapp2-c7203.firebaseapp.com/" target="_blank" rel="noopener noreferrer"><Button colored>SHOW</Button></a>
              </CardActions>
          </Card>

          <Card shadow={5} style={{minwidth: '450', margin: 'auto', marginTop: '20px'}}>
              <CardTitle style={{color: '#000', height: '176px', background: 'url(https://t1.daumcdn.net/cfile/tistory/99A0A5355B546DC12A) center / cover'}}>My Portfolio Site</CardTitle>
              <CardText>
                This is My First Portfolio Site.<br/>
                Make Web Site with GraphQL & Apollo, Bootstrap and MongoDB.
              </CardText>
              <CardActions border>
                <a href="https://eletricburglar.firebaseapp.com/" target="_blank" rel="noopener noreferrer"><Button colored>SHOW</Button></a>
              </CardActions>
          </Card>

          <Card shadow={5} style={{minwidth: '450', margin: 'auto', marginTop: '20px'}}>
              <CardTitle style={{color: '#000', height: '176px', background: 'url(http://cfile22.uf.tistory.com/image/99EBBB3D5B7AC9B9207A2C) center / cover'}}>Todo App Site</CardTitle>
              <CardText>
                This is Todo App.<br/>
                Make Web Site with GraphQL & Apollo and MongoDB.
              </CardText>
              <CardActions border>
                <a href="https://todoapp-ba162.firebaseapp.com" target="_blank" rel="noopener noreferrer"><Button colored>SHOW</Button></a>
              </CardActions>
          </Card>
        </div>
      )
    }
    else if(this.state.activeTab === 1) {
      return (
        <div className="projects-grid">
        <Card shadow={5} style={{minwidth: '450', margin: 'auto'}}>
            <CardTitle style={{color: '#000', height: '176px', background: 'url(https://godpeople.or.kr/files/attach/images/15241/285/356/003/110ba99ae2b4ea01cef49fd68d2d8bc1.png) center / cover'}}>KakaoTalk ChatBot</CardTitle>
            <CardText>
              This is My First Python project.
            </CardText>
            <CardActions border>
                <a href="http://pf.kakao.com/_rxfVUC" target="_blank" rel="noopener noreferrer"><Button colored>SHOW</Button></a>
            </CardActions>
        </Card>
      </div>
      )
    }
  }

  render() {
    return(
      <div className="category-tabs">
        <Tabs
          activeTab={this.state.activeTab}
          onChange={(tabId) => this.setState({
            activeTab: tabId
          })}
          ripple>
          <Tab>ReactJS</Tab>
          <Tab>Python</Tab>
        </Tabs>

        <Grid className="projects-grid">
          <Cell col={12}>
            <div calssName="content">
              {this.toggleCategories()}
            </div>
          </Cell>
        </Grid>

      </div>
    )
  }
}

export default Project;