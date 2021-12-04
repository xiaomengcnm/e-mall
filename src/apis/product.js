import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8002"
//查询所有商品
export const findAllProduct = () => axios.get("/goods/findGoods")
//获取联级数据
export const findCascadeData = () => axios.get("/categroy/findAllCategroy")
//搜索商品
export const searchProducts =(data) => axios.post("/goods/findGoodsByName",data)
//上传图片
export const uploadImg =(data) => axios.post("/goods/fileUpload",data)
//添加商品
export const addGoods =(data) => axios.post("/goods/addGoods",data)
//删除商品
export const delGoods =(data) => axios.post("/goods/deleteGoods",data)
