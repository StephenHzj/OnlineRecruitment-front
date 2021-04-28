import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import NotFound from "../components/404"
import Upload from "@/components/Upload";
import AdminUser from "@/components/admin/AdminUser";
import AdminCompany from "@/components/admin/AdminCompany";
import AdminHr from "@/components/admin/AdminHr";
import UserRegister from "@/components/RegisterUser";
import HrRegister from "@/components/RegisterHr";
import CompanyRegister from "@/components/admin/RegisterCompany";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminJob from "@/components/admin/AdminJob";
import UserLogin from "@/components/UserLogin"
import userIndex from "@/components/user/userIndex";
Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/admin',
            component: () => import(/* webpackChunkName: "home" */ '../components/admin/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: "user",
                    name: "管理用户",
                    meta: {
                        title: '管理用户'
                    },
                    component: AdminUser
                },
                {
                    path: "hr",
                    name: "管理HR",
                    meta: {
                        title: '管理HR'
                    },
                    component: AdminHr
                },
                {
                    path: "company",
                    name: "管理公司",
                    meta: {
                        title: '管理公司'
                    },
                    component: AdminCompany
                },
                {
                    path: "job",
                    name: "管理岗位",
                    meta: {
                        title: '管理岗位'
                    },
                    component: AdminJob
                },
                {
                    path: "registerCompany",
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
            path: "/userLogin",
            name: "userLogin",
            meta: {
                title: '用户登录'
            },
            component: UserLogin
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
            path: "/",
            name: "index",
            meta:{
                title: "主页"
            },
            component: userIndex
        },
        {
            path: '*',
            component: NotFound
        }
    ]

});
// 路由守卫
router.beforeEach((to, from, next) => {
    if (to.path !== '/admin' ) {
        next();
    } else {
        // 获取当前用户的令牌
        let token = localStorage.getItem('token');
        if (token === null || token === '') {
            alert("登录已过期,请前往登录!")
            next('/adminLogin');
        } else {
            next();
        }
    }
});

export default router;
