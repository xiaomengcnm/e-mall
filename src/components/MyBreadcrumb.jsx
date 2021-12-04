import React, { Component } from 'react'
import { Breadcrumb } from "antd"
import { withRouter } from "react-router-dom"

let routerConfig = {
    '/home': '首页',
    '/home/user': '用户管理',
    '/home/role': '角色管理',
    '/home/shop': '店铺管理',
    '/home/product': '商品管理',
    '/home/product/category': '商品分类',
    '/home/product/list': '商品列表',
    '/home/datav': '财务数据',
    '/home/datav/deal': '交易流水',
    '/home/datav/sale': '销售业绩',
}
let UNLISTEN
class MyBreadcrumb extends Component {
    state = {
        BreadcrumbArray:[]
    }
    componentDidMount() {
        // 主动调用一次，初始化面包屑
        this.getPath()
        // 给路由绑定监听器，一旦路由发生变化，调用一次getPath
        UNLISTEN = this.props.history.listen(()=>{
            this.getPath()
        })
        // this.history.addEventListner("click",function(){})
        // this.history.removeEventlI
    }
    // 组件销毁的时候，解除对路由监听
    componentWillUnmount(){
        // 短路运算符，前面true后面的代码执行
        UNLISTEN&&UNLISTEN()
    }
    getPath = () => {
        // 获取到路由地址,并且拆分路由地址
        const res = this.props.history.location.pathname.split("/").filter(item => item)
        // 将拆分过后的地址和routerConfig进行匹配
        const BreadcrumbArray = res.map((_, index) => {
            // 遍历的时候，拼接一个URL地址
            let url = `/${res.slice(0, index + 1).join("/")}`
            console.log(url);
            return (
                <Breadcrumb.Item key={url}>{routerConfig[url]}</Breadcrumb.Item>
            )
        })
        this.setState({
            BreadcrumbArray
        })
    }
    render() {
        return (
            <Breadcrumb style={{ margin: '16px 0' }}>
                {/* <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item> */}
                {this.state.BreadcrumbArray}
            </Breadcrumb>
        )
    }
}

export default withRouter(MyBreadcrumb)