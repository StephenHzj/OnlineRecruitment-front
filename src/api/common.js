import http from '../common/public'
// import queryString from 'querystring'

//用户登录
export const login = (url, params) => {
    return http.requestPost('/api'+url,params)
}

export const register = (url, params) => {
    return http.requestPost('/api'+url,params)
}

// export const loginn = (url,userName,  userPassword, abc, id) => {
//     return http.requestPost('/api'+url+"/"+id+"?userName="+userName+"&userPassword="+userPassword)
// }

// export const loginn = (url,params) => {
//     let s = queryString.stringify(params);
//     return http.requestQuickGet('/api'+url+"?"+s)
// }

export const search = (url) => {
    return http.requestQuickGet('/api'+url)
}