import React from "react";
import { Button, Checkbox, Form, Input ,message} from "antd";
import auth from "../firebase.init";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';

const LoginPanel = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
let errorDisplay;
  if (error) {
    // return (
      // <div>
      errorDisplay= error.message
      // </div>
    // );
  }
  if (loading) {
    return <p>Loading...</p>;
  }
 

  const onFinish = (values) => {
    console.log("Success:", values);
    signInWithEmailAndPassword(values.email,values.password).then(() => {
      message.success("successfully login ")
    })
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  if (user) {
    return (
      <div>
        {console.log(user)}
        <p>Signed In User: {user.user.email}</p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-xs">
        <h1 className="flex  justify-center mt-2 text-lg font-semibold">Login Page</h1>
          <Form
            name="login-form"
            onFinish={onFinish}
            initialValues={{ remember: true }}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please enter your username!" },
              ]}
            >
              <Input placeholder="Username" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Button
               className="bg-[#2A539A]"
                type="primary"
                htmlType="submit"
                block
              >
                Log In
              </Button>
            </Form.Item>
          </Form>
          <p style={{color:"red"}}>{errorDisplay}</p>
        </div>
      </div>
    </>
  );
};

export default LoginPanel;
