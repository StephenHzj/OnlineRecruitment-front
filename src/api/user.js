import http from "@/common/public";
import request from "@/utils/request";

export const login = (url, params) => {
    return http.requestPost('/api'+url,params)
}

export const getJobInfo = () => {
    return request({
        url: '/api/jobs',
        method: 'get',
    });
}

export const getResumeData = (userId) => {
    return request({
        url: '/api/user/'+userId+'/resume/',
        method: 'get',
    });
}

export const updateResume = (params) => {
    return http.requestPost('/api/resume/update',params)
}

export const updateInfo = (params) => {
    return http.requestPost('/api/user/info/update',params)
}

export const getUserInfo = (userTel) => {
    return request({
        url: '/api/user/info/'+userTel,
        method: 'get',
    });
}

export const register = (url, params) => {
    return http.requestPost('/api'+url,params)
}

export const getJobDetail = (jobId) => {
    return request({
        url: '/api/job/'+jobId,
        method: 'get',
    });
}


export const applicationJob = (params) => {
    return http.requestPost('/api/app/job',params)
}



export const getAppList = (userTel) => {
    return request({
        url: '/api/'+userTel+'/show/app',
        method: 'get',
    });
}

export const getJobList = () => {
    return request({
        url: '/api/job',
        method: 'get',
    });
}