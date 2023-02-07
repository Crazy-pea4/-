import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // Umi的约定式路由可以根据pages文件下的文件自动生成路由及其匹配路径（需要把下面的routes注释掉，让其自动检测）
  // routes: [{ path: '/', component: '@/pages/Home' }],
  fastRefresh: {},
  proxy: {
    '/maizuo': {
      target:
        'https://m.maizuo.com/gateway?cityId=440300&pageNum=1&pageSize=10&type=1&k=5701862',
      changeOrigin: true,
      pathRewrite: { '^/maizuo': '/' },
    },
  },
  // 在Umi中内置了antd-mobile@2，如果使用最新的组件库版本需要如下配置
  antd: {
    mobile: false,
  },
  // 开启mfsu（加速开发编译）
  mfsu: {},
  // 开启dva
  dva: {},
});
