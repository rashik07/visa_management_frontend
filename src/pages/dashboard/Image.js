import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import backend from '../api/backend';

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
  console.log(data)
    return (
        <div>
      
          { data[0]?.image? <img src={`http://localhost:8080/uploads/${data[0]?.image}`} />: "not found your visa"}
        </div>
    );
};

export default Image;