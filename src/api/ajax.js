/*
能发送异步ajax请求的函数模块
封装axios库
函数返回值是promise对象

*/

import axios from 'axios'
import {message} from 'antd'

export default function ajax(url,data={},type='GET') {

    return new Promise((resolve,reject)=>{
        let promise
        //执行异步ajax请求
        if(type==='GET'){ //GET请求
            promise =  axios.get(url,{
            params: data   //指定请求参数
            })
        }else { //POST 请求
            promise = axios.post(url,data)
        }
        //如果成功 调用resolve(value)
        promise.then(reponse=>{
            resolve(reponse.data)
        //如果失败 不调用reject（reason) ，而是提示异常信息
        }).catch(error=>{
            message.error('请求出错：' + error.message)
        })
    })


    
}