import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Space,
  Table,
  Image,
  Form,
  theme,
  Breadcrumb,
  message,
} from "antd";
import { useRouter } from "next/router";
import backend from "@/pages/api/backend";
const Search = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const router = useRouter();

  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isCaptchaSolved, setIsCaptchaSolved] = useState(false);

  const generateEquation = () => {
    const newNum1 = Math.floor(Math.random() * 10) + 1;
    const newNum2 = Math.floor(Math.random() * 10) + 1;
    const newAnswer = newNum1 + newNum2;

    setNum1(newNum1);
    setNum2(newNum2);
    setAnswer(newAnswer);
    setUserAnswer("");
    setIsCaptchaSolved(false);
  };
  useEffect(() => {
    generateEquation();
  }, []);

  const handleInputChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    // AddInputData(values);
    if (parseInt(userAnswer) === answer) {
      // Captcha solved
      setIsCaptchaSolved(true);
      backend
        .get(`v1/passport/get?_id=${values.id}`) // Replace with your API endpoint
        .then((response) => {
          // Handle the successful response here
          // setData(response.data);
          // setDataImage(response.data.imge);
          router.push({
            pathname: "/dashboard/Image",
            query: { _id: values.id },
          });
        })
        .catch((error) => {
          // Handle any errors here
          console.error("Error fetching data:", error);
          message.error("no found visa");
        });
    } else {
      // Captcha failed
      message.error("Captcha Failed. Please try again.");
      generateEquation();
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  let number = `${num1} + ${num2}`;
  return (
    <div>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        {/* <Breadcrumb.Item>add</Breadcrumb.Item> */}
      </Breadcrumb>
  
      <div
        className="w-full p-6 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800"
        style={{
          background: colorBgContainer,
        }}
      >
        {" "}
        <div className="min-h-full flex  justify-center">
          <div className="w-full max-w-md">
            <h1 className="flex  justify-center my-8 text-lg font-semibold">
              Visa Application And Search
            </h1>
            <a href="https://www.schengenvisainfo.com/wp-content/uploads/2020/02/Schengen-Visa-Application-Form.pdf" download="MyExampleDoc" target="_blank">
          
              <span className="flex  justify-center text-blue-600">click here to download the application form</span> 
            </a>
            {/* <span className="flex  justify-center">fdsdfsdf</span> */}
            <Form
              className="my-10"
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
                label="Reference Id"
                name="id"
                rules={[
                  {
                    required: true,
                    message: "Please enter your Reference Id!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={number}
                // name="id"
                rules={[
                  {
                    required: true,
                    message: "Please enter your Reference Id!",
                  },
                ]}
              >
                {/* {num1} + {num2} = */}
                <Input
                  type="number"
                  value={userAnswer}
                  onChange={handleInputChange}
                  disabled={isCaptchaSolved}
                />
              </Form.Item>
              {/* <Form.Item>{num1} + {num2} =</Form.Item>  */}
              <Form.Item
                wrapperCol={{
                  xs: { span: 24 },   // On extra small screens, take the full width
                  sm: { span: 16, offset: 8 },  // On small screens and above, offset by 8 and span 16
                }}
   
              >
                <Button
                  className="bg-[#2A539A]"
                  type="primary"
                  htmlType="submit"
                  block
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
