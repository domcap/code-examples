# Code Examples
In this repository we demonstrate some edge use cases for the libraries, third-party tools, and languages used for building Dominion Capital and its subsidiaries' applications.  We'll also include coding standards and best practices.

# Ant Design

## Forms

1. Place labels on the right side of the field [Example](https://codepen.io/vzelenko/pen/VVKypy)
    ```javascript
    import { Form } from 'antd'
    
    const MyForm = (props, context) => (
      <Form>
        <Form.Item label="Field Name" colon={false} 
                   labelCol={{ span: 4, offset: 1, push: 10 }} 
                   wrapperCol={{ span: 10, pull: 5 }}>
          {props.form.getFieldDecorator('fieldName', {
             rules: [{ required: true, message: 'Field Name is required!' }],
          })(<Input />)}
        </Form.Item>
      </Form>
    );
    
    export default Form.create()(MyForm);
    ```
    ```css
    .ant-form-item-label {
      text-align: left;
    }
    ```
1. Empty label with Required marker [Example](https://codepen.io/vzelenko/pen/VVKypy)
    ```javascript
    import { Form } from 'antd'
    
    const MyForm = (props, context) => (
      <Form>
        <Form.Item label="&nbsp;"
                   colon={false}
                   labelCol={{ span: 1 }}
                   wrapperCol={{ span: 23 }}>
          {this.props.form.getFieldDecorator('fieldName', {
             rules: [{ required: true, message: 'Field Name is required!' }],
          })(<Input />)}
        </Form.Item>
      </Form>
    );
    
    export default Form.create()(MyForm);
    ```
