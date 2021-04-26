import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import NotFound from "../components/404"
import Upload from "@/components/Upload";
import AdminUser from "@/components/AdminUser";
import AdminCompany from "@/components/AdminCompany";
import AdminHr from "@/components/AdminHr";
import UserRegister from "@/components/RegisterUser";
import HrRegister from "@/components/RegisterHr";
import CompanyRegister from "@/components/RegisterCompany";
import AdminLogin from "@/components/AdminLogin";
Vue.use(Router)

export default new Router({
    mode: 'history',

    routes: [
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: "/adminUser",
                    name: "管理用户",
                    meta: {
                        title: '管理用户'
                    },
                    component: AdminUser
                },
                {
                    path: "/adminHr",
                    name: "管理HR",
                    meta: {
                        title: '管理HR'
                    },
                    component: AdminHr
                },
                {
                    path: "/adminCompany",
                    name: "管理公司",
                    meta: {
                        title: '管理公司'
                    },
                    component: AdminCompany
                },
                {
                    path: "/registerCompany",
                    name: "注册公司",
                    meta: {
                        title: '注册公司'
                    },
                    component: CompanyRegister
                },


            ]
        },

        {
            path: "/login",
            name: "Login",
            meta: {
                title: '登录'
            },
            component: Login
        },
        {
            path: "/adminLogin",
            name: "adminLogin",
            meta: {
                title: '管理员登录'
            },
            component: AdminLogin
        },
        {
            path: "/userRegister",
            name: "UserRegister",
            meta: {
                title: '用户注册'
            },
            component: UserRegister
        },
        {
            path: "/hrRegister",
            name: "hrRegister",
            meta: {
                title: 'HR注册'
            },
            component: HrRegister
        },
        {
            path: "/companyRegister",
            name: "companyRegister",
            meta: {
                title: '公司注册'
            },
            component: CompanyRegister
        },

        {
            path: "/upload",
            name: "upload",
            meta: {
                title: '测试'
            },
            component: Upload
        },
        {
            path: '*',
            component: NotFound
        }
    ]
})
