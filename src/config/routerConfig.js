import Login from "../pages/login/login"
import Home from "../pages/home"
import Register from "../pages/register/register"
import NotFind from "../components/NotFind"
let routes = [
    {path:"/login",name:"Login",component:Login},
    {path:"/register",name:"Register",component:Register},
    {path:"/home",name:"Home",component:Home,auth:true},
    {path:"/home/main",name:"Home",component:Home,auth:true},
    {path:"/home/user",name:"Home",component:Home,auth:true},
    {path:"/home/role",name:"Home",component:Home,auth:true},
    {path:"/home/shop",name:"Home",component:Home,auth:true},
    {path:"/home/product/list",name:"Home",component:Home,auth:true},
    {path:"/home/product/category",name:"Home",component:Home,auth:true},
    {path:"/home/datav/deal",name:"Home",component:Home,auth:true},
    {path:"/home/datav/sale",name:"Home",component:Home,auth:true},
    {path:"/404",name:"NotFind",component:NotFind},
]

export default routes

