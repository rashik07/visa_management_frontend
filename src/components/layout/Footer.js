import React from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
const Footer = () => {
  const { Header, Content, Footer } = Layout;
  return (
    <div>
      <Footer
        style={{
          textAlign: "center",
        }}
      className="bg-[#2A539A] shadow-2xl text-white"
      >
        COPYRIGHT © 2023 SCHENGEN VISA
      </Footer>
    </div>
  );
};

export default Footer;
