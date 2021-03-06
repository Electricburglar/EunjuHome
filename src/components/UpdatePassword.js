import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import { checkPassword } from '../queries';
import { Button, Input, Icon } from 'antd';
import cookie from 'react-cookies';

class UpdatePassword extends React.Component {
    
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
        const _id = this.props.match.params.id;
        const password = this.state.password

        if(password === '')
        {
            alert("비밀번호를 입력해주세요.");
            return ;
        }

        const check = await this.props.checkPasswordMutation({
            variables: {
                _id,
                password,
            },
        })

        if(check.data.checkPassword === true)
        {
            const cookieOptions = {
                path: '/',
                maxAge: 60
            }
            cookie.save('check', true, cookieOptions);
            this.props.history.replace('/update/'+_id);
        }
        else
        {
            alert("비밀번호가 맞지 않습니다.");
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
                    <Button style={{marginRight: '3px'}} onClick={this.submitForm}>확인</Button>
                    <Button><Link to={"/board/"+this.props.match.params.id}>취소</Link></Button>
                </p>
            </div>
        );
    }
}
export default compose(
    graphql(checkPassword, { name: 'checkPasswordMutation'}),
)(withRouter(UpdatePassword));