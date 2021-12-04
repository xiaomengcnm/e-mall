//保存数据到本地
export const  setLocalStorage = (key,value) => localStorage.setItem(key,JSON.stringify(value));

//获取本地存储的数据
export const getLocalStorage = (key) =>{
    return JSON.parse(localStorage.getItem(key));
}
//删除本地存储
export const delLocalStorage = (key) => localStorage.removeItem(key)
