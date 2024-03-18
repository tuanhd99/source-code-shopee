import axios, { AxiosError, AxiosInstance } from "axios";
import { toast } from "react-toastify";
import { HttpStatusCode } from "src/utils/constants";

class fetHandlerAxios {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: "https://api-ecom.duthanhduoc.com/",
      timeout: 5000,
      headers: {
        "Content-Type": "application/json"
      }
    });
    this.instance.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response?.data;
          const message = data.message || error.message;
          toast.error(message);
        }
      }
    );
  }
}

const fetHandler = new fetHandlerAxios().instance;
export default fetHandler;
