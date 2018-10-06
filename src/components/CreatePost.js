import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import { getPosts, createPost } from '../queries';
import crypto from 'crypto';
import { Form, Input, Button } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;

class WritePost extends React.Component {

    handleSubmit = async (e) => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll(async (err, values) => {
        if (!err) {
          const {
            title,
            author,
            content,
            password
          } = values;

        const salt = crypto.randomBytes(64).toString('base64');
        const iter = 10000;
        const hash = crypto.pbkdf2Sync(password, salt, iter, 64, 'sha512').toString('base64');

        const pw = {
            salt,
            iter,
            hash
        };

        const d = new Date();
        const date = [
            d.getFullYear().toString().substr(2,4),
            (d.getMonth()+1).toString().length === 2 ? (d.getMonth()+1).toString() : "0"+(d.getMonth()+1).toString(),
            d.getDate().toString().length === 2 ? d.getDate() : "0"+d.getDate()
        ].join('-') + " " +
        [
            (d.getHours()).toString().length === 2 ? (d.getHours()).toString() : "0"+(d.getHours()).toString(),
            (d.getMinutes()).toString().length === 2 ? (d.getMinutes()).toString() : "0"+(d.getMinutes()).toString(),
            (d.getSeconds())
        ].join(':');

        await this.props.createPostMutation({
            variables: {
                title, 
                author, 
                content,
                password: pw,
                date
            },
            refetchQueries: [{
                query: getPosts
            }],
        });

        this.props.history.replace('/board');
        }
      })
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 8 },
          },
        };
        const tailFormItemLayout = {
          wrapperCol: {
            xs: {
              span: 16,
              offset: 0,
            },
            sm: {
              span: 16,
              offset: 4,
            },
          },
        };

        return(
            <div className="container" style={{marginTop: '45px'}}>
              <Form onSubmit={this.handleSubmit}>
                <FormItem
                  {...formItemLayout}
                  label="제목"
                >
                  {getFieldDecorator('title', {
                    rules: [{
                      required: true, message: '제목을 입력해주세요.',
                    }, {
                      max: 16, message: '16글자 이하 입력해주세요.'
                    }],
                  })(
                    <Input type="text" placeholder="제목"/>
                  )}
                </FormItem>      
                <FormItem
                  {...formItemLayout}
                  label="작성자"
                >
                  {getFieldDecorator('author', {
                    rules: [{
                      required: true, message: '작성자를 입력해주세요.',
                    }, {
                      max: 10, message: '10글자 이하 입력해주세요.'
                    }],
                  })(
                    <Input type="text" placeholder="작성자"/>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="내용"
                >
                  {getFieldDecorator('content', {
                    rules: [{
                      required: true, message: '내용을 입력해주세요.',
                    }],
                  })(
                    <TextArea rows={7} placeholder="내용"/>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="비밀번호"
                >
                  {getFieldDecorator('password', {
                    rules: [{
                      required: true, message: '비밀번호를 입력해주세요.',
                    }, {
                      min: 4, message: '4글자 이상 입력해주세요.'
                    }, {
                      max: 8, message: '8글자 이하 입력해주세요.'
                    }],
                  })(
                    <Input type="password" placeholder="비밀번호"/>
                  )}
                </FormItem>
                <FormItem {...tailFormItemLayout} className="text-center">
                  <Button htmlType="submit" style={{marginRight: '3px'}}>작성</Button>
                  <Button ><Link to='/board'>취소</Link></Button>
                </FormItem>
              </Form>
            </div>
        );
    }
}

const WritePostForm = Form.create()(WritePost);

export default compose(
    graphql(createPost, { name: 'createPostMutation'})
)(withRouter(WritePostForm));