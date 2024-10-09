import axios, { AxiosError, AxiosInstance } from "axios";
import { toast } from "react-toastify";
import { HttpStatusCode } from "src/utils/constants";
import {
  getFromLocalStorage,
  localStorageEventarget,
  removeKeyLocalStorage,
  saveToLocalStorage
} from "src/utils/function";

class fetHandlerAxios {
  instance: AxiosInstance;
  private refreshTokenRequest: Promise<string> | null;
  constructor() {
    this.refreshTokenRequest = null;
    this.instance = axios.create({
      baseURL: "https://api-ecom.duthanhduoc.com/",
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
        "expire-access-token": 6, // 10s
        "expire-refresh-token": 60 * 60 // 1 hour
      }
    });
    this.instance.interceptors.request.use(
      (config) => {
        const access_token = getFromLocalStorage("access_token");
        if (access_token) {
          config.headers.Authorization = access_token;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    this.instance.interceptors.response.use(
      function (response) {
        return response;
      },
      (error: AxiosError) => {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response?.data;
          const message = data?.message || error.message;

          if (data.data.name !== "EXPIRED_TOKEN") toast.error(message);
        }
        // Lỗi unauthorized có many case
        // token het han
        // token k đúng
        // không truyen token

        if (error.response?.status === HttpStatusCode.Unauthorized) {
          const config = error.response.config || {};
          const { url } = config;
          if ((error.response?.data as any).data.name === "EXPIRED_TOKEN" && url !== "refresh-access-token") {
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRequestToken().finally(() => {
                  this.refreshTokenRequest = null;
                });
            return this.refreshTokenRequest.then((access_token) => {
              return this.instance({
                ...config,
                headers: {
                  ...config.headers,
                  Authorization: access_token
                }
              });
            });
          }
        }
        removeKeyLocalStorage("access_token");
        removeKeyLocalStorage("refresh_token");
        removeKeyLocalStorage("user");
        const clearLEvent = new Event("clear");
        localStorageEventarget.dispatchEvent(clearLEvent);
        return Promise.reject(error);
      }
    );
  }

  private handleRequestToken = async () => {
    const refreshToken = getFromLocalStorage("refresh_token");

    if (!refreshToken) {
      throw new Error("No refresh token found");
    }
    try {
      const res = await fetHandler.post("refresh-access-token", {
        refresh_token: refreshToken
      });
      const { access_token } = res.data.data;
      saveToLocalStorage("access_token", access_token);
      return access_token;
    } catch (error) {
      removeKeyLocalStorage("access_token");
      removeKeyLocalStorage("refresh_token");
      removeKeyLocalStorage("user");
      const clearLEvent = new Event("clear");
      localStorageEventarget.dispatchEvent(clearLEvent);
      throw error;
    }
  };
}

const fetHandler = new fetHandlerAxios().instance;
export default fetHandler;
