import React, { Component, useState } from 'react'
import { Button, Card, Table, Form, Input, Select, Modal, message } from "antd"
import { findAllCateGory, addCategoryApi,deleteCateGroy } from "../../apis/category.js";
const { Option } = Select;
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};
const tailLayout = {
    wrapperCol: { offset: 4, span: 20 },
};

export default class category extends Component {
    state = {
        data: [],
        parentId: 0,
        list:[],
        loading: false,
        isModalVisible: false,
        isModalVisible2: false,
        delId:""
    }
    componentDidMount() {
        this.getAllCategory();
    }
    //获取所有分类
    getAllCategory = async () => {
        this.setState({
            loading: true
        })
        const res = await findAllCateGory({ parentId: this.state.parentId });
        if (res.status == 200) {
            this.setState({
                data: res.data.data.data,
                loading: false
            })
        }
    }
    //查看二级分类
    lookup = (value) => {
        this.setState({
            parentId: value._id
        }, async () => {
            const res = await findAllCateGory({ parentId: this.state.parentId });
            if (res.status == 200) {
                this.setState({
                    data: res.data.data.data
                })
            }
        })
    }
    //返回一级分类
    back = () => {
        this.setState({
            parentId: 0
        }, async () => {
            const res = await findAllCateGory({ parentId: this.state.parentId });
            if (res.status == 200) {
                this.setState({
                    data: res.data.data.data
                })
            }
        })
    }
    showAdd = () => {
        this.setState({
            isModalVisible: true
        })
    }
    //添加分类
    onFinish = async (values) => {
        console.log(values);
        if(!values.parentId){
            values.parentId = 0;
        }
        const res = await addCategoryApi(values);
        if (res.data.code == 1) {
            this.setState({
                isModalVisible: false
            })
            message.success("添加成功");
            this.getAllCategory();
        } else {
            message.error("添加失败");
        }
    }
    typeChange = async(values)=>{
        if (values == "二级分类") {
            const res = await findAllCateGory({ parentId: 0 })
            this.setState({
                list: res.data.data.data
            })
        } else {
            this.setState({
                list: []
            })
        }
    }
    handleCancel = () => {
        this.setState({
            isModalVisible: false
        })
    }
    handleOk = () => {
        this.setState({
            isModalVisible: false
        })
    }
    handleCancel2 = () => {
        this.setState({
            isModalVisible2: false
        },()=>{
            message.warning("已取消删除");
        })
    }
    handleOk2 = () => {
        this.delCateGroy(); 
    }
    //删除分类
    delCateGroy = async()=>{
        const res =  await deleteCateGroy({id:this.state.delId});
        if(res.data.code){
            message.success("删除成功");
            this.setState({
                isModalVisible2: false
            })
            this.getAllCategory();
        }else{
            message.error("删除失败");
        }
    }
    confirmDel = (values)=>{
        this.setState({
            delId:values._id,
            isModalVisible2: true
        })
    }
    render() {
        const columns = [
            {
                title: '类型名字',
                dataIndex: 'name',
                key: 'name',
                render: text => <a>{text}</a>,
            },
            {
                title: '类别',
                dataIndex: 'type',
                key: 'type',
            },
            {
                title: '操作',
                render: tags => (
                    <>
                        {this.state.parentId == 0 ? <Button type="primary" onClick={() => this.lookup(tags)}>查看子分类</Button> : null}
                        &nbsp;&nbsp;&nbsp;
                        <Button type="dashed" onClick={()=>{this.confirmDel(tags)}}>删除</Button>
                    </>
                ),
            }
        ];
        return (
            <>
                <Card title={this.state.parentId == 0 ? "商品分类" : <Button type="link" onClick={this.back}>返回</Button>} extra={<Button type="defualt" onClick={() => { this.showAdd() }}> 添加</Button>} style={{ width: "100%" }}>
                    <Table pagination={
                        {
                            defaultCurrent: 1,
                            defaultPageSize: 5,
                            pageSizeOptions: [5, 10],
                            showQuickJumper: true,
                            showSizeChanger: true
                        }}
                        rowKey="_id"
                        loading={this.state.loading}
                        bordered={true}
                        columns={columns}
                        dataSource={this.state.data} />
                </Card>
                <Modal title="添加分类" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <Form {...layout} name="control-hooks" onFinish={this.onFinish}>
                        <Form.Item name="name" label="分类名称" rules={[{ required: true, message: "必须输入分类名字" }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="type" label="选择分类" rules={[{ required: true, message: "必须要选中分类" }]}>
                            <Select
                                placeholder="请选择要添加的商品分类"
                                allowClear
                                onChange={this.typeChange}
                            >
                                <Option value="一级分类">一级分类</Option>
                                <Option value="二级分类">二级分类</Option>
                            </Select>
                        </Form.Item>
                        {this.state.list.length != 0 ? <Form.Item
                            name="parentId"
                            label="父级分类"
                            rules={[
                                {
                                    required: true,
                                    message: "必须要选中父分类"
                                },
                            ]}
                        >
                            <Select
                                placeholder="请选择你添加的分类类型"
                                allowClear
                            >
                                {this.state.list.map(item => {
                                    return <Option key={item._id} value={item._id}>{item.name}</Option>
                                })}
                            </Select>
                        </Form.Item> : null}
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                确认添加
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal title="删除分类" visible={this.state.isModalVisible2} onOk={this.handleOk2} onCancel={this.handleCancel2}>
                    <p>此操作将会永久删除该分类，请确认是否删除</p>
                </Modal>
            </>
        )
    }
}
