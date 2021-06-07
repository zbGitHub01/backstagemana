import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import memoryUtils from './utils/memoryUtils'
import storageUtils from './utils/storageUtils'

//读取local中保存user 到内存中
const user = storageUtils.getUser()
memoryUtils.user = user



ReactDom.render(

        <App/>

    ,document.getElementById('root'))