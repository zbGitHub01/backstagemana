import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Form,Item} from 'antd'



export default class Addform extends Component {

    static propsType = {
        setForm: PropTypes.func.isRequired //传递form对象的函数
    } 

    componentWillMount(){
        this.props.setForm(this.props.Form)
    }

    render() {
        return (
            <Form>
                <Form.Item>
                    <span>角色名称：</span>
                    <input placeholder='请输入角色名称！'></input>
                </Form.Item>
            </Form>
        )
    }
}
