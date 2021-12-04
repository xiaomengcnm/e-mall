import React, { Component } from 'react';
import { Card, Table, Button, message, Modal, Form, Input, Select } from "antd";
import { getAllUsers } from "../../apis/users";
import { delUser,addUser } from "../../apis/users";
import { getRoles } from "../../apis/role";

const { Option } = Select
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};
const tailLayout = {
    wrapperCol: { offset: 4, span: 20 },
};

export default class user extends Component {
    state = {
        data: [],
        loading: false,
        isModalVisible: false,
        isModalVisible2: false,
        roles: [],
        delId: ""
    }
    componentDidMount() {
        this.fetchData();
    }
    fetchData = async () => {
        const res = await getAllUsers();
        if (res.data.code) {
            this.setState({
                data: res.data.data
            })
        }
    }
    showAdduser = async()=>{
        //获取所有角色
        const res = await getRoles();
        if(res.data.code){
            console.log(res);
            this.setState({
                roles:res.data.data
            })
        }
        this.setState({
            isModalVisible:true
        })
    }
    handleOk = () => {
        this.setState({
            isModalVisible: false
        })
    }
    handleCancel = () => {
        this.setState({
            isModalVisible: false
        })
    }
    //添加用户
    onFinish = async(tags) => {
        console.log(tags);
        const res = await addUser(tags);
        console.log(res);
        if(res.data.code){
            this.fetchData();
            message.success("添加成功");
            this.setState({
                isModalVisible:false
            })
        }else{
            message.error("添加失败");
        }
    }
    confirmDel = (tags) => {
        console.log(tags);
        this.setState({
            delId: tags._id,
            isModalVisible2: true
        })
    }
    handleOk2 = async () => {
        const res = await delUser({ id: this.state.delId });
        console.log(res);
        if (res.data.code) {
            message.success("删除成功");
            this.setState({
                isModalVisible2: false
            })
        } else {
            message.error("删除失败");
        }
    }
    handleCancel2 = () => {
        message.warning("取消删除");
        this.setState({
            isModalVisible2: false
        })
    }
    render() {
        const columns = [
            {
                title: '用户名',
                dataIndex: 'account',
                key: 'account',
            },
            {
                title: '邮箱',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: '用户角色',
                dataIndex: 'role',
                key: 'role',
                render: tags => {
                    if (tags) {
                        return tags.name
                    } else {
                        return "暂无数据"
                    }
                }
            },
            {
                title: '操作',
                render: tags => (
                    <>
                        <Button type="dashed" onClick={() => this.confirmDel(tags)}>删除</Button>&nbsp;&nbsp;
                    </>
                ),
            }
        ];
        return (
            <>
                <Card title={"用户列表"} extra={<Button onClick={this.showAdduser}>添加用户</Button>} style={{ width: "100%" }}>
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
                <Modal title="添加用户" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <Form {...layout} name="control-hooks" onFinish={this.onFinish}>
                        <Form.Item name="account" label="用户名称" rules={[{ required: true, message: "必须输入用户名称" }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="password" label="用户密码" rules={[{ required: true, message: "必须输入用户密码" }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="email" label="邮箱" rules={[{ required: true, message: "必须输入邮箱" }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="role" label="角色" rules={[{ required: true, message: "必须要选中角色" }]}>
                            <Select
                                placeholder="请选择角色"
                                allowClear
                            >
                                {this.state.roles.map((item)=><Option key={item._id} value={item._id}>{item.name}</Option>)}
                            </Select>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                确认添加
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal title="删除用户" visible={this.state.isModalVisible2} onOk={this.handleOk2} onCancel={this.handleCancel2}>
                    <p>此操作将会永久删除该用户，请确认是否删除</p>
                </Modal>
            </>
        )
    }
}
