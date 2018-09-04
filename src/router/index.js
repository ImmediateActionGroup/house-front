import Vue from 'vue'
import Router from 'vue-router'
import editprojectwebcode from '../view/editprojectwebcode'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: resolve => require(['@/view/login'], resolve)
    },
    {
      path: '/test',
      component: resolve => require(['@/view/test'], resolve)
    },
    // {
    //   path: '/tabletest',
    //   component: resolve => require(['@/view/tabletest'], resolve)
    // },
    {
      path: '/login',
      component: resolve => require(['@/view/login'], resolve)
    },
    {
      path: '/Mhome',
      name: 'Mhome',
      component: resolve => require(['@/view/Mhome'], resolve),
      children: [
        {
          path: 'Mhouse',
          component: resolve => require(['@/view/Mhouse'], resolve)
        },
        {
          path: 'Mhouse/Mhouseview',
          component: resolve => require(['@/view/Mhouseview'], resolve)
        },
        {
          path: 'Mhouse/Mreservehouse',
          component: resolve => require(['@/view/Mreservehouse'], resolve)
        },
        {
          path: 'Mhouse/Mcreateeditoffer',
          component: resolve => require(['@/view/Mcreateeditoffer'], resolve)
        },
        {
          path: 'Mhouse/Mofferlist',
          component: resolve => require(['@/view/Mofferlist'], resolve)
        },
        {
          path: 'Mhouse/Mofferlist/Mofferview',
          component: resolve => require(['@/view/Mofferview'], resolve)
        },
      ]
    },
    {
      path: '/home',
      name: 'home',
      component: resolve => require(['@/view/home'], resolve),
      children: [
        {
          path: 'project',
          component: resolve => require(['@/view/project'], resolve)
        },
        {
          path: 'editprojectwebcode',
          component: editprojectwebcode,
        },

        {
          path: 'house',
          component: resolve => require(['@/view/house'], resolve)
        },
        {
          path: 'agentaccount',
          name: 'agentaccount',
          component: resolve => require(['@/view/agentaccount'], resolve)
        },
        {
          path: 'system',
          name: 'system',
          component: resolve => require(['@/view/system'], resolve)
        },
        {
          path: 'employee',
          name: 'employee',
          component: resolve => require(['@/view/employee'], resolve)
        },
        {
          path: 'changepassword',
          name: 'changepassword',
          component: resolve => require(['@/view/changepassword'], resolve)
        },
        {
          path: 'modifydata',
          name: 'modifydata',
          component: resolve => require(['@/view/modifydata'], resolve)
        },
        {
          path: 'modificationrecord',
          name: 'modificationrecord',
          component: resolve => require(['@/view/modificationrecord'], resolve)
        },
        {
          path: 'agentreportforms',
          name: 'agentreportforms',
          component: resolve => require(['@/view/agentreportforms'], resolve)
        },
        {
          path: 'purchaserreportforms',
          name: 'purchaserreportforms',
          component: resolve => require(['@/view/purchaserreportforms'], resolve)
        },
      ]
    },

  ]
})
