import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8002";
//用户登录
export const login = (data) => axios.post("/users/login", data)
//获取所有用户
export const getAllUsers = (data) => axios.post("/users/getAccountList",data)
//添加用户
export const addUser = (data) => axios.post("/users/accountadd",data)
//删除用户
export const delUser = (data) => axios.get("/users/delAccount",{data})