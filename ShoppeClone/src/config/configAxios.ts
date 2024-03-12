import axios, { AxiosInstance } from "axios";

class fetHandlerAxios {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: "https://api-ecom.duthanhduoc.com/",
      timeout: 3000,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}

const fetHandler = new fetHandlerAxios().instance;
export default fetHandler;
