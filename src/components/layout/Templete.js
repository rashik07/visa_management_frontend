import React from "react";

import Footer from "./Footer";
import Header from "./Header";

import { Breadcrumb, Layout, Menu, theme } from "antd";
// const { Content } = Layout;

const Template = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { Content } = Layout;
  return (
    <div >
      <Header />
      {/* <RsMenu/> */}

      {/* <MenuForAll /> */}
      <Content
        style={{
          padding: "50px 150px",
            height: "80vh",
        }}
      >
        {children}
      </Content>

      <Footer />
    </div>
  );
};

export default Template;
