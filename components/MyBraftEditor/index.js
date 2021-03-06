import 'braft-editor/dist/index.css';
import React from 'react';
import BraftEditor from 'braft-editor';
import { Form, Input, Button, Select } from 'antd';
import { postUpload } from '../../api';

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
          content: content.toHTML() // or values.content.toHTML()
        };
        // 保持数据回传父组件
        handleSubmitEditorState(submitData);
      }
    });

  }

  handleSelectTypeChange = value => {
    this.props.form.setFieldsValue({ value });
  };

  // 上传文件方法, 返回文件地址
  myUploadFn = async (param) => {
    const formData = new FormData();
    formData.append('file', param.file);

    try {
      const { data, code } = await postUpload(formData);
      if(code === 0){
        param.success({
          url: data.Image.path,
        });
      }else{
        // 上传发生错误时调用param.error
        param.error({
          msg: data.msg,
        });
      }
    } catch (error) {
      // 上传发生错误时调用param.error
      param.error({
        msg: '上传失败',
      });
      console.warn(error);
    }
  }

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
                <Select.Option value="0">生活</Select.Option>
                <Select.Option value="1">技术</Select.Option>
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
                media={ { uploadFn: this.myUploadFn } }
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