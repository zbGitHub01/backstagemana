import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Form } from 'antd'


  

export default class Addform extends Component {

    
    static propsType = {
        setForm: PropTypes.func.isRequired //传递form对象的函数
    } 

    componentWillMount(){
        this.props.onSubmit(this.onFinish)
    }

    formRef = React.createRef();
    onFinish=()=>{
        this.props.getSubmitReq()
    }
    render() {

        
      

        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 8}
        }
        return (
             <Form ref={this.formRef}
              onFinish={this.onFinish}
            //  onFinish={this.props.getFinish(this.props.onFinish)}
             >
                <Form.Item 
                name= 'rolName'
                {...formItemLayout}
                label='角色名称：'
                rules={[{ required:true, message: '角色名必须输入！' ,}]}
                >
                    <input placeholder='请输入角色名称！'/>
                </Form.Item>
            </Form>
        )
    }
}
