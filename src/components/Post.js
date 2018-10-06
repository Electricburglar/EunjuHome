import React from 'react';
import PropTypes from 'prop-types';
import { getPost } from '../queries';
import { Query } from 'react-apollo';
import { Icon } from 'antd';
import styled from "styled-components";

const GraphQLMargin = styled.div`
    margin-top: 60px;
    margin-bottom: 60px;
    text-align: center;
`;

class Post extends React.Component {

    render() {
        return(
            <Query query={ getPost } variables={{ _id: this.props.id }}>
            {({loading, data, error, refetch}) => {
                if(loading) return <GraphQLMargin><Icon type="loading" style={{marginRight: '10px'}}/>Loading</GraphQLMargin>;
                if(error) return <GraphQLMargin>페이지에 오류가 발생하였습니다.</GraphQLMargin>;
                refetch(data.post);
                return (
                    <form style={{marginTop: '45px'}}>
                        <div>               
                            <label>제목</label>
                            <input className="form-control" type="text" readOnly value={data.post.title}/>
                        </div>
                        <div>
                            <label>작성자</label>
                            <input className="form-control" type="text" readOnly value={data.post.author}/>
                        </div>
                        <div className="form-group">
                            <label>내용</label>
                            <textarea
                            className="form-control"
                            disabled="true"
                            rows="5"
                            defaultValue={data.post.content}/>
                        </div>
                        <hr />
                    </form>
                );
        }}</Query>
        );
    }
}

Post.propTypes = {
    id: PropTypes.string.isRequired 
}

export default Post;