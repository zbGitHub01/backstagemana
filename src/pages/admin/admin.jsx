import React, { Component } from 'react'
import { Layout } from 'antd';
import { Route,Switch,Redirect } from 'react-router-dom';
import Header from '../../components/header'
import memoryUtils from '../../utils/memoryUtils'
import LeftNav from '../../components/left-nav';
import Home from '../home/home'
import Categorymana from '../product/categorymana';
import Promana from '../product/promana';
import Users from '../users';
import Role from '../role';
import ColumnChart from '../graphicslist/columnchart';
import LineChart from '../graphicslist/linechart';
import PieChart from '../graphicslist/piechart';


import './admin.less'
const { Footer, Sider, Content } = Layout;
/** 
 * 后台管理的路由组件
 *
 */
export default class Admin extends Component {
    
    render() {
        const user = memoryUtils.user
        //如果内存没有存储user==> 当前没有登陆
        if(!user || !user._id){
            //自动跳转到登陆
            return <Redirect to='/login'/>
        }

        return (
                <Layout style={{height:'100%'}} className='lay'>
                    <Sider>
                        <LeftNav/>
                    </Sider>
                    <Layout>
                        <Header/>
                        <Content style={{margin:20,backgroundColor:'#fff'}}>
                            <Switch>
                                <Route path='/home' component={Home}/>
                                <Route path='/categorymana' component={Categorymana}/>
                                <Route path='/promana' component={Promana}/>
                                <Route path='/users' component={Users}/>
                                <Route path='/role' component={Role}/>
                                <Route path='/columnchart' component={ColumnChart}/>
                                <Route path='/linechart' component={LineChart}/>
                                <Route path='/piechart' component={PieChart}/>                                                                                                                
                               
                                <Redirect to='/home'/>
                            </Switch>
                        </Content>
                        <Footer>Footer</Footer>
                    </Layout>
                </Layout>  
        )
    }
}
