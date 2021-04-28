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