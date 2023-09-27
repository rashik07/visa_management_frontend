import auth from "@/components/firebase.init";
import Header from "@/components/layout/Header";
import { useRouter } from "next/router";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Upload,
  Breadcrumb,
  theme,
  message,
  Skeleton,
} from "antd";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { AddInputData } from "../../../action/InputAction";
import backend from "../api/backend";

const InfoInput = () => {
  const [reload, setReload] = useState([]);
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "xxx.png",
      status: "done",
      url: "http://www.baidu.com/xxx.png",
    },
  ]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [user, loading, error] = useAuthState(auth);
  // console.log(user);
  const router = useRouter();
  if (loading) {
    return (
      <div>
        <Skeleton />
      </div>
    );
  }
  // useEffect(() => {
  if (user) {
    console.log("user");
  } else {
    console.log("no user");
    router.push("/login/Login");
  }
  // }, [user]);

  const normFile = (e) => {
    // console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const enterLoading = (index) => {
    setReload((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setReload((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };

  const onFinish = async (values) => {
    // console.log("Success:", values);
    enterLoading(0);
    // AddInputData(values);
    let formData = new FormData();
    formData.append("image", values.image[0].originFileObj);
    formData.append("name", values.name);
    formData.append("passport", values.passport);
    try {
      const response = await backend.post("v1/passport/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-rapidapi-host": "visa-management-backend1.onrender.com",
          // "x-rapidapi-key": "your-rapidapi-key-here",
        },
      });

      if (response.status == 200) {
        message.success("Successfully added");
        router.push("/dashboard/List");
      }
      if (response.status == 500) {
        message.error("Please upload png and jpg file and file size under 5mb");
      }
      console.log(response);
    } catch (error) {
      message.error("Please upload png and jpg file and file size under 5mb");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  // const uploadAction = 'https://visa-management-backend1.onrender.com/api/v1/passport/post';
  // const uploadProps = {
  //   name: 'file',
  //   action: uploadAction,

  //   onChange(info) {
  //     if (info.file.status !== 'uploading') {
  //       console.log(info.file, info.fileList);
  //     }
  //     if (info.file.status === 'done') {
  //       console.log(`${info.file.name} file uploaded successfully.`);
  //     } else if (info.file.status === 'error') {
  //       console.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  // };

  return (
    <>
      {/* <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        <Breadcrumb.Item>application_search</Breadcrumb.Item>
        <Breadcrumb.Item>add_visa</Breadcrumb.Item>
      </Breadcrumb> */}
      <div className="site-layout-content bg-[#f2f5f7] rounded-lg shadow-xl">
        <div className="min-h-full flex  justify-center">
          <div className="w-full max-w-md">
            <h1 className="flex  justify-center my-8 text-lg font-semibold">
              Passport Data Entry
            </h1>
            <Form
              className="mt-6 px-2"
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
              initialValues={{
                remember: true,
              }}
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
                name="image"
                label="Upload"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                extra="file upload png/jpg"
                rules={[{ required: true, message: "Please upload picture !" }]}
              >
                <Upload name="image" listType="picture">
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  xs: { span: 24 }, // On extra small screens, take the full width
                  sm: { span: 16, offset: 8 }, // On small screens and above, offset by 8 and span 16
                }}
              >
                <Button
                  className="bg-[#2A539A]"
                  type="primary"
                  htmlType="submit"
                  block
                  loading={reload[0]}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoInput;
