/*
设置动态生成导航菜单的配置（链表数组）

*/
import { HomeOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

const menuList = [
    {
        title: '首页', //菜单标题名称
        key: '/home', //对应的path
        icon: <HomeOutlined /> //图标名称
    },
    {
        title: '商品', 
        key: '/categorymana', 
        icon: <AppstoreOutlined /> ,
        children: [
            {
                title: '分类管理', 
                key: '/categorymana',                
            },
            {
                title: '产品管理', 
                key: '/promana',
            }
        ]
    },
    {
        title: '用户管理', //菜单标题名称
        key: '/users', //对应的path
        icon: <HomeOutlined /> //图标名称
    },
    {
        title: '角色管理', //菜单标题名称
        key: '/role', //对应的path
        icon: <HomeOutlined /> //图标名称
    },
    {
        title: '图形图表', 
        key: '/categoryman', 
        icon: <SettingOutlined /> ,
        children: [
            {
                title: '柱形图', 
                key: '/columnchart',                
            },
            {
                title: '折线图', 
                key: '/linechart',
            },
            {
                title: '大饼图', 
                key: '/piechart',
            }
        ]
    },

]

export default menuList

