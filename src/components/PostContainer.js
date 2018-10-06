import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import Post from './Post';
import Comment from './Comment';
import CreateComment from './CreateComment';

class PostContainer extends React.Component {

    render() {
        const id = this.props.match.params.id;
        return (
            <div className="container">
                <Post id={id}/>
                <div className="text-right">
                    <Button style={{marginRight: '3px'}}><Link to={"/update/"+id}>수정</Link></Button>
                    <Button style={{marginRight: '3px'}}><Link to={"/delete/"+id}>삭제</Link></Button>
                    <Button ><Link to="/board">목록</Link></Button>
                </div>
                <CreateComment />
                <Comment id={id}/>
            </div>
        )
    }
}

export default PostContainer;