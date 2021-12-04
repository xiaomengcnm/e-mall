import React, { Component } from 'react'
import { Modal, Button, Tree, message } from 'antd';
import {getLocalStorage} from "../utils/localStorage"
import {updateAuth} from "../apis/role"
import {withRouter} from "react-router-dom"

const treeData = [
    {
        title: '首页',
        key: '/home',
    },
    {
        title: '用户',
        key: '/home/user',
    },
    {
        title: '角色',
        key: '/home/role',
    },
    {
        title: '店铺',
        key: '/home/shop',
    },
    {
        title: '商品管理',
        key: '/home/product',
        children: [
            {
                title: '商品列表',
                key: '/home/product/list',
            },
            {
                title: '商品分类',
                key: '/home/product/category',
            }
        ],
    },
    {
        title: '数据统计',
        key: '/home/datav',
        children: [
            {
                title: '流水信息',
                key: '/home/datav/flowers',
            },
            {
                title: '销售统计',
                key: '/home/datav/sale',
            }
        ],
    },
];
class Authrization extends Component {
    state = {
        isModalVisible: true,
        menus:[]
    }
    handleOk =async () => {
        // 构造数据，将数据提交给服务器
        const object = {
            id:this.props.roleId,
            authUser:getLocalStorage("userInfo").account,
            authTime:new Date(),
            menus:this.state.menus
        }
        const res = await updateAuth(object)
        if(res.data.code){
            message.success("授权成功")
            this.props.closeModel2()
            this.props.fetchData()
            // this.props.history.push("/home/role")
        }else{
            message.error("授权失败")
        }

    }
    handleCancel = () => {
        // 关闭当前模态框
        this.props.closeModel2()
    }
    onCheck = (values) => {
        console.log("onchecked", values);
        this.setState({
            menus:values
        })
    }
    onSelect = (values) => {
        console.log("onSelect", values);
    }
    render() {
        return (
            <Modal title="资源列表" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
                <Tree
                    checkable
                    onCheck={this.onCheck}
                    onSelect={this.onSelect}
                    treeData={treeData}
                    defaultCheckedKeys={this.props.roleMenus}
                    defaultExpandAll={true}
                />
            </Modal>
        )
    }
}

export default withRouter(Authrization)