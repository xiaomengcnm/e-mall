import React, { Component } from 'react';
import { Switch, Route, Redirect, Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Popconfirm, message } from 'antd';
import logo from '../../assets/images/logo-250px.png';
import '../../assets/css/index.less';
import { getLocalStorage, delLocalStorage } from "../../utils/localStorage"
import Menus from '../../components/Menus';
import MyBreadcrumb from '../../components/MyBreadcrumb';

import Category from '../products/category';
import List from "../products/list";
import Main from '../main/main';
import User from "../user/user";
import Shop from "../shop/shop";
import Role from "../role/role";
import SaleData from "../datav/saleData";
import DealData from "../datav/dealData";

const { Header, Content, Sider } = Layout;

export default class index extends Component {
    confirm = () => {
        delLocalStorage("token");
        delLocalStorage("userInfo");
        message.success("注销成功");
        this.props.history.push("/login");
    }
    cancel = () => {
        message.warning("继续操作");
        console.log(this.props.history);
    }
    render() {
        return (
            <Layout style={{ height: "100vh" }}>
                <Header className="header" style={{ display: "flex", justifyContent: "space-between" }}>
                    <div className="logo">
                        <img style={{ width: "200px" }} src={require = logo} alt="" />
                    </div>
                    <div style={{ color: "#fff" }}><span>欢迎:【{getLocalStorage("userInfo").account}】</span>
                        <Popconfirm
                            title="是否退出登录？"
                            onConfirm={this.confirm}
                            onCancel={this.cancel}
                            okText="是"
                            cancelText="否"
                        >
                            <span style={{ cursor: "pointer" }} href="#">注销</span>
                        </Popconfirm>
                    </div>
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menus pathname={this.props.history.location.pathname}></Menus>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        {/* <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb> */}
                        <MyBreadcrumb></MyBreadcrumb>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            <Switch>
                                <Redirect exact from="/home" to="/home/main"></Redirect>
                                <Route path="/home/main" component={Main} />
                                <Route path="/home/user" component={User} />
                                <Route path="/home/shop" component={Shop} />
                                <Route path="/home/role" component={Role} />
                                <Route path="/home/product/category" component={Category} />
                                <Route path="/home/product/list" component={List} />
                                <Route path="/home/datav/sale" component={SaleData} />
                                <Route path="/home/datav/deal" component={DealData} />
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}
