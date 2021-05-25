import http from '../common/public'
// import queryString from 'querystring'

//用户登录
// export const loginn = (url, params) => {
//     return http.requestPost('/api'+url,params)
// }

export const register = (url, params) => {
    return http.requestPost('/api'+url,params)
}

export const login = (url,tel,password) => {
    return http.requestPost('/api'+url+"/"+"?tel="+tel+"&password="+password)
}

// export const loginn = (url,params) => {
//     let s = queryString.stringify(params);
//     return http.requestQuickGet('/api'+url+"?"+s)
// }

export const search = (url) => {
    return http.requestQuickGet('/api'+url)
}