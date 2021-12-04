import React, { Component } from 'react';
import { Card, Form, Button, InputNumber, Input, Cascader, message } from "antd";
import { Link } from "react-router-dom";
import { findCascadeData,addGoods } from "../../../apis/product";
import PicturesWall from "../../../components/PicturesWall";

const { TextArea } = Input

export default class ProductDetail extends Component {
    state = {
        options: [],
        typeId: null
    }
    componentDidMount() {
        this.fetchData()
    }
    fetchData = async () => {
        const res = await findCascadeData()
        console.log(res);
        this.setState({
            options: res.data.data
        })
    }
    onFinish = async(values) => {
        values.type = this.state.typeId
        values.imgSrc = this.UploadElement.state.fileName
        console.log(values);
        const res = await addGoods(values);
        if(res.data.code){
            message.success("添加成功");
        }else{
            message.error("添加失败");
        }
    }
    cascadeChange = (file, value) => {
        console.log(file);
        console.log(value);
        if (value.length != 2) {
            message.error("必须选择子分类")
        } else {
            this.setState({
                typeId: value[1].id
            })
        }
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
            <Card title={"商品添加"} extra={<Link to="/home/product/list">返回</Link>} style={{ width: "100%" }}>
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
                        <Cascader style={{width:"200px"}} onChange={this.cascadeChange} options={this.state.options} placeholder="请选择分类信息" />

                    </Form.Item>
                    <Form.Item
                        label="上传图片"
                        name="imgSrc"
                    >
                        <PicturesWall ref={element=>this.UploadElement=element} ></PicturesWall>
                    </Form.Item>
                    <Form.Item
                        label="商品的详情"
                        name="msg"
                        rules={[{ required: true, message: '请输入商品详情' }]}
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
