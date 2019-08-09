import 'braft-editor/dist/index.css';
import React from 'react';
import BraftEditor from 'braft-editor';
import { Form, Input, Button, Select } from 'antd';

class FormDemo extends React.Component {

  componentDidMount() {
    const { editorState } = this.props;
    // 异步设置编辑器内容
    setTimeout(() => {
      const { title, type, description, content = null } = editorState;

      this.props.form.setFieldsValue({
        title,
        type,
        description,
        content: BraftEditor.createEditorState(content),
      });
    });

  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { handleSubmitEditorState } = this.props;

    this.props.form.validateFields((error, values) => {
      if (!error) {
        const { title, type, description, content } = values;
        const submitData = {
          title,
          type,
          description,
          content: content.toRAW() // or values.content.toHTML()
        };
        // 保持数据回传父组件
        handleSubmitEditorState(JSON.stringify(submitData));
      }
    });

  }

  handleSelectTypeChange = value => {
    this.props.form.setFieldsValue({ value });
  };

  render() {

    const { getFieldDecorator } = this.props.form;
    const controls = [ 'bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator', 'media' ];

    return (
      <div className="demo-container">
        <Form onSubmit={ this.handleSubmit }>
          <Form.Item label="文章标题">
            { getFieldDecorator('title', {
              rules: [ {
                required: true,
                message: '请输入标题',
              } ],
            })(
              <Input size="large" placeholder="请输入标题"/>
            ) }
          </Form.Item>
          <Form.Item label="文章类别">
            { getFieldDecorator('type', {
              rules: [ {
                required: true,
                message: '请选择类别',
              } ],
            })(
              <Select
                placeholder="请选择类别"
                onChange={ this.handleSelectTypeChange }>
                <Select.Option value="live">生活</Select.Option>
                <Select.Option value="skill">技术</Select.Option>
              </Select>,
            ) }
          </Form.Item>
          <Form.Item label="文章描述">
            { getFieldDecorator('description', {
              rules: [ {
                message: '请输入描述',
              } ],
            })(
              <Input size="large" placeholder="请输入描述"/>
            ) }
          </Form.Item>
          <Form.Item label="文章正文">
            { getFieldDecorator('content', {
              validateTrigger: 'onBlur',
              rules: [ {
                required: true,
                validator: (_, value, callback) => {
                  if (value.isEmpty()) {
                    callback('请输入正文内容');
                  } else {
                    callback();
                  }
                }
              } ],
            })(
              <BraftEditor
                className="my-editor"
                controls={ controls }
                placeholder="请输入正文内容"
              />
            ) }
          </Form.Item>
          <Form.Item>
            <Button size="large" type="primary" htmlType="submit" block>提交</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(FormDemo);