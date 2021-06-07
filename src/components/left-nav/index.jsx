import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'
import { Menu, } from 'antd';

import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig'
import './index.less'

const { SubMenu } = Menu;

class LeftNav extends Component {

    getAllMenuNodes = (menuList)=>{
      const path = this.props.location.pathname
      return menuList.map(item=>{
          if(!item.children){
            return (
              <Menu.Item key={item.key} icon={item.icon}><Link to={item.key}>{item.title}</Link></Menu.Item>
            )
          }else {
            //查找一个与当前请求路径匹配的子item (如果找到 返回一个布尔值)
            const boolean = item.children.find(childItem => childItem.key===path)
            //如果存在 说明当前item的子列表需要打开
            if(boolean){
               this.openKey = item.key
            }
            

            return(
              <SubMenu key={item.key} icon={item.icon} title={item.title}>
                 {this.getAllMenuNodes(item.children)}
              </SubMenu>
            )
          }
      })
    }

    


    state = {
        theme: 'dark',
        current: '1',
      };
    
      changeTheme = value => {
        this.setState({
          theme: value ?  'light':'dark',
        });
      };
    
      handleClick = e => {
        console.log('click ', e);
        this.setState({
          current: e.key,
        });
      };

      componentWillMount () {
         this.menuNodes = this.getAllMenuNodes(menuList)
      }

    render() {

      const path = this.props.location.pathname
      const openKey = this.openKey
        return (
            <div className='left-nav'>
                <Link to='/' className='left-nav-header'>
                    <img src={logo} alt="logo"/>
                    <h1>后台</h1>
                </Link>                
                <Menu
                    theme={this.state.theme}
                    onClick={this.handleClick}
                    style={{ width: 200 }}
                    defaultOpenKeys={[openKey]}
                    // selectedKeys={[this.state.current]}
                    selectedKeys={[path]}
                    mode="inline"
                    >
                    
                    {/* <Menu.Item key="/home" icon={<HomeOutlined />}><Link to='/home'> 首页 </Link></Menu.Item> 
                    <SubMenu key="sub2" icon={<AppstoreOutlined />} title="商品">
                        <Menu.Item key="/categorymana"><Link to='/categorymana'> 分类管理 </Link></Menu.Item>
                        <Menu.Item key="6"><Link to='/promana'> 产品管理 </Link></Menu.Item>
                    
                    </SubMenu>
                      <Menu.Item key="13" icon={<HomeOutlined />}>首页</Menu.Item>
                      <Menu.Item key="3" icon={<HomeOutlined />}>首页</Menu.Item>
                    <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
                        <Menu.Item key="9">Option 9</Menu.Item>
                        <Menu.Item key="10">Option 10</Menu.Item>
                        <Menu.Item key="11">Option 11</Menu.Item>
                    </SubMenu> */}

                     {this.menuNodes}

                </Menu>

            </div>
        )
    }
}

export default withRouter(LeftNav)