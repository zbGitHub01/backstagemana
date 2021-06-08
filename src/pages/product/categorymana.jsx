import React, { Component } from 'react'
import {Button, Card,message,Table} from 'antd'
import {PlusSquareOutlined} from '@ant-design/icons'
import LinkButton from '../../components/link-button'
import { reqCategorys } from '../../api'

export default class Categorymana extends Component {

    state = {
        categorys: [], //一级分类列表
        loading :false
    }

    /*
        初始化Table所有列的数组

    */
     initColumns = () => {
        this.columns = [
            {
              title: '分类的名称',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '操作',
              width:500,
              render: () => (
                  <span>
                      <LinkButton>修改分类</LinkButton>
                      <LinkButton>查看子分类</LinkButton>
                  </span>
              )
            }
           
          ];
     }

     /**
      * 异步获取一级分类列表
      */
     getCategorys = async() => {
        //发送请求前 显示loading
        this.setState({loading: true})

        //发异步ajax请求 获取数据
        const result = await reqCategorys('0')

        //请求完成 隐藏 loading
        this.setState({loading:false})

        if(result.status === 0){
            const categorys = result.data
            
            this.setState({categorys})
            console.log(categorys)
        }else {
            message.error('获取失败')
        }
     }


     /**
      * 为第一次render() 准备数据
      */
    componentWillMount() {
        this.initColumns()
    }

    /*
        执行异步任务： 发异步ajax请求
    */
    componentDidMount(){
        this.getCategorys()

    }

    render() {
        const {categorys,loading} = this.state
         //card左侧
         const title = '一级分类列表'

         //card右侧
         const extra = (
         <Button icon={<PlusSquareOutlined />} type='primary'>
             
             添加 
         </Button>
         )
                                
        return (
            <Card title={title} extra={<a href="#">{extra}</a>} style={{ width: '100%' }}>
                <Table 
                dataSource={categorys} 
                columns={this.columns} 
                bordered 
                rowKey='_id'
                loading={loading}
                pagination={{defaultPageSize:6,showQuickJumper:true}}
                />
            </Card>
        )
    }
}
