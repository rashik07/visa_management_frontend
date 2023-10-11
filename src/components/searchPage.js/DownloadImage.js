import React from "react";

const DownloadImage = ({ data }) => {
  return (
    <div>
      {data[0]?.image ? <img src={data[0]?.image} /> : "not found your visa"}
      {/* erer */}
    </div>
  );
};

export default DownloadImage;
