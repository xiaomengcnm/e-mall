import React, { Component } from 'react'
import { Card,Form,Button,InputNumber,Input } from "antd"
import { Link } from "react-router-dom"
const {TextArea} = Input

export default class ProductDetail extends Component {
    onFinish = (values)=>{
        console.log(values);
    }
    render() {
        // 表单样式
        const layout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 8 },
        };
        const tailLayout = {
            wrapperCol: { offset: 8, span: 16 },
        };
        return (
            <Card title={"商品详情"} extra={<Link to="/home/product/list">返回</Link>} style={{ width: "100%" }}>
                <Form
                    {...layout}
                    name="basic"
                    onFinish={this.onFinish}
                >
                    <Form.Item
                        label="商品名字"
                        name="name"
                        rules={[{ required: true, message: '请输入商品名字' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="商品的描述"
                        name="title"
                        rules={[{ required: true, message: '请输入商品的基本描述' }]}
                    >
                        <TextArea />
                    </Form.Item>
                    <Form.Item
                        label="商品的价格"
                        name="price"
                        rules={[{ required: true, message: '请输入价格信息' }]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        label="商品的分类"
                        name="type"
                        rules={[{ required: true, message: '请选择分类' }]}
                    >
                        
                    </Form.Item>
                    <Form.Item
                        label="上传图片"
                        name="imgSrc"
                    >
                    </Form.Item>
                    <Form.Item
                        label="商品的详情"
                        name="msg"
                        rules={[{ required: true, message: '请选择分类' }]}
                    >
                        <TextArea />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            添加
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}
