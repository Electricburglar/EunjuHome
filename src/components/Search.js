import React from "react";
import { Query } from "react-apollo";
import { getSearch } from '../queries';
import { Link } from 'react-router-dom';
import { Table, Input, Select, Button } from 'antd';
const Search = Input.Search;
const Option = Select.Option;
const Column = Table;

class MainSearch extends React.Component {

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

    render() {
        return (
            <div className="container">
                <SearchBoard props={this.props}/>
                <div className="text-right">
                    <Select defaultValue="제목" style={{ width: 110 }} onChange={this.handleChange}>
                        <Option value="title">제목</Option>
                        <Option value="content">내용</Option>
                        <Option value="titleContent">제목+내용</Option>
                        <Option value="author">작성자</Option>
                    </Select>
                    <Search placeholder="검색" enterButton="검색" defaultValue="" size="default" style={{marginTop: '10px', width: '50%'}}
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

const SearchBoard = ({ props }) => <Query query={ getSearch } variables={{ type: props.match.params.type, value: props.match.params.value }}>
      {({loading, data, error, refetch}) => {
      if(loading) return <div className="text-center" style={{marginTop: '60px', marginBottom: '60px'}}>Loading</div>;
      if(error) return <div className="text-center" style={{marginTop: '60px', marginBottom: '60px'}}>Error</div>;

      refetch(data.search);
      const searchs = data.search.slice(0).reverse();
      return (
        <div className="container">
          <div className="text-right" style={{marginTop: '40px', marginBottom: '10px'}}>
            <Button type="primary" ghost style={{marginRight: '3px'}}><Link to="/board">목록</Link></Button>
            <Button type="primary" ghost><Link to="/write">글쓰기</Link></Button>
          </div>
          <Table dataSource={searchs}
          pagination={{ pageSize: 10 }}
          size="middle"
            rowKey='_id'>
            <Column
              title = '제목'
              key = 'title'
              render = {(post) => {

                const d = new Date();
                const date = [
                  d.getFullYear().toString().substr(2,4),
                  (d.getMonth()+1).toString().length === 2 ? (d.getMonth()+1).toString() : "0"+(d.getMonth()+1).toString(),
                  d.getDate()
                ].join('-');

                if(post.date.substring(0,8) !== date)
                  return <Link to={'/board/'+post._id} style={{textDecoration: 'none', color:'black'}}>{post.title} <span class="badge badge-light">{post.countComment}</span></Link>
                else
                  return <Link to={'/board/'+post._id} style={{textDecoration: 'none', color:'black'}}>{post.title} <span class="badge badge-light">{post.countComment}</span><span style={{marginLeft: '3px'}} className="badge badge-warning">new</span></Link>
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
              dataIndex ='date'
              key = 'date'
              width = '30%'
              className = 'text-center'
            />
          </Table>
        </div>
      );
    }}
</Query>

export default MainSearch;