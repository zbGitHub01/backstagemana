import ajax from './ajax'
import jsonp from 'jsonp'



//登陆

// export function reqLogin(username,password) {
//     return ajax('/login',{username,password},'POST')
// }


const BASE = ''
export const reqLogin = (username,password) => ajax(BASE + '/login',{username,password},'POST')

//添加用户
export const reqAddUser = (user) => ajax('/manager/user/add',user,'POST');