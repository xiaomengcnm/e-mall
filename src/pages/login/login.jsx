import React, { Component } from 'react'
import logo from "../../assets/images/logo-250px.png"
import "../../assets/css/login.less"
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { login } from '../../apis/users';
import {setLocalStorage} from "../../utils/localStorage";

export default class index extends Component {
    onFinish = async(values) => {
        const res = await login(values);
        console.log(res);
        if(res.data.code){
            message.success("登录成功");
            setLocalStorage("token",res.data.data.token);
            setLocalStorage("userInfo",res.data.data.userInfo);
            this.props.history.push("/home");
        }else{
            message.error("登录失败");
        }
    };
    onFinishFail = (values) => {
        console.log(values);
    }
    validatorPassword = (rule, value, callback) => {
        // console.log(rule);
        // console.log(value);
        // console.log(callback);
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
                                    {
                                        min: 2,
                                        message: "长度最少为2位"
                                    },
                                    {
                                        max: 10,
                                        message: "长度不能超过10位"
                                    },
                                    // {
                                    //     pattern: /^[a-zA-Z]{3,}$/,
                                    //     message: "请输入6位字母"
                                    // }
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
                            <Form.Item>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>记住密码</Checkbox>
                                </Form.Item>

                                <a className="login-form-forgot" href="#">
                                    忘记密码
                                </a>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    登录
                                </Button>
                                &nbsp;&nbsp;&nbsp;&nbsp; <Link to="/register">没有账号？去注册</Link>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}
