import { defineAsyncComponent } from 'vue'

export const layoutComponents = {
  "404": defineAsyncComponent(() => import("D:/Program/H5C3-JS/Study/webpack/vuepress/node_modules/@vuepress/theme-default/lib/client/layouts/404.vue")),
  "Layout": defineAsyncComponent(() => import("D:/Program/H5C3-JS/Study/webpack/vuepress/node_modules/@vuepress/theme-default/lib/client/layouts/Layout.vue")),
}
