// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";

let baseUrl;
if (typeof window == "undefined") {
  baseUrl = "http://localhost:8080/api/";
  // console.log(baseUrl);
} else if (window.location.origin === "http://localhost:3000") {
  baseUrl = "http://localhost:8080/api/";

  // console.log(baseUrl);
} else {
  // baseUrl = window.location.origin + "/api/";
  // baseUrl = "https://nodeapi.anzarabd.com/api/";

}

export default axios.create({
  baseURL: baseUrl,
});

