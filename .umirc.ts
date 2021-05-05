import { defineConfig } from 'umi';
import antd from './node_modules/antd';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/login',
      component: '@/pages/login/login',
    },
    {
      path: '/other',
      component: '@/pages/other/other',
    },
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        // {
        //   path: '/',
        //   component: '@/pages/adminService',
        // },
        {
          path: '/adminService',
          component: '@/pages/adminService',
        },
        {
          path: '/teacher',
          component: '@/pages/teacher/teacher',
        },
        {
          path: '/student',
          component: '@/pages/student/student',
        },
        {
          path: '/counselor',
          component: '@/pages/counselor/counselor',
        },
        {
          path: '/news',
          component: '@/pages/news',
        },
      ],
    },
  ],
});
