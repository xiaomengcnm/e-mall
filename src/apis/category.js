import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8002"
// axios调用封装api方法可以接受到Promise结果
export const findAllCateGory = (params) => axios.get("/categroy/findCategroy",{params:params})
// 添加分类信息
export const addCategoryApi = (data)=> axios.post("/categroy/addCategroy",data)
//删除分类
export const deleteCateGroy = (data)=> axios.post("/categroy/deleteCateGroy",data)