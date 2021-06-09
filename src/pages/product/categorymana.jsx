import React, { Component } from 'react'
import {Button, Card,message,Table} from 'antd'
import {PlusSquareOutlined,SendOutlined} from '@ant-design/icons'
import LinkButton from '../../components/link-button'
import { reqCategorys } from '../../api'

export default class Categorymana extends Component {

    state = {
        categorys: [], //一级分类列表
        loading :false,
        parentId : '0', //当前需要显示的 分类列表ID
        parentName : '', 
        childCategorys : []
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
              render: (category) => (
                  <span>
                      <LinkButton>修改分类</LinkButton>
                      {
                          //防止一渲染就调用
                      }

                    {this.state.parentId ==='0'? <LinkButton 
                    onClick={() => {this.showChildCategorys(category)}}>查看子分类
                    </LinkButton>:null}
                      
                  </span>

              )
            }
           
          ];
     }

     /**
      * 显示指定一级分类对象的二级列表 
      */
     showChildCategorys = (category) => {
         this.setState({
            parentId : category._id,
            parentName: category.name
        },()=>{
            this.getCategorys()
        })
     }

     showCategorys = () => {
        this.setState({
            parentId : '0',
            parentName: '',
            childCategorys: []
        })
     }

     /**
      * 异步获取一级分类列表
      */
     getCategorys = async() => {
        //发送请求前 显示loading
        this.setState({loading: true})
        const {parentId} = this.state
        //发异步ajax请求 获取数据
        const result = await reqCategorys(parentId)

        //请求完成 隐藏 loading
        this.setState({loading:false})

        if(result.status === 0){
            //取出分类数组（可能一级也可能二级）
            const categorys = result.data
            if(parentId ==='0'){
                this.setState({categorys})
                console.log(categorys)
            }else {
                this.setState ({
                    childCategorys : categorys
                })
            }
            
           
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
        const {categorys,loading,parentId,childCategorys,parentName} = this.state
         //card左侧
         
         const title = parentId==='0'? '一级分类列表' : <span>
             <LinkButton onClick={() =>{this.showCategorys()}}>一级分类列表</LinkButton>
             <SendOutlined style={{ fontSize: '16px', color: '#08c' ,marginRight: '20px' }}/>
             <span>{parentName} </span>
         </span>

         //card右侧
         const extra = (
         <Button icon={<PlusSquareOutlined />} type='primary'>
             
             添加 
         </Button>
         )
                                
        return (
            <Card title={title} extra={<a href="#">{extra}</a>} style={{ width: '100%' }}>
                <Table 
                dataSource={parentId=='0'? categorys : childCategorys} 
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
