import React, { Component } from 'react'
import { formatDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import './index.less'

export default class Header extends Component {

    
    //   currentTime = formatDate (Date.now())
    state = {
        currentTime : formatDate (Date.now())
    }
        
       
        getTime = () => {
            setInterval(()=>{
                // const currentTime = new Date().toLocaleTimeString()
                const currentTime =   formatDate (Date.now())
                this.setState({currentTime})
            },1000)
        }

        componentDidMount(){
            this.getTime()
         }

    render() {
        const {currentTime} =  this.state
        const username = memoryUtils.user.username
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎,{username}</span>
                    <a href="javascript:"> 退出</a>         
                </div>
                <div className="header-bottom">
                <div className="header-bottom-left"></div>
                <div className="header-bottom-right">
                    <span>{currentTime}</span>
                    {/* <img src={dayPictureUrl} alt="weather"/> */}
                    
                </div>
                </div>
            </div>
        )
    }
    
   
}
