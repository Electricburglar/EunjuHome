import React from "react";
import PropTypes from 'prop-types';
import { Query, graphql, compose } from "react-apollo";
import { getPosts, countPost } from '../queries';
import { Link, withRouter } from 'react-router-dom'
import { Table, Input, Select, Button, Icon } from 'antd';
import styled from "styled-components";

const GraphQLMargin = styled.div`
    margin-top: 60px;
    margin-bottom: 60px;
    text-align: center;
`;

const Column = Table;
const Search = Input.Search;
const Option = Select.Option;

class MainBoard extends React.Component {

  constructor(props) {
    super();  
    this.state = {
        type: 'title'
    };
  }

  handleChange = (type) => {
    this.setState({
      type
    });
  }

  handleSearch = (value) => {
    if(value !== "")
      this.props.history.replace('/search/'+this.state.type+'/'+value)
    else
    {
      alert("검색 할 내용을 입력해주세요.");
    }
  }

  render() {
      return (
          <div className="container">
            <p className="text-right" style={{marginTop: '40px'}}>
              <Button type="primary" ghost><Link to="/write">글쓰기</Link></Button>
            </p>
              <Board props={this.props}/>
              <div className="text-right">
                <Select defaultValue="제목" style={{ width: 110 }} onChange={this.handleChange}>
                  <Option value="title">제목</Option>
                  <Option value="comment">내용</Option>
                  <Option value="titleComment">제목+내용</Option>
                  <Option value="author">작성자</Option>
                </Select>
                <Search placeholder="검색" enterButton="검색" size="default" style={{marginTop: '10px', width: '50%'}}
                    onSearch = {(value) => {
                        if(value !== "")
                          this.props.history.replace('/search/'+this.state.type+'/'+value)
                        else
                        {
                          alert("검색 할 내용을 입력해주세요.");
                        }}}/>
              </div>
          </div>
      )
  }
}

const Board = ({props}) => <Query query={getPosts}>
    {({loading, data, error, refetch}) => {
      if(loading) return <GraphQLMargin><Icon type="loading" style={{marginRight: '10px'}}/>Loading</GraphQLMargin>;
      if(error) return <GraphQLMargin>페이지에 오류가 발생하였습니다.</GraphQLMargin>;
      
      refetch(data.posts);
      const posts = data.posts.slice(0).reverse();
   
      return (
        <div className="container">
          <Table dataSource={posts}
          pagination={{ pageSize: 10 }}
          size="middle"
          rowKey='_id'>
            <Column
              title = '제목'
              key = 'title'
              render = {(post) => {
                let Istoday = false;
                const d = new Date();
                const date = [
                  d.getFullYear().toString().substr(2,4),
                  (d.getMonth()+1).toString().length === 2 ? (d.getMonth()+1).toString() : "0"+(d.getMonth()+1).toString(),
                  (d.getDate()).toString().length === 2 ? (d.getDate()).toString() : "0"+(d.getDate()).toString()
                ].join('-');
                if(post.date.substring(0,8) === date)
                  Istoday = true;

                return <Link to={'/board/'+post._id} style={{textDecoration: 'none', color:'black'}} onClick={
                  async (e) => {
                    e.preventDefault();
                    await props.countPostMutation({
                        variables: {
                            _id: post._id,
                        },
                      });
                    props.history.replace('/board/'+post._id);
                  }}>{post.title} <span className="badge badge-light">{post.countComment}</span>{Istoday && <span style={{marginLeft: '3px'}} className="badge badge-warning">new</span>}</Link>
              }}
              width = '*'
            />
            <Column
              title = '작성자'
              dataIndex = 'author'
              key = 'author'
              width = '20%'
              className = 'text-center'
            />
            <Column
              title ='날짜'
              render= {(post) => {
                return post.date.substring(0,14);
              }}
              key = 'date'
              width = '30%'
              className = 'text-center'
            />
            <Column
              title = '조회수'
              dataIndex = 'count'
              key = 'count'
              width = '20%'
              className = 'text-right'
            />
          </Table>
        </div>
      );
    }}
</Query>;

Board.propTypes = {
  props: PropTypes.object.isRequired 
}

export default compose(
  graphql(countPost, { name: 'countPostMutation'})
)(withRouter(MainBoard));