import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { Modal, Button, Space } from 'antd';
import menuList from '../../config/menuConfig'
import { formatDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import './index.less'
import storageUtils from '../../utils/storageUtils';
import LinkButton from '../link-button';

 class Header extends Component {

    
    //   currentTime = formatDate (Date.now())
    state = {
        currentTime : formatDate (Date.now())
    }
        
       
    getTime = () => {
            this.interId =  setInterval(()=>{
            // const currentTime = new Date().toLocaleTimeString()
            const currentTime =   formatDate (Date.now())
            this.setState({currentTime})
        },1000)
    }

        
    getTitle = () =>{
        //得到当前请求路径
        const path = this.props.location.pathname
        let title
        menuList.forEach(item =>{
            if(item.key === path){
                title =item.title
            }else if(item.children){
                //定义一个布尔值 用来判断子列表中有无 和当前路径相等的key 的一项
                const cItem = item.children.find(cItem => cItem.key===path)
                if(cItem){
                    title = cItem.title
                }
            }
        })
        return title
      }
      
      logOut = () =>{
        Modal.confirm({
            title: '确定退出？',
            // icon: <ExclamationCircleOutlined />,
            onOk: ()=> {
              console.log('OK');
              //删除保存的user数据
              storageUtils.removeUser()
              memoryUtils.user = {}

              this.props.history.replace('/login')
            },
            onCancel() {
              console.log('Cancel');
            },
          });

      }

        componentDidMount(){
            this.getTime()
         }

         componentWillUnmount (){
             clearInterval(this.interId)
         }

    render() {
        const {currentTime} =  this.state
        const username = memoryUtils.user.username
        const title = this.getTitle()
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎,{username}</span>
                    {/* <a href="javascript:" onClick={this.logOut}> 退出</a>          */}
                    <LinkButton onClick={this.logOut}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                <div className="header-bottom-left">{title}</div>
                <div className="header-bottom-right">
                    <span>{currentTime}</span>
                    {/* <img src={dayPictureUrl} alt="weather"/> */}
                    
                </div>
                </div>
            </div>
        )
    }
    
   
}

export default withRouter(Header)