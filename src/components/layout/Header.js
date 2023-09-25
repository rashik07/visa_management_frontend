import React, { useRef, useState } from "react";
import { Breadcrumb, Layout, Menu, message, theme } from "antd";
import auth from "../firebase.init";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const [signOut] = useSignOut(auth);
  const [user, loading, error] = useAuthState(auth);
  const { Header, Content, Footer } = Layout;

  const items = [
    {
      label: <Link href="/">Application Search</Link>,
      key: "home",
      //   icon: <MailOutlined />,
    },
    user
      ? {
          label: <Link href="/dashboard/InfoInput">Add</Link>,
          key: "add",
          //   icon: <MailOutlined />,
        }
      : "",

    user
      ? {
          label: <Link href="/dashboard/List">List</Link>,
          key: "list",
        }
      : "",
    user
      ? {
          label: (
            <button
              onClick={async () => {
                const success = await signOut();
                if (success) {
                  message.success("You are sign out");
                }
              }}
            >
              Sign out
            </button>
          ),
          key: "logout",
        }
      : {
          label: <Link href="/login/Login">Log in</Link>,
          key: "logout",
        },
  ];

  const [current, setCurrent] = useState("");
  // console.log(current);
  // const current=useRef();

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className="demo-logo bg-[#2A539A] ">
        {" "}
        <Image
          src="/logo.png"
          width={250}
          height={250}
          alt="Picture of the author"
          style={{ marginLeft: "80px" }}
        />
      </div>
      <Header
        style={{
          //   display: "flex",
          alignItems: "center",
          paddingLeft: "132px",
        }}
        className="bg-[#9eb6df] drop-shadow-2xl"
      >
        <Menu
          // theme="dark"
          className="bg-[#9eb6df]"
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
      </Header>
    </>

    //   <Footer
    //     style={{
    //       textAlign: "center",
    //     }}
    //   >
    //     Ant Design ©2023 Created by Ant UED
    //   </Footer>
  );
};

export default Header;
