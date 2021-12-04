import { message } from 'antd'
import React, { Component } from 'react'
import { Route, Redirect } from "react-router-dom"

export default class RouterAuth extends Component {
    render() {
        // (1)获取到数据
        const { routes, location } = this.props
        const { pathname } = location
        const token = localStorage.getItem("token")
        //（2） 发送请求验证token是否过期
        // （3）判断你pathname是否和routes路由配置匹配
        const targetRouteConfig = routes.find(item => {
            return item.path.replace(/\s*/g, "") === pathname
        })
        if (targetRouteConfig) {
            const {component} = targetRouteConfig
            if (targetRouteConfig.auth) {
                // token不为空那就代表已经登录过
                if (token) {
                    return <Route path={pathname} component={component}></Route>
                } else {
                    message.error("登录过期，请重新登录");
                    // alert("登录过期，请重新登录");
                    return <Redirect to="/login"></Redirect>
                }
            } else {
                return <Route path={pathname} component={component}></Route>
            }
        } else {
            return (
                <Redirect to="/404"></Redirect>
            )
        }

    }
}
