import {withRouter} from 'react-router-dom'
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {reqLogin } from '../../api/index'
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';

const NormalLoginForm = (props) =>{   
                
    const onFinish = async(values) => {                         
    console.log('Received values of form: ', values);
    props.history.replace('/')
    
    //this.props.route.history.push('/')
//     if(true){
//         //请求登陆
//         const {username,password} = values
//         reqLogin(username,password).then(resp=>{
//             console.log(resp.data)
//         }).catch(error=>{
//             console.log(error)
//         })
//     }        
        const {username,password} = values
    
        const result = await reqLogin(username,password)
        // this.props.history.push('/')
        //console.log('请求成功',reponse.data)
        // const result = reponse.data
        if(result.status===0){
            message.success('登陆成功')
            console.log('这是 history',props.history)   
            //保存user
            const user = result.data
            memoryUtils.user = user //保存在内存
            storageUtils.saveUser(user) //保存在local中
            
            props.history.replace('/')
                         
        }else{
            message.error(result.msg)
        }

}


const handleSubmit= (event)=>{           
    console.log('神奇的数据')
    window.alert('addada')
}

const validatorPwd=(rule,value,callback)=>{
    if(!value){
        callback('密码必须输入')
    }else if(value.length<4){
        callback('密码长度不能小于4位')
    }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
        callback('格式错误')
    }else {
        callback()
    }
}


return (           
           <Form
                name="normal_login"
                className="login-form"  
                initialValues={{
                    remember: true,
                  }}                
                onFinish={onFinish.bind(this)}
                onSubmit={handleSubmit}                        
                >
            <Form.Item
                name="username"
                rules={[
                {  required: true,whitespace:true,message: 'Please input your Username!',},
                {  min: 4,message: '用户名至少4位!',},
                {  max: 12,message: '用户名最多12位!',},
                {  pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须位字母大小写和下划线组成!',}, ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                {
                     validator:validatorPwd
                },
                ]}
            >
                <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
                </Form.Item>

                {/* <a className="login-form-forgot" href="">
                Forgot password
                </a> */}
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" style={{width:'100%'}}>
                登陆
                </Button>
                Or <a href="">register now!</a>
            </Form.Item>
            </Form>
                         
    
)
}

export default withRouter(NormalLoginForm) 