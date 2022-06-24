let username = document.querySelector('.username').children[1];
let pwd = document.querySelector('.pwd');
let inp = pwd.children[1];
let pic = pwd.children[2];
let ready_login = document.querySelector('.ready_login').children[0];
let btn = document.querySelector('.register')
// 设置net变量保存注册/登陆接口地址
let net = 'https://api.it120.cc/MartinGarrixForTest/user/username/register';
// 密码明文暗文显示
pic.addEventListener('click', function () {
    if (inp.type == 'password') {
        inp.type = 'text';
        pic.src = 'images/open.png';
    } else {
        inp.type = 'password';
        pic.src = 'images/close.png';
    }
});

// 创建事件（切换注册/登陆）
let flag = false; // 设置标识变量（开始为注册）
ready_login.addEventListener('click', function () {
    if (flag === false) {
        // 改变标题（登陆）
        username.parentNode.previousElementSibling.innerHTML = '微Q新闻 登陆';
        // 改变提示信息
        ready_login.innerHTML = '免费注册';
        btn.innerHTML = '登陆';
        // 修改net指向登陆接口
        net = 'https://api.it120.cc/MartinGarrixForTest/user/username/login';
        // 修改parameter使之符合登陆接口的参数要求
        flag = true;
    } else {
        // 改变标题（注册）
        username.parentNode.previousElementSibling.innerHTML = '微Q新闻 立即注册';
        // 改变提示信息
        ready_login.innerHTML = '已有账号？立即登录';
        btn.innerHTML = '立即注册';
        // 修改net指向注册接口
        net = 'https://api.it120.cc/MartinGarrixForTest/user/username/register';
        // 修改parameter使之符合注册接口的参数要求
        flag = false;
    }
});


var register = document.querySelector('.register');
var turn_to_login = document.querySelector('.turn_to_login');
// 创建事件
register.addEventListener('click', function () {
    if (flag === true) {
        // 修改parameter使之符合登陆接口的参数要求
        var parameter = 'username=' + username.value + '&pwd=' + inp.value + '&deviceId=' + 1 + '&deviceName=' + 1;
    } else {
        // 修改parameter使之符合注册接口的参数要求
        var parameter = 'username=' + username.value + '&pwd=' + inp.value;
    }
    // 创建对象（注册）
    var xhr = new XMLHttpRequest();
    // 初始化
    xhr.open('POST', net);
    // 设置请求头
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // 发送请求
    xhr.send(parameter);

    xhr.onreadystatechange = function () {
        // 判断
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                // 将字符串转换成对象，下面的步骤用来优化用户体验
                var json = JSON.parse(xhr.responseText);
                console.log(json);
                // 通过响应体中有无data来判断事件情况
                if (typeof json.data === 'object' && json.code == 0) {
                    // 登陆成功跳转到news页面
                    window.location.href = 'news.html';
                } else if (typeof json.data !== 'object' && json.code == 0) {
                    // 注册成功跳转到news页面
                    alert('注册成功！');
                    username.parentNode.previousElementSibling.innerHTML = '微Q新闻 登陆';
                    // 改变提示信息
                    ready_login.innerHTML = '免费注册';
                    btn.innerHTML = '登陆';
                    // 修改net指向登陆接口
                    net = 'https://api.it120.cc/MartinGarrixForTest/user/username/login';
                    // 修改parameter使之符合登陆接口的参数要求
                    parameter = 'username=' + username.value + '&pwd=' + inp.value + '&deviceId=' + 1 + '&deviceName=' + 1;
                    flag = true; // 对接登录接口
                } else if (json.code == 10000) {
                    alert('该账号已经被注册过了哟~');
                } else {
                    alert('用户不存在或者密码不正确哟~');
                }
            }
        }
    }
});