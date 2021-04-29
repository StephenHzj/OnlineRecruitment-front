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
        url: '/api/user/resume/'+userId,
        method: 'get',
    });
}

export const getUserInfo = (userTel) => {
    return request({
        url: '/api/user/resume/'+userId,
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