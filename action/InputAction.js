import backend from "@/pages/api/backend";



export const AddInputData =async (values)  => {
    console.log("action", values);
    try {
      const response = await backend.post("v1/passport/post", {
        values
      });
      console.log(response);
    //   if (response.status === 200) {
    //     // message.success(response.data.message);
    //   }
  
      return true;
      // router.back();
    } catch (error) {
      //   let response = error.response;
      console.log(error);
      if (error.response.status === 401) {
        console.log("fsdsfsf");
        // message.warning(error.response.data.message, 1);
      }
    }
  };
  