import axios from "axios";

export const http = axios.create({
    baseURL: "http://143.107.183.74:11450/",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
});

