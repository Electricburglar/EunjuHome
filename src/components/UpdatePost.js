import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import { getPost, getPosts, updatePost } from '../queries';
import { message, Button } from 'antd';
import UpdatePassword from './UpdatePassword';
import cookie from 'react-cookies';

class UpdateComment extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            content: ''
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    submitForm = async (e) => {
        e.preventDefault();

        const _id = this.props.match.params.id;
        let title = '';
        let content = '';

        if(this.state.title !== '')
            title = this.state.title;
        else
            title = this.props.getPostQuery.post.title;

        if(this.state.content !== '')
            content = this.state.content;
        else
            content = this.props.getPostQuery.post.content;

        const check = await this.props.updatePostMutation({
            variables: {
                _id,
                title,
                content,
            },
            refetchQueries: [{
                query: getPosts
            }],
        });

        if(check.data.updatePost === true)
            message.success('수정 완료');
        else
            message.error('수정 실패');

        cookie.remove('check');
        this.props.history.replace('/board/'+_id);
    }

    render() {
        if(this.props.getPostQuery.post === undefined) {
            return <div className="text-center" style={{marginTop: '60px', marginBottom: '60px'}}>Loading</div>;
        }
        else {
            const check = cookie.load('check');
            if(check === "true")
            {
                return(
                    <div className="container" style={{marginTop: '45px'}}>
                    <form>
                        <div>               
                            <label>제목</label>
                            <input
                                name="title"
                                className="form-control"
                                type="text"
                                defaultValue={this.props.getPostQuery.post.title}
                                onChange={this.handleChange}/>                   
                        </div>
                        <div>
                            <label>글쓴이</label>
                            <input
                                name="author" 
                                className="form-control"
                                type="text"
                                readOnly
                                value={this.props.getPostQuery.post.author}
                                onChange={this.handleChange}/>
                        </div>
                        <div>
                            <label>내용</label>
                            <textarea
                                name="content"
                                className="form-control"
                                defaultValue={this.props.getPostQuery.post.content}
                                onChange={this.handleChange}
                                rows="5"
                                />
                        </div>
                        <br />
                        <div className="text-center">
                            <Button style={{marginRight: '3px'}} onClick={this.submitForm}>저장</Button>
                            <Button><Link to={"/board/"+this.props.match.params.id} onClick={()=> {
                                cookie.remove('check');
                            }}>취소</Link></Button>
                        </div>
                    </form>
                    </div>
                );
            }
            else
            {
                return <UpdatePassword />;
            }
        }
    }
}

export default compose(
    graphql(updatePost, { name: 'updatePostMutation'}),
    graphql(getPost, { name: 'getPostQuery', options: (props) => ({
        variables: {
            _id: props.match.params.id
        },
    })}),
)(withRouter(UpdateComment));