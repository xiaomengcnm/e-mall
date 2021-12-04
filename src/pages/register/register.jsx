import React, { Component } from 'react'
import logo from "../../assets/images/logo-250px.png"
import "../../assets/css/login.less"
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom"

export default class index extends Component {
    onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    onFinishFail = (values) => {
        console.log(values);
    }
    validatorPassword = (rule, value, callback) => {
        console.log(rule);
        console.log(value);
        console.log(callback);
        if (!value) {
            callback("密码不能为空")
        } else if (value.length != 6) {
            callback("密码必须位6位")
        } else {
            callback()
        }
    }
    render() {
        return (
            <div className="main">
                <div className="panel">
                    <div className="logo">
                        <img width="150" src={logo} alt="" />
                    </div>
                    <div className="form">
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{
                                remember: false,
                            }}
                            onFinish={this.onFinish}
                            onFinishFailed={this.onFinishFail}
                        >
                            <Form.Item
                                name="account"
                                rules={[
                                    {
                                        required: true,
                                        message: '用户名不能为空',
                                    },
                                    // {
                                    //     min:2,
                                    //     message:"长度最少为2位"
                                    // },
                                    {
                                        max: 10,
                                        message: "长度不能超过10位"
                                    },
                                    {
                                        pattern: /^[a-zA-Z]{3,}$/,
                                        message: "请输入6位字母"
                                    }
                                ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    { validator: this.validatorPassword }
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="请输入密码"
                                />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    { validator: this.validatorPassword }
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="确认密码"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Link to="/login">
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        注册
                                    </Button>
                                </Link>
                                &nbsp;&nbsp;&nbsp;&nbsp; <Link to="/login">已有账号？去登录</Link>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}
