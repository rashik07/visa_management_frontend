import React from "react";
import { Button, Skeleton, Form, Input, message } from "antd";
import auth from "../firebase.init";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

const LoginPanel = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  let errorDisplay;
  if (error) {
    // return (
    // <div>
    errorDisplay = error.message;
    // </div>
    // );
  }
  if (loading) {
    return <Skeleton/>;
  }

  const onFinish = (values) => {
    console.log("Success:", values);
    signInWithEmailAndPassword(values.email, values.password).then(() => {
      message.success("successfully login ");
    });
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
   
      <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            {/* <img
              class="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            /> */}
            Schengen Visa
          </a>
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <Form
                name="login-form"
                onFinish={onFinish}
                initialValues={{ remember: true }}
                className="space-y-4 md:space-y-6"
              >
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your username!",
                    },
                  ]}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  <Input
                    placeholder="Username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your password!",
                    },
                  ]}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  <Input.Password
                    placeholder="Password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    // className="bg-[#2A539A]"
                    type="primary"
                    htmlType="submit"
                    className=" bg-[#2A539A] w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    block
                  >
                    Log In
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPanel;
