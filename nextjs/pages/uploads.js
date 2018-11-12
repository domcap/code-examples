import "isomorphic-fetch";
import { Layout, Form, Input, Upload, Icon, Button, message } from "antd";

class Uploads extends React.Component {
  constructor(props) {
    super(props);
    this.fileFieldRef = React.createRef();
    this.state = {
      fileList: []
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        const formData = new FormData();
        // Add the text field:
        formData.append("textField", values.textField);
        // Add the standard File Input:
        formData.append("files[]", this.fileFieldRef.files[0]);
        // Add the ANTD Upload:
        this.state.fileList.forEach(file => {
          formData.append("files[]", file);
        });

        this.setState({
          uploading: true
        });
        const resp = await fetch("http://localhost:8080/data", {
          method: "POST",
          body: formData
        });
        message.info(resp);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const uploadProps = {
      action: "//expample.com",
      onRemove: file => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList
          };
        });
      },
      beforeUpload: file => {
        this.setState(({ fileList }) => ({
          fileList: [...fileList, file]
        }));
        return false;
      },
      fileList: this.state.fileList
    };
    return (
      <Layout style={{ backgroundColor: "beige", height: "100%", paddingTop: 100, paddingBottom: 100 }}>
        <div style={{ marginLeft: 100, marginRight: 100, backgroundColor: "white", padding: 20 }}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator("textField", {
                rules: [{ required: true, message: "Text Field is required!" }]
              })(<Input placeholder="Text Field" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("fileField", {
                rules: [{ required: true, message: "File Field is required" }]
              })(
                <Input
                  type="file"
                  placeholder="File Field"
                  ref={ref => {
                    this.fileFieldRef = ref.input;
                  }}
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("uploadField", {
                rules: [{ required: true, message: "Upload Field is required" }]
              })(
                <Upload {...uploadProps}>
                  <Button>
                    <Icon type="upload" /> Select File
                  </Button>
                </Upload>
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Layout>
    );
  }

  componentDidMount() {}
}

export default Form.create()(Uploads);
