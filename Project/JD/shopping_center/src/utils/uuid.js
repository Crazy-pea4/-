// vue-cli帮我们生成项目时，会自动帮我们安装uuid这个包
import {
    v4 as uuidv4
} from 'uuid';
// 暴露一个拿到uuid的函数
export default () => {
    let uuid = localStorage.getItem('uuid');
    if (!uuid) {
        uuid = uuidv4();
        localStorage.setItem('uuid', uuid);
    }
    return uuid;
}