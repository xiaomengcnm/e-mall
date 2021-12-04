import React, { Component } from 'react'
import ProductHome from './subspage/ProductHome'
import ProductDetail from './subspage/ProductDetail'
import ProductAdd from './subspage/ProductAdd'
import {Switch,Route} from "react-router-dom"

export default class list extends Component {
    render() {
        return (
            <div>
                {/* 商品展示、商品添加、商品详情 */}
                <Switch>
                    <Route exact path="/home/product/list" component={ProductHome}></Route>
                    {/* <Route exact path="/home/product/list" component={Test}></Route> */}
                    <Route path="/home/product/list/detail" component={ProductDetail}></Route>
                    <Route path="/home/product/list/add" component={ProductAdd}></Route>
                </Switch>
            </div>
        )
    }
}
