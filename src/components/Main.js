import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Landingpage, AboutMe, Project, Contact, Board, PostContainer, UpdatePost, CreatePost, DeleteComment, Search, DeletePost, NoMatch} from './index';

const Main = () => (
  <Switch>
    <Route exact path="/" component={Landingpage} />
    <Route path="/aboutme" component={AboutMe} />
    <Route path="/project" component={Project} />
    <Route path="/contact" component={Contact} />
    <Route path="/board/:id" component={PostContainer} />
    <Route path="/board" component={Board} />
    <Route path="/update/:id" component={UpdatePost} />
    <Route path="/write" component={CreatePost} />
    <Route path="/delete/:id" component={DeletePost} />
    <Route path="/deleteReply/:Postid/:Commentid" component={DeleteComment} />
    <Route path="/search/:type/:value" component={Search} />
    <Route path="*" component={NoMatch} />
  </Switch>
)

export default Main;
