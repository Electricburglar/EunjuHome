import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import { deleteComment } from '../queries';
import { message, Icon, Button, Input } from 'antd';

class DeleteComment extends React.Component {
    
    constructor(props) {
        super();       
        this.state = {
            password: ''
        };
    }

    handleChange = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    submitForm = async (e) => {
        e.preventDefault();
        
        const { password } = this.state;
        const _id = this.props.match.params.Commentid;
        const PostID = this.props.match.params.Postid;

        if(password === '')
        {
            alert("비밀번호를 입력해주세요.");
            return ;
        }

        const check = await this.props.deleteCommentMutation({
            variables: {
                _id,
                password,
                PostID
            },
        });
        
        if(check.data.deleteComment === true)
        {
            message.success('댓글 삭제 완료');
            this.props.history.replace('/board/'+PostID);
        }
        else
        {
            alert("비밀번호가 맞지 않습니다.")
        }
    }

    render() {

        return(
            <div className="container text-center" style={{marginTop: '45px'}}>             
                <p>
                    <label>비밀번호</label>
                    <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    maxLength="8"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChange}/>
                </p>
                <p>
                    <Button style={{marginRight: '3px'}} onClick={this.submitForm}>삭제</Button>
                    <Button><Link to={"/board/"+this.props.match.params.Postid}>취소</Link></Button>
                </p>
            </div>
        );
    }
}

export default compose(
    graphql(deleteComment, { name: 'deleteCommentMutation'}),
)(withRouter(DeleteComment));