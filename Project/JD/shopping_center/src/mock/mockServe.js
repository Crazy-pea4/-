// 引入mockjs
import Mock from 'mockjs';
// 把JSON数据格式引入进来（webpack默认对外暴露的文件有：图片、JSON数据格式。因此banner和floor不需要在源文件暴露）
import banner from './banner.json';
import floor from './floor.json';

// mock基本使用。第一个参数：请求地址、第二个参数：请求数据
Mock.mock("/mock/banner", {code: 200, data: banner});
Mock.mock("/mock/floor", {code: 200, data: floor});