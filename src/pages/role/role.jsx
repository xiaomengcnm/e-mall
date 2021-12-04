import React, { Component } from 'react';
import { Card, Table, Button, message, Modal } from "antd";
import {getRoles,delRole} from "../../apis/role";
import Authrization from "../../components/Authrization";
import AddRole from './addRole';

export default class role extends Component {
    state = {
        data: [],
        loading: false,
        isModalVisible: false,
        isModalVisible2: false,
        showModal:false,
        roleMenus:[],
        roleId:[],
        delId: ""
    }
    componentDidMount() {
        this.fetchData()
    }
    fetchData = async () => {
        const res = await getRoles();
        this.setState({
            data: res.data.data
        })
    }
    confirmDel = async (values) => {
        this.setState({
            isModalVisible: true,
            delId:values._id
        })
    }
    handleCancel = ()=>{
        this.setState({
            isModalVisible: false
        })
        message.warning("取消删除");
    }
    handleOk = async()=>{
        const res = await delRole({ id:this.state.delId })
        if(res.data.code){
            message.success("删除成功");
            const res = await getRoles()
            this.setState({
                isModalVisible: false,
                data: res.data.data
            })
        }else{
            message.error("删除失败");
        }
    }
    toRoles =(tags) =>{
        console.log(tags);
        this.setState({
            roleId:tags._id,
            roleMenus:tags.menus,
            showModal:true
        })
    }
    closeModel2 = ()=>{
        this.setState({
            showModal:false
        })
    }
    closeModel3 = ()=>{
        this.setState({
            isModalVisible2:false
        })
    }
    render() {
        const columns = [
            {
                title: '权限',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '创建时间',
                dataIndex: 'createDate',
                key: 'createDate',
            },
            {
                title: '授权时间',
                dataIndex: 'authTime',
                key: 'authTime',
            },
            {
                title: '授权人',
                dataIndex: 'authUser',
                key: 'authUser',
            },
            {
                title: '操作',
                render: tags => (
                    <>
                        <Button type="dashed" onClick={() => this.confirmDel(tags)}>删除</Button>&nbsp;&nbsp;
                        <Button type="dashed" onClick={()=>this.toRoles(tags)}>授权</Button>
                    </>
                ),
            }
        ];
        return (
            <>
                <Card title={"角色列表"} extra={<Button onClick={()=>this.setState({isModalVisible2:true})}>添加角色</Button>} style={{ width: "100%" }}>
                    <Table pagination={
                        {
                            defaultCurrent: 1,
                            defaultPageSize: 5,
                            pageSizeOptions: [5, 10],
                            showSizeChanger: true
                        }}
                        rowKey="_id"
                        loading={this.state.loading}
                        bordered={true}
                        columns={columns}
                        dataSource={this.state.data} />
                </Card>
                <Modal title="删除角色" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <p>此操作将会永久删除该角色，请确认是否删除</p>
                </Modal>
                {this.state.showModal?<Authrization roleId={this.state.roleId} fetchData={this.fetchData} closeModel2={this.closeModel2} roleMenus={this.state.roleMenus}></Authrization>:null}
                {this.state.isModalVisible2?<AddRole closeModel3={this.closeModel3} fetchData={this.fetchData}></AddRole>:null}
            </>
        )
    }
}
