import ajax from './ajax'
// import jsonp from 'jsonp'



//登陆

// export function reqLogin(username,password) {
//     return ajax('/login',{username,password},'POST')
// }


const BASE = ''
//登陆
export const reqLogin = (username,password) => ajax(BASE + '/login',{username,password},'POST')

//添加用户
export const reqAddUser = (user) => ajax(BASE +'/manager/user/add',user,'POST');

//获取一级菜单列表
export const reqCategorys = (parentId) => ajax(BASE + '/manage/category/list',parentId,'GET')

//添加分类
export const addCategorys = (parentId,categoryName) =>ajax (BASE + '/manage/category/add',{parentId,categoryName},'POST')

//更新分类
export const updateCategorys = ({categoryId,categoryName}) =>ajax (BASE + '/manage/category/add',{categoryId,categoryName},'POST')



//获取所有角色的列表
export const reqRoles = () => ajax(BASE +'/manage/role/list' )




/**
 * jsonp请求的接口函数
 * 
 */

export const reqWeather = (city) => {
    
}