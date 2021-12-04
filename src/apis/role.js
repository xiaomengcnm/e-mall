import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8002";
//获取所有角色
export const getRoles = ()=> axios.get("/roles/findRoles")
//修改权限
export const updateAuth = (data)=> axios.post("/roles/addAuth",data)
//添加角色
export const addRoles = (data)=> axios.post("/roles/addRoles",data)
//删除角色
export const delRole = (data)=> axios.post("/roles/deleteRoles",data)