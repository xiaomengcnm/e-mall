import { message } from "antd";
import axios from "axios";
import { getLocalStorage } from "../utils/localStorage";

axios.interceptors.request.use((req) => {
    const token = getLocalStorage("token");
    if (token) {
        req.headers.token = token
    }
    return req
}, (err) => { return Promise.reject(err) })

axios.interceptors.response.use((res) => {
    return res
}, (err) => {
    const response = err.response
    if(response){
        switch (response.status) {
            case 500:
                console.log("网络异常");
                break;
            case 401:
                // message.error("身份认证过期，请重新登录")
                alert("登录过期，请重新登录");
                localStorage.removeItem("userInfo")
                localStorage.removeItem("token")
                // 跳转回登录
                window.location.href = "/login"
                break;
            case 404:
                console.log("找不到服务器");
                break;
        }
    }
    return Promise.reject(err);
})
