import { Button ,Table ,Card ,Modal} from 'antd'
import React, { Component } from 'react'
import { reqRoles } from '../../api'
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
    

    //发送异步请求数据
    componentDidMount(){
        this.getRolesData()
    }
    
    
    //为初次render准备数据： 初始化 columns
    componentWillMount(){
        this.initColumns()
    }



    render() {           
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
                    // onOk={handleOk} 
                    onCancel={()=>{this.setState({isShow: false})}}>
                    <Addform setForm={form => this.props = form} />
                </Modal>

            </Card>
        )
    }
}
