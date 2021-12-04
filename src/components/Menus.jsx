import React, { Component } from 'react';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Switch, Route, Redirect, Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Popconfirm, message } from 'antd';
import menuConfig from '../config/menuConfig';
import {getLocalStorage} from "../utils/localStorage"

const { SubMenu } = Menu;

export default class menus extends Component {
    initMenu = (menuConfig) => {
        const { role } = getLocalStorage("userInfo")
        const menusComp = menuConfig.map((item, index) => {
            if (role.menus.indexOf(item.key) != -1) {
                if (!item.children) {
                    return (
                        <Menu.Item key={item.key} icon={item.icon}>
                            <Link to={item.key}>{item.title}</Link>
                        </Menu.Item>
                    )
                } else {
                    return (
                        <SubMenu key={item.key} icon={item.icon} title={item.title}>
                            {this.initMenu(item.children)}
                        </SubMenu>
                    )
                }
            }

        })
        return menusComp
    }
    //刷新页面后保持打开上次选中的导航的父级导航
    openKey = () => {
        let pathname = this.props.pathname
        if (pathname.includes("datav")) {
            return "/home/datav"
        } else if (pathname.includes("product")) {
            return "/home/product"
        } else {
            return pathname
        }
    }
    render() {
        return (
            <>
                <Menu
                    mode="inline"
                    // 刷新页面后保持选中上次选中的导航
                    defaultSelectedKeys={[this.props.pathname]}
                    defaultOpenKeys={[this.openKey()]}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    {this.initMenu(menuConfig)}
                    {/* <Menu.Item key="/home/main" icon={<UserOutlined></UserOutlined>}>
                        <Link to="/home/main">首页</Link>
                    </Menu.Item>
                    <Menu.Item key="/home/user" icon={<UserOutlined></UserOutlined>}>
                        <Link to="/home/user">用户管理</Link>
                    </Menu.Item>
                    <Menu.Item key="/home/role" icon={<UserOutlined />}>
                        <Link to="/home/role">角色管理</Link>
                    </Menu.Item>
                    <Menu.Item key="/home/shop" icon={<UserOutlined />}>
                        <Link to="/home/shop">店铺管理</Link>
                    </Menu.Item>
                    <SubMenu key="/home/products/" icon={<NotificationOutlined />} title="商品管理">
                        <Menu.Item key="/home/products/category"><Link to="/home/products/category">商品分类</Link></Menu.Item>
                        <Menu.Item key="/home/products/list"><Link to="/home/products/list">商品列表</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="/home/datav" icon={<LaptopOutlined />} title="财务管理">
                        <Menu.Item key="/home/datav/deal"><Link to="/home/datav/deal">交易流水</Link></Menu.Item>
                        <Menu.Item key="/home/datav/sale"><Link to="/home/datav/sale">销售业绩</Link></Menu.Item>
                    </SubMenu> */}
                </Menu>
            </>
        )
    }
}
