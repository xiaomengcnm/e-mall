import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class NotFind extends Component {
    render() {
        return (
            <p style={{padding:"20px"}}>
                找不到页面 <Link to="/login">点击返回登录页面</Link>
            </p>
        )
    }
}
