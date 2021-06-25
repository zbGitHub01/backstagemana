
import { Button ,Table ,Card ,Modal, message} from 'antd'
import React, { Component } from 'react'
import axios from 'axios'
import { addRoles, reqRoles } from '../../api'
import {PAGE_SIZE} from '../../utils/constant' 
import Addform from './add-form'
export default class Role extends Component {

    state={
        roles: [],
        role: {} ,
        isShow: false
    }
    
    initColumns = () =>{
  
        this.columns = [
            {
              title: '角色名称',
              dataIndex: 'name',
              
            },
            {
              title: '创建时间',
              dataIndex: 'create_time',
             
            },
            {
              title: '授权时间',
              dataIndex: 'auth_time',
              
            },
            {
                title: '授权人',
                dataIndex: 'auth_name',
                
              }
          ];
    }

   
        onRow= role => {
            return {
              onClick: event => { // 点击行
                console.log('点击')
                this.setState ({
                    role
                })
              }, 
             
            }
        }


    
    //异步请求获取 角色列表
    getRolesData = async() => {
        const result = await reqRoles()
        if(result.status === 0) {
            this.setState({
                roles : result.data
            })
    
        }
        
    }
    
    //添加角色
    // addRoles = () => {
    //     this.setState({isShow: false })

    //    }
    
    //  this.props.getFinish(async(values) =>{
    //         if(values){
    //             //收集数据
    //             const {roleName} = values
    //             const result = await addRoles(roleName)
    //             if(result.status === 0){
    //                 message.success('添加成功！')
    //                 this.setState(state =>({
    //                     roles : [...state.roles,result.data]
    //                 }))
                    
    //             }
    //         } else {
    //             message.error('错误')
    //         }
    //     }

    // )   
    
    setForm = values =>{
        console.log(values)
    }

    //发送异步请求数据
    componentDidMount(){
        this.getRolesData()
    }
    
    
    //为初次render准备数据： 初始化 columns
    componentWillMount(){
        this.initColumns()
    }

     //将子组件传递的onFinish方法放在state
     onSubmit = (onFinish) => {  
        this.setState({
            onFinish
        })
    }

    comformAddUser = () => {
        this.userFormRef.current.formRef.current.submit()
     
    }

    getSubmitReq =  () => {     
        const val = this.userFormRef.current.formRef.current.getFieldsValue()        
             const {roleName} = val 
             console.log(roleName)
             this.userFormRef.current.formRef.current.resetFields()
             axios.post(`/manage/role/add`, {roleName: roleName}).then(res=>{
                console.log(res.data)
                this.setState({isShow:false})
                this.getRolesData()                           
            })
             
            
        }

        //     const result = await addRoles(rolename)              
        //     if(result.status===0){
        //         this.setState({isShow:false}) 
        //   } 
        //   this.getRolesData()
        
        // const rolename = this.userFormRef.current.formRef.current.getFieldsValue()
       
        // if (result.status === 0 ) {
        //     message.success('success')
        //     this.setState(state=>({
        //         roles: [...state.roles,result.data] })
           
        //      ) }
    


    render() {       
        
        this.userFormRef = React.createRef()
        const { roles,role,isShow} = this.state
        const title = (
            <span>
                <Button type={'primary'} onClick={()=>{this.setState({isShow:true})}}>创建角色</Button>&nbsp;&nbsp;
                <Button type={'primary'} disabled={!role._id}>设置角色权限</Button>
            </span>
        )

        return (
            <Card title={title} extra={<a href="#">More</a>} style={{ width: '100%' }}>
                <Table 
                bordered
                rowKey='_id'
                dataSource={roles} 
                columns={this.columns} 
                pagination={{defaultPageSize: PAGE_SIZE}}
                rowSelection={{type: 'radio' , selectedRowKeys : [role._id]}}
                onRow = {this.onRow}

                />

                <Modal 
                    title="角色创建" 
                    visible={isShow} 
                    onOk={this.comformAddUser} 
                    onCancel={()=>{this.setState({isShow: false})}}>
                    <Addform 
                    ref={this.userFormRef} onSubmit={this.onSubmit}
                    getSubmitReq={this.getSubmitReq}                                   
                    // getFinish={onFinish => this.props =onFinish} 
                    />
                </Modal>

            </Card>
        )
    }
}
