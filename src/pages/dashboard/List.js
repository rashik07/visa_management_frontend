import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table, Image, Breadcrumb, Drawer , Skeleton} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import backend from "../api/backend";
import auth from "@/components/firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import EditListItem from "./EditListItem";

const List = () => {
  const [data, setData] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [reload, setReload] = useState(false);
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(data);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  // console.log(data);
  // const [dataImage, setDataImage] = useState(null);
  useEffect(() => {
    backend
      .get("v1/passport/get/all") // Replace with your API endpoint
      .then((response) => {
        // Handle the successful response here
        setData(response.data.reverse());

        // setDataImage(response.data.imge);
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Error fetching data:", error);
      });
  }, [reload]);
  console.log(reload);

  const deleteItem = async (id) => {
    console.log(id);
    setReload(true);
    await backend
      .delete(`v1/passport/delete/${id}`)
      .then((response) => {
        console.log(`Deleted post with ID ${id}`);
        setReload(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
      width: "30%",
      ...getColumnSearchProps("_id"),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Passport Number",
      dataIndex: "passport",
      key: "passport",
      width: "20%",
      ...getColumnSearchProps("passport"),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (res) => <Image src={res} />,
      // ...getColumnSearchProps('image'),
      // sorter: (a, b) => a.address.length - b.address.length,
      // sortDirections: ['descend', 'ascend'],
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        // console.log(record._id),
        <Space size="middle">
          <EditListItem record={record} setReload={setReload}/>

          {/* <button
              onClick={() => {
                editItem(record._id);
                showDrawer();
              }}
            >
              Edit
            </button> */}
          <button onClick={() => deleteItem(record._id)}>Delete</button>
        </Space>
      ),
    },
  ];
  const [user, loading, error] = useAuthState(auth);
  console.log(user);
  const router = useRouter();
  if (loading) {
    return (
      <div>
       <Skeleton />
      </div>
    );
  }
  if (user) {
    console.log("user");
  } else {
    console.log("no user");
    router.push("/login/Login");
  }

  if (reload) {
    return   <Skeleton />;
  }
  return (
    <div>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>list</Breadcrumb.Item>
      </Breadcrumb>
      <Table  className="bg-[#f2f5f7] rounded-lg shadow-xl" columns={columns} dataSource={data} />
    </div>
  );
};

export default List;
