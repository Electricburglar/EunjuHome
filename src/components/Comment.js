import React from 'react';
import PropTypes from 'prop-types';
import { getComments } from '../queries';
import { Query } from 'react-apollo';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import styled from "styled-components";

const GraphQLMargin = styled.div`
    margin-top: 60px;
    margin-bottom: 60px;
    text-align: center;
`;
class Comment extends React.Component {

    render() {
        return (
            <Query query={ getComments } variables={{PostID: this.props.id}}>
                {({loading, data, error, refetch}) => {
                    if(loading) return <GraphQLMargin><Icon type="loading" style={{marginRight: '10px'}}/>Loading</GraphQLMargin>;
                    if(error) return <GraphQLMargin>페이지에 오류가 발생하였습니다.</GraphQLMargin>;

                    refetch(data.comments);
                    
                    if(data.comments.length !== 0)
                    {
                        return (
                            <div>
                                <br />
                                <table className="table table-hover">
                                    <tbody>
                                        {data.comments.slice(0).reverse().map(comment =>
                                        <tr key={comment._id}>
                                            <td className="text-left">{comment.text}</td>
                                            <td className="text-right">{comment.date}</td>
                                            <td className="text-right"><Link to={"/deleteReply/"+this.props.id+"/"+comment._id}><Icon type="close-square-o"/></Link></td>
                                        </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )
                    }
                    else
                    {
                        return <div className="text-center" style={{marginTop: '50px', marginBottom: '50px'}}>등록된 댓글이 없습니다.</div>
                    }
                }
            }</Query>
        );
    }
}

Comment.propTypes = {
    id: PropTypes.string.isRequired 
}

export default Comment;