import React, { Component } from 'react';
import { Button, Form, Input, Modal, message } from "antd";
import { withRouter } from "react-router-dom";
import {addRoles} from "../../apis/role";

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};
const tailLayout = {
    wrapperCol: { offset: 4, span: 20 },
};


class addRole extends Component {
    state = {
        list: [],
        isModalVisible: true
    }
    onOk = () => {
        this.props.closeModel3();
    }
    onCancel = () => {
        this.props.closeModel3();
    }
    getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        var hour = date.getHours(); //获取当前小时数(0-23)
        var min = date.getMinutes(); //获取当前分钟数(0-59)
        var sec = date.getSeconds(); //获取当前秒数(0-59)
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate +" "+ hour + seperator2 + min + seperator2 + sec;
        return currentdate;
    }
    onFinish = async(value) => {
        value.createTime = this.getNowFormatDate();
        const res = await addRoles(value);
        if(res.data.code){
            message.success("添加成功");
            this.props.fetchData();
            this.props.closeModel3();
        }else{
            message.error("添加失败");
        }
    }
    render() {
        return (
            <Modal title="添加角色" visible={this.state.isModalVisible} onOk={this.onOk} onCancel={this.onCancel} cancelText="取消" okText="确定">
                <Form {...layout} name="control-hooks" onFinish={this.onFinish}>
                    <Form.Item name="name" label="角色名称" rules={[{ required: true, message: "必须输入角色名称" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            确认添加
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default withRouter(addRole)
