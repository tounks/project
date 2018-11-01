import Vue from 'vue'
import Router from 'vue-router'
import littleGold from '@/components/littleGold'
import exchangeExplain from '@/components/childComponent/exchangeExplain'
import riskResult from '@/components/childComponent/riskResult'
import makeSurvey from '@/components/makeSurvey'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/littleGold'
    },
    {
      path: '/littleGold',
      name: 'littleGold',
      component: littleGold,
    },
    {
      path: '/exchangeExplain',
      name: 'exchangeExplain',
      component: exchangeExplain,
    },
    {
      path: '/riskResult',
      name: 'riskResult',
      component: riskResult,
    },
    {
      path: '/makeSurvey',
      name: 'makeSurvey',
      component: makeSurvey,
    },
  ]
})
