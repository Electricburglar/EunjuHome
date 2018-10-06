import React, { Component } from 'react';
import { Grid, Cell } from 'react-mdl';
import Education from './Education';
import Experience from './Experience';
import Skills from './Skills';

class AboutMe extends Component {
  render() {
    return(
      <div>
        <Grid>
          <Cell col={4}>
            <div style={{textAlign:'center'}}>
              <img
                src="https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="avatar"
                style={{height: '200px'}} />
            </div>         
            <h2 style={{paddingTop: '2em'}}>Shin Eunju</h2>
            <h4 style={{color: 'grey'}}>Programmer</h4>
            <hr style={{borderTop: '3px solid #833fb2', width: '50%'}}/>
            <h5>Email</h5>
            <p>ksioop@naver.com</p>
            <h5>Web</h5>
            <p><a href="http://electricburglar.tistory.com/">http://electricburglar.tistory.com/</a></p>
            <p><a href="https://github.com/Electricburglar">https://github.com/Electricburglar</a></p>
            <hr style={{borderTop: '3px solid #833fb2', width: '50%'}}/>
          </Cell>
          <Cell className="aboutme-right-col" col={8}>
            <h2>Education</h2>
            <Education
              startYear={2010.03}
              endYear={2013.02}
              schoolName="Seongpo Highschool"         
              />
            <Education
              startYear={2013.03}
              endYear={2017.02}
              schoolName="Soongsil University"
              schoolDescription="School of Computer Science & Engineering"           
              />
            <hr style={{borderTop: '3px solid #e22947'}}/>
            <h2>Experience</h2>
            <Experience
              startYear={2017.04}
              endYear={2017.12}
              companyName="TmaxSoft"
              companyDescription="Samsung Sone Cloud Project & SW Development"         
              />
            <hr style={{borderTop: '3px solid #e22947'}}/>
            <h2>Skills</h2>
            <Skills skill="HTML/CSS" progress={75}/>
            <Skills skill="JavaScript" progress={75}/>
            <Skills skill="ReactJS" progress={65}/>
            <Skills skill="Java" progress={75}/>
          </Cell>
        </Grid>
      </div>
    )
  }
}

export default AboutMe;
