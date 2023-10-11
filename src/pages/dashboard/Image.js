import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import backend from "../api/backend";
import { saveAs } from "file-saver";
import Link from "next/link";
import { Button } from "antd";

import DownloadImage from "@/components/searchPage.js/DownloadImage";
import ComponentToPrint from "./ComponentToPrint ";
import ReactToPrint from "react-to-print";
const Image = () => {
  const router = useRouter();

  const [data, setData] = useState({});
  const { _id } = router.query;
  useEffect(() => {
    backend
      .get(`v1/passport/get?_id=${_id}`) // Replace with your API endpoint
      .then((response) => {
        // Handle the successful response here
        setData(response.data);
        // setDataImage(response.data.imge);
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Error fetching data:", error);
      });
  }, [_id]);
  console.log(data);
  let newWindow;
  const saveFile = () => {
    saveAs(data[0]?.image, "image.png");
  };
  let url = data[0]?.image;

  const componentRef = useRef(null);
  console.log(componentRef);
  return (
    <div>
      {/* <button
        // href={`http://localhost:8080/uploads/${data[0]?.image}`}
        download
        className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3"
        onClick={saveFile}
        // onClick={()=>window.print()}
      >
        DOWNLOAD
      </button> */}
      <ReactToPrint
        trigger={() => (
          <button
            // href={`http://localhost:8080/uploads/${data[0]?.image}`}
            download
            className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3"
            onClick={saveFile}
            // onClick={()=>window.print()}
          >
            DOWNLOAD
          </button>
        )}
        content={() => componentRef.current}
      />
      <div ref={componentRef}>
        {data[0]?.image ? <img src={data[0]?.image} /> : "not found your visa"}
      </div>
    </div>
  );
};

export default Image;
