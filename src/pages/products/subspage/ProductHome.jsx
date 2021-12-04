import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Card, Table, Button, message, Modal, Form, Select, Input } from "antd"
import { findAllProduct, delGoods, searchProducts } from "../../../apis/product"

const { Option } = Select

export default class ProductHome extends Component {
    state = {
        data: [],
        loading: false,
        isModalVisible: false,
        delId: ""
    }
    componentDidMount() {
        this.fetchData()
    }
    fetchData = async () => {
        const res = await findAllProduct()
        this.setState({
            data: res.data.data
        })
    }
    confirmDel = async (values) => {
        this.setState({
            isModalVisible: true,
            delId: values._id
        })
    }
    handleCancel = () => {
        this.setState({
            isModalVisible: false
        })
        message.warning("取消删除");
    }
    handleOk = async () => {
        const res = await delGoods({ id: this.state.delId })
        if (res.data.code) {
            message.success("删除成功");
            const res = await findAllProduct()
            this.setState({
                isModalVisible: false,
                data: res.data.data
            })
        } else {
            message.error("删除失败");
        }
    }
    onFinish = async (tags) => {
        const res = await searchProducts(tags)
        if (res.data.code) {
            this.setState({
                data: res.data.data
            })
        }
    }
    render() {
        const columns = [
            {
                title: '商品名字',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '商品标题',
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: '商品价格',
                dataIndex: 'price',
                key: 'price',
            },
            {
                title: '商品类型',
                dataIndex: 'type',
                key: 'type',
                render: row => {
                    return row.type
                }
            },
            {
                title: '商品状态',
                dataIndex: 'state',
                render: row => {
                    if (row) {
                        return <Button type="primary">点击下架</Button>
                    } else {
                        return <Button type="default">点击上架</Button>
                    }
                }
            },
            {
                title: '操作',
                render: tags => (
                    <>
                        <Button type="dashed" onClick={() => this.confirmDel(tags)}>删除</Button>
                    </>
                ),
            }
        ];
        return (
            <>
                <Card title={"商品列表"} extra={<Link to="/home/product/list/add">添加商品</Link>} style={{ width: "100%" }}>
                    <Form name="control-hooks" onFinish={this.onFinish} style={{ display: "flex" }}>
                        <Form.Item name="searchType" label="" rules={[{ required: true, message: "必须选择搜索方式" }]} style={{ width: "140px" }}>
                            <Select
                                placeholder="请选择搜索方式"
                                // allowClear
                            >
                                <Option value="name">商品名称</Option>
                                <Option value="title">商品标题</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="searchData" label="" rules={[{ required: false, message: "必须输入搜索内容" }]} style={{ width: "140px" }} initialValue="">
                            <Input placeholder="请输入搜索内容" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                搜索
                            </Button>
                        </Form.Item>
                    </Form>
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
                <Modal title="删除分类" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <p>此操作将会永久删除该商品，请确认是否删除</p>
                </Modal>
            </>
        )
    }
}
