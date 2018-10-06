import React from 'react';
import { createComment } from '../queries';
import { graphql, compose } from 'react-apollo';
import { Button } from 'antd';
import { withRouter } from 'react-router-dom';
import crypto from 'crypto';

class CreateComment extends React.Component {

    constructor(props) {
        super()
        this.state = {
            comment: '',
            commentPW: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        if(this.state.comment === '')
        {
            alert("댓글을 입력해주세요.");
            return ;
        }

        if(this.state.commentPW === '')
        {
            alert("비밀번호를 입력해주세요.");
            return ;
        }

        const d = new Date();
        const date = [
            d.getFullYear().toString().substr(2,4),
            (d.getMonth()+1).toString().length === 2 ? (d.getMonth()+1).toString() : "0"+(d.getMonth()+1).toString(),
            d.getDate().toString().length === 2 ? d.getDate() : "0"+d.getDate()
        ].join('-') + " " +
        [
            (d.getHours()).toString().length === 2 ? (d.getHours()).toString() : "0"+(d.getHours()).toString(),
            (d.getMinutes()).toString().length === 2 ? (d.getMinutes()).toString() : "0"+(d.getMinutes()).toString(),
            (d.getSeconds()).toString().length === 2 ? (d.getSeconds()).toString() : "0"+(d.getSeconds()).toString()
        ].join(':');

        const salt = crypto.randomBytes(64).toString('base64');
        const iter = 10000;
        const hash = crypto.pbkdf2Sync(this.state.commentPW, salt, iter, 64, 'sha512').toString('base64');

        const password = {
            salt,
            iter,
            hash
        };

        await this.props.createCommentMutation({
        variables: {
            PostID: this.props.match.params.id,
            text: this.state.comment,
            date: date,
            password
        },
        });

        document.getElementById('comment').value = "";
        document.getElementById('commentPW').value = "";          
        this.props.history.replace('/board/'+this.props.match.params.id);
    }

    render() {
        return(
            <div>
                <hr/>
                <form className="form-inline">
                    <label style={{marginRight: '3px'}}>댓글</label>
                    <input 
                        placeholder="댓글"
                        maxLength="20"
                        id="comment"
                        className="form-control col-6"
                        type="text"
                        name="comment"
                        defaultValue={this.state.comment}
                        onChange={this.handleChange}/>
                    <label style={{marginLeft: '3px', marginRight: '3px'}}>비밀번호</label>
                    <input 
                        id="commentPW"
                        name="commentPW"
                        placeholder="비밀번호"
                        maxLength="8"
                        type="password"
                        className="form-control"
                        style={{width: '20%'}}
                        defaultValue={this.state.commentPW}
                        onChange={this.handleChange}/>
                    <div className="reply-btn">
                    <Button type="primary" ghost style={{marginLeft: '3px'}} onClick={this.handleSubmit}>입력</Button></div>
                </form>
            </div>
        )
    }
}

export default compose(
    graphql(createComment, { name: 'createCommentMutation'})
)(withRouter(CreateComment));