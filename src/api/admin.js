import http from "@/common/public";
import request from "@/utils/request";


//删除用户
export const deleteUser = (userId) => {
    return http.requestQuickGet('/api/admin/user/delete/'+userId)
}

export const deleteHr = (HrId) => {
    return http.requestQuickGet('/api/admin/hr/delete/'+HrId)
}

export const auditCompany = (companyCode) => {
    return http.requestQuickGet('/api/admin/company/audit/'+companyCode)
}

export const disableJob = (id) => {
    return http.requestQuickGet('/api/admin/job/disable/'+id)
}

export const getAllUsers =() => {
    return request({
        url: '/api/admin/user',
        method: 'get',
    });
};

export const getPageUsers =(page) => {
    return request({
        url: '/api/admin/user/'+page.pageIndex,
        method: 'get',
    });
};


export const getAllJobs =() => {
    return request({
        url: '/api/admin/job',
        method: 'get',
    });
};

export const getAllCompanies =() => {
    return request({
        url: '/api/admin/company',
        method: 'get',
    });
};

export const getPageCompanies =(page) => {
    return request({
        url: '/api/admin/company/' + page.pageIndex,
        method: 'get',
    });
};

export const getAllHrs =() => {
    return request({
        url: '/api/admin/hr',
        method: 'get',
    });
};

