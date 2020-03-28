import { lazy } from 'react';
import UserLayout from '@/layouts/UserLayout'

//  首页
const Home = lazy(() => import('@/pages/Home'))

//  其他
const Login = lazy(() => import('@/pages/Login'))
const Error = lazy(() => import('@/pages/Error'))


const routerConfig = [
  {
    path: "/user",
    component: UserLayout,
    isNotNeedHead: true,
    children: [
      {
        path: '/login',
        component: Login,
      },
      // {
      //   path: '/register',
      //   component: UserRegister,
      // },
      {
        path: '/',
        redirect: '/user/login',
      },
      {
        component: Error,
      },
    ]
  },
  
  {
    name: 'home',
    path: "/home",
    component: Home,
    requiresAuth: false
  },
  {
    name: '首页',
    path: "/",
    exact: true,
    redirect: '/home',
  },
  {
    component: Error,
    isNotNeedHead: true
  }
]


export default routerConfig