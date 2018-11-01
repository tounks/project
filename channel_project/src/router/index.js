import Vue from 'vue'
import Router from 'vue-router'

const login = () => import('@/components/login')
const mainMenu = () => import('@/components/mainMenu')
const mainPage = () => import('@/components/childMenu/mainPage')
const teamManage = () => import('@/components/childMenu/teamManage')
const teamDetail = () => import('@/components/childMenu/teamDetail')
const userCount = () => import('@/components/childMenu/userCount')
const userDetail = () => import('@/components/childMenu/userDetail')
const investDetail = () => import('@/components/childMenu/investDetail')
const rechargeDetail = () => import('@/components/childMenu/rechargeDetail')
const withdrawDetail = () => import('@/components/childMenu/withdrawDetail')
const activityManage = () => import('@/components/childMenu/activityManage')
const areaSetting = () => import('@/components/childMenu/areaSetting')
const personManage = () => import('@/components/childMenu/personManage')
const channelMange = () => import('@/components/childMenu/channelMange')
const channelCount = () => import('@/components/childMenu/channelCount')
const rightManage = () => import('@/components/childMenu/rightManage')
const modPassword = () => import('@/components/childMenu/modPassword')


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Router)
Vue.use(ElementUI)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/mainMenu',
      name: 'mainMenu',
      component: mainMenu,
      children: [
        {
          path: 'mainPage',
          name: 'mainPage',
          component: mainPage
        },
        {
          path: 'teamManage',
          name: 'teamManage',
          component: teamManage
        },
        {
          path: 'teamDetail/:code',
          name: 'teamDetail',
          component: teamDetail
        },
        {
          path: 'userCount',
          name: 'userCount',
          component: userCount
        },
        {
          path: 'userDetail/:id',
          name: 'userDetail',
          component: userDetail
        },
        {
          path: 'investDetail',
          name: 'investDetail',
          component: investDetail
        },
        {
          path: 'rechargeDetail',
          name: 'rechargeDetail',
          component: rechargeDetail
        },
        {
          path: 'withdrawDetail',
          name: 'withdrawDetail',
          component: withdrawDetail
        },
        {
          path: 'activityManage',
          name: 'activityManage',
          component: activityManage
        },
        {
          path: 'areaSetting',
          name: 'areaSetting',
          component: areaSetting
        },
        {
          path: 'personManage',
          name: 'personManage',
          component: personManage
        },
        {
          path: 'channelMange',
          name: 'channelMange',
          component: channelMange
        },
        {
          path: 'channelCount',
          name: 'channelCount',
          component: channelCount
        },
        {
          path: 'rightManage',
          name: 'rightManage',
          component: rightManage
        },
        {
          path: 'modPassword',
          name: 'modPassword',
          component: modPassword
        },
      ]
    }
  ]
})
