import React,{Component} from 'react'

import logo from './images/logo.png'
import NormalLoginForm from './normalloginform'
import memoryUtils from '../../utils/memoryUtils'
import { Redirect } from 'react-router'
import './login.less'

/**
 * 登陆的路由组件
 * 
 */
export default class Login extends Component{
          
    
    render (){
        const {history} = this.props.history
        const user = memoryUtils.user
        if(user && user._id){
            return <Redirect to='/'/>
        }
        return(
            <div className='login'>
               <header className='login-header'>
                   <img src={logo} alt='logo'></img>
                   <h1>封神管理平台</h1>
               </header>
               <section className='login-content'>
                   <h2>用户登陆</h2>
                   <NormalLoginForm history={history}/>

                </section>
            </div>
        )
    }
    }
    
        