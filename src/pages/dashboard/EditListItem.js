import React, { useState } from "react";
import { Button, Input, Space, message, Upload, Form, Drawer } from "antd";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import backend from "../api/backend";

const EditListItem = ({record, setReload}) => {
    console.log(record)
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const normFile = (e) => {
    // console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const onFinish = async (values) => {
    // console.log("Success:", values);
    // enterLoading(0);
    // AddInputData(values);
    setReload(true);
    let formData = new FormData();
    formData.append("filename", values.filename[0].originFileObj);
    formData.append("name", values.name);
    formData.append("passport", values.passport);
    try{
      const response = await backend.put(`v1/passport/update/${record._id}`, formData);

      if (response.status == 200) {
        message.success("Successfully edit");
        setOpen(false);
        setReload(false);
      }
      if (response.status == 500) {
        message.error("Please upload png and jpg file and file size under 5mb");
      }
      console.log(response);
    }
    catch(error){
      message.error("Please upload png and jpg file and file size under 5mb");
    }

  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <Button className="text-blue-500" type="primary" onClick={showDrawer}>
        Edit
      </Button>
      <Drawer
        title="Edit"
        placement="right"
        width={500}
        onClose={onClose}
        open={open}
      >
        
        <Form
              className="mt-6"
              name="login-form"
              onFinish={onFinish}
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                maxWidth: 600,
              }}
         
              initialValues={record}
            >
              <Form.Item
                label="Passport Number"
                name="passport"
                rules={[
                  {
                    required: true,
                    message: "Please enter your password number!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter your name!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="filename"
                label="Upload"
                // valuePropName="fileList"
                getValueFromEvent={normFile}
                extra="file upload png/jpg"
                // rules={[{ required: true, message: "Please upload picture !" }]}
              >
                <Upload name="filename" listType="picture">
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button
                  className="bg-[#2A539A]"
                  type="primary"
                  htmlType="submit"
                  block
                //   loading={reload[0]}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
      </Drawer>
    </div>
  );
};

export default EditListItem;
