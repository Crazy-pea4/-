window.addEventListener('load', function () {
    const headlines_title = document.querySelector('.headlines-title');
    headlines_title.addEventListener('mouseover', function () {
        // 避免一个一个写hover，那样有点傻
        headlines_title.className = 'headlines-title underline';
    });

    // 左侧新闻板块
    let arr = [];
    // 模拟数据库
    let json1 = `[
        {
            "page": "1 (仅作为页面表示，无作用)",
            "title": "Windows 11隐藏版曝光",
            "explain": "Windows 11 SE将面世"
        },
        {
            "title": "50个Python单行代码",
            "explain": "直接拿来用"
        },
        {
            "title": "从一线撤回二线三线城市的程序员们",
            "explain": "最后都怎么样了？"
        },
        {
            "title": "放弃微服务，构建单体应用",
            "explain": "微服务隐性成本很高"
        },
        {
            "title": "英特尔正式发布12代酷睿",
            "explain": "全选架构升级，游戏表现超过锐龙9"
        },
        {
            "page": "2 (仅作为页面表示，无作用)",
            "title": "深入理解一致性与C++内存模型",
            "explain": "系统的、深入浅出的介绍"
        },
        {
            "title": "字节开源Arco Design",
            "explain": "一款无惧“魔改”的设计系统开源了，已支持字节跳动4000多个项目"
        },
        {
            "title": "谷歌发布Android 12L",
            "explain": "专为平板电脑跟折叠屏设备"
        },
        {
            "title": "APP Store搜索出Bug",
            "explain": "完美避开所有正确答案"
        },
        {
            "title": "射程打1200米，持枪机器狗引热议",
            "explain": "Sword防御系统就是无人武器系统的未来"
        },
        {
            "page": "3 (仅作为页面表示，无作用)",
            "title": "可编程的SQL是什么样的？",
            "explain": "这个可编程的SQL是还在梦乡中么？"
        },
        {
            "title": "Facebook投资百亿打造元宇宙",
            "explain": "扎克伯格：放长线钓大鱼！"
        },
        {
            "title": "退休的WinXP仍有上百万人坚守",
            "explain": "Windows XP迎来20岁生日"
        },
        {
            "title": "超千万下载量的NPM包造黑客攻击",
            "explain": "电脑系统不同，攻击方式不同"
        },
        {
            "title": "悄悄删除2.5K功能代码，微软致歉",
            "explain": "恢复.NET SDK 热重载功能"
        },
        {
            "page": "4 (仅作为页面表示，无作用)",
            "title": "因运营商配置错误，韩国大面积断网",
            "explain": "此前甩锅DDoS攻击"
        },
        {
            "title": "开源项目刷Star，CTO致歉",
            "explain": "OceanBaes GitHub送礼刷Star引争议"
        },
        {
            "title": "苹果iPod 20年，你用过吗",
            "explain": "20年前iPod改变了世界，20年后它变成了怀旧机器"
        },
        {
            "title": "英特尔开源自动代码识别工具",
            "explain": "AI帮忙找Bug"
        },
        {
            "title": "软件自由保护协会起诉Vizio",
            "explain": "Vizio 不符合通用公共许可证 (GPL) 的基本合规要求"
        },
        {
            "title": "VS Code网页预览版发布",
            "explain": "可完全在浏览器中运行"
        },
        {
            "title": "三大院士、十大数据库掌门人对话",
            "explain": "岳麓对话开启数字经济新时代"
        }
    ]`;
    console.log(JSON.parse(json1));

    // 左侧新闻板块
    let data1 = JSON.parse(json1);
    // 设置初识下标 0~5，for扫描范围 0 1 2 3 4
    let left_min_index = 0;
    // 向上取整，规定初识下标上限始终为5
    let left_max_index = Math.ceil(data1.length - (5 * (data1.length / 5 - 1)));
    console.log(left_max_index);
    for (let i = left_min_index; i < left_max_index; i++) {
        arr.push(
            `<div class="headswiper-left-msg">
                <p><a class="headswiper-left-msg-title" href="javascript:void(0)">${data1[i].title}</a></p>
                <i><a class="headswiper-left-msg-explain" href="javascript:void(0)">${data1[i].explain}</a></i>
            </div>`
        );
    }
    // 获取左侧新闻，并将内容渲染到其上面
    const headswiper_left_body = document.querySelector('.headswiper-left-body');
    headswiper_left_body.innerHTML = arr.join('');
    // 鼠标经过新闻标题显示下划线
    let headswiper_left_msg_title = document.querySelectorAll('.headswiper-left-msg-title');
    for (let j = 0; j < headswiper_left_msg_title.length; j++) {
        headswiper_left_msg_title[j].addEventListener('mouseover', function () {
            headswiper_left_msg_title[j].className = 'headswiper-left-msg-title underline';
        });
    }

    // 获取左右切换箭头
    const headswiper_left_top_left_arrow = document.querySelector('.headswiper-left-top-left-arrow');
    const headswiper_left_top_right_arrow = document.querySelector('.headswiper-left-top-right-arrow');
    // 添加右箭头点击事件
    headswiper_left_top_right_arrow.addEventListener('click', function () {
        if (left_max_index < data1.length) {
            left_min_index += 5;
            left_max_index += 5;
            let arr = [];
            // 标识变量
            let flag;
            // 当数据数组长度不满足5的倍数
            if (left_max_index > data1.length) {
                flag = data1.length;
            } else {
                flag = left_max_index;
            }
            for (let i = left_min_index; i < flag; i++) {
                arr.push(
                    `<div class="headswiper-left-msg">
                        <p><a class="headswiper-left-msg-title" href="javascript:void(0)">${data1[i].title}</a></p>
                        <i><a class="headswiper-left-msg-explain" href="javascript:void(0)">${data1[i].explain}</a></i>
                    </div>`
                );
            }
            // 获取左侧新闻，并将内容渲染到其上面
            let headswiper_left_body = document.querySelector('.headswiper-left-body');
            headswiper_left_body.innerHTML = arr.join('');
            // 鼠标经过新闻标题显示下划线
            let headswiper_left_msg_title = document.querySelectorAll('.headswiper-left-msg-title');
            for (let j = 0; j < headswiper_left_msg_title.length; j++) {
                headswiper_left_msg_title[j].addEventListener('mouseover', function () {
                    headswiper_left_msg_title[j].className = 'headswiper-left-msg-title underline';
                });
            }
        }
        // 判断左箭头状态
        if (left_min_index > 0) {
            this.previousElementSibling.src = 'images/黑左箭头.png';
        }
        // 判断右箭头状态
        if (left_max_index >= data1.length) {
            this.src = 'images/灰右箭头.png';
        }
    });
    // 添加左箭头点击事件
    headswiper_left_top_left_arrow.addEventListener('click', function () {
        if (left_min_index > 0) {
            left_min_index -= 5;
            left_max_index -= 5;
            // 对于左箭头下标变量做减法处理，不会超出数据数组长度，故不用做特殊处理
            let arr = [];
            for (let i = left_min_index; i < left_max_index; i++) {
                arr.push(
                    `<div class="headswiper-left-msg">
                        <p><a class="headswiper-left-msg-title" href="javascript:void(0)">${data1[i].title}</a></p>
                        <i><a class="headswiper-left-msg-explain" href="javascript:void(0)">${data1[i].explain}</a></i>
                    </div>`
                );
            }
            // 获取左侧新闻，并将内容渲染到其上面
            let headswiper_left_body = document.querySelector('.headswiper-left-body');
            headswiper_left_body.innerHTML = arr.join('');
            // 鼠标经过新闻标题显示下划线
            let headswiper_left_msg_title = document.querySelectorAll('.headswiper-left-msg-title');
            for (let j = 0; j < headswiper_left_msg_title.length; j++) {
                headswiper_left_msg_title[j].addEventListener('mouseover', function () {
                    headswiper_left_msg_title[j].className = 'headswiper-left-msg-title underline';
                });
            }
        }
        // 判断左箭头状态
        if (left_min_index == 0) {
            this.src = 'images/灰左箭头.png';
        }
        // 判断右箭头状态
        if (left_max_index != data1.length) {
            this.nextElementSibling.src = 'images/黑右箭头.png';
        }
    });

    /* ============================================================================================================================= */

    // 右侧新闻板块
    let arr1 = [];
    // 模拟数据库
    let json2 = `[
        {
            "page": "1 (仅作为页面表示，无作用)",
            "title": "历史上的今天：图像冒险游戏的发明者诞生",
            "explain": "最后一台Multics计算机被关闭"
        },
        {
            "title": "将开源和企业引入计算机课程教学",
            "explain": "“把教学场景用起来”模式探讨"
        },
        {
            "title": "大型电商平台30万用户信息遭泄露",
            "explain": "王者荣耀道歉因新游海报擅用原神素材|极客头条"
        },
        {
            "title": "PHP没死，78%的网站在用",
            "explain": "PHPer前景如何？"
        },
        {
            "title": "软件开发和DBA谁更吃香？",
            "explain": "为什么软件开发都想转DBA？"
        },
        {
            "page": "2 (仅作为页面表示，无作用)",
            "title": "GitHub Univeres 2021",
            "explain": "线上直播，不见不散"
        },
        {
            "title": "历史上的今天：互联网的诞生",
            "explain": "MariaDB 发布首个版本"
        },
        {
            "title": "豆瓣回应删除用户相册图片",
            "explain": "阿里平头哥校招IC岗开出50W+薪资|极客头条"
        },
        {
            "title": "历史上的今天：HTML5标准发布",
            "explain": "IBM 收购 RedHat"
        },
        {
            "title": "程序员IT好书评选结果出炉",
            "explain": "20本图书俘获程序员芳心"
        },
        {
            "page": "3 (仅作为页面表示，无作用)",
            "title": "世界上到底有多少编程语言",
            "explain": "你能说出多少个编程语言"
        },
        {
            "title": "第六届中国开源年会",
            "explain": "Happy Hacking，开心开源"
        },
        {
            "title": "腾讯59人被反舞弊调查处理",
            "explain": "豆瓣被曝私自删除手机照片|极客头条"
        },
        {
            "title": "直播回放|1024程序员节",
            "explain": "技术盛宴，19场深度分享"
        },
        {
            "title": "苹果称刘海屏是个“聪明设计”",
            "explain": "淘宝推出表情购物功能|极客头条"
        },
        {
            "page": "4 (仅作为页面表示，无作用)",
            "title": "因遭勒索软件攻击，我被开除",
            "explain": "并被老东家索赔21.5万元"
        },
        {
            "title": "Python“抄袭”Rust",
            "explain": "Python3.10最重要的升级——模式匹配的盖头"
        },
        {
            "title": "程序员转行，半年过去，现状如何？",
            "explain": "全世界都在庆祝程序员节，但我想讲讲我为什么转行了"
        },
        {
            "title": "周鸿炜称当程序员比当老板幸福",
            "explain": "英特尔i9-12900HK跑分超越苹果M1 Max|极客头条"
        },
        {
            "title": "历史上的今天：Win XP 20周年",
            "explain": "图灵奖编程语言先去诞生"
        },
        {
            "title": "程序员为什么不爱炫富？",
            "explain": "你看你看，我这个键盘是HHKB！"
        },
        {
            "title": "张一鸣成中国互联网首富",
            "explain": "苹果称华为商标抄袭AIRPODS被驳回|极客头条"
        },
        {
            "title": "罗永浩吐槽苹果新品：更丑更贵",
            "explain": "苹果售卖145元擦屏布|极客头条"
        }
    ]`;

    let data2 = JSON.parse(json2);
    // 设置初识下标 0~5，for扫描范围 0 1 2 3 4
    let right_min_index = 0;
    // 向上取整，规定初识下标上限始终为5
    let right_max_index = Math.ceil(data2.length - (5 * (data2.length / 5 - 1)));
    console.log(right_max_index);
    for (let i = right_min_index; i < right_max_index; i++) {
        arr1.push(
            `<div class="headswiper-right-msg">
                <p><a class="headswiper-right-msg-title" href="javascript:void(0)">${data2[i].title}</a></p>
                <i><a class="headswiper-right-msg-explain" href="javascript:void(0)">${data2[i].explain}</a></i>
            </div>`
        );
    }
    // 获取左侧新闻，并将内容渲染到其上面
    const headswiper_right_body = document.querySelector('.headswiper-right-body');
    headswiper_right_body.innerHTML = arr1.join('');
    // 鼠标经过新闻标题显示下划线
    let headswiper_right_msg_title = document.querySelectorAll('.headswiper-right-msg-title');
    for (let j = 0; j < headswiper_right_msg_title.length; j++) {
        headswiper_right_msg_title[j].addEventListener('mouseover', function () {
            headswiper_right_msg_title[j].className = 'headswiper-right-msg-title underline';
        });
    }

    // 获取左右切换箭头
    const headswiper_right_top_left_arrow = document.querySelector('.headswiper-right-top-left-arrow');
    const headswiper_right_top_right_arrow = document.querySelector('.headswiper-right-top-right-arrow');
    // 添加右箭头点击事件
    headswiper_right_top_right_arrow.addEventListener('click', function () {
        if (right_max_index < data2.length) {
            right_min_index += 5;
            right_max_index += 5;
            let arr1 = [];
            let flag;
            // 当数据数组长度不满足5的倍数
            if (right_max_index > data2.length) {
                flag = data2.length;
            } else {
                flag = right_max_index;
            }
            for (let i = right_min_index; i < flag; i++) {
                arr1.push(
                    `<div class="headswiper-right-msg">
                        <p><a class="headswiper-right-msg-title" href="javascript:void(0)">${data2[i].title}</a></p>
                        <i><a class="headswiper-right-msg-explain" href="javascript:void(0)">${data2[i].explain}</a></i>
                    </div>`
                );
            }
            // 获取左侧新闻，并将内容渲染到其上面
            let headswiper_right_body = document.querySelector('.headswiper-right-body');
            headswiper_right_body.innerHTML = arr1.join('');
            // 鼠标经过新闻标题显示下划线
            let headswiper_right_msg_title = document.querySelectorAll('.headswiper-right-msg-title');
            for (let j = 0; j < headswiper_right_msg_title.length; j++) {
                headswiper_right_msg_title[j].addEventListener('mouseover', function () {
                    headswiper_right_msg_title[j].className = 'headswiper-right-msg-title underline';
                });
            }
        }
        // 判断左箭头状态
        if (right_min_index > 0) {
            this.previousElementSibling.src = 'images/黑左箭头.png';
        }
        // 判断右箭头状态
        if (right_max_index >= data1.length) {
            this.src = 'images/灰右箭头.png';
        }
    });
    // 添加左箭头点击事件
    headswiper_right_top_left_arrow.addEventListener('click', function () {
        if (right_min_index > 0) {
            right_min_index -= 5;
            right_max_index -= 5;
            // 对于左箭头下标变量做减法处理，不会超出数据数组长度，故不用做特殊处理
            let arr1 = [];
            for (let i = right_min_index; i < right_max_index; i++) {
                arr1.push(
                    `<div class="headswiper-right-msg">
                        <p><a class="headswiper-right-msg-title" href="javascript:void(0)">${data2[i].title}</a></p>
                        <i><a class="headswiper-right-msg-explain" href="javascript:void(0)">${data2[i].explain}</a></i>
                    </div>`
                );
            }
            // 获取左侧新闻，并将内容渲染到其上面
            let headswiper_right_body = document.querySelector('.headswiper-right-body');
            headswiper_right_body.innerHTML = arr1.join('');
            // 鼠标经过新闻标题显示下划线
            let headswiper_right_msg_title = document.querySelectorAll('.headswiper-right-msg-title');
            for (let j = 0; j < headswiper_right_msg_title.length; j++) {
                headswiper_right_msg_title[j].addEventListener('mouseover', function () {
                    headswiper_right_msg_title[j].className = 'headswiper-right-msg-title underline';
                });
            }
        }
        // 判断左箭头状态
        if (right_min_index == 0) {
            this.src = 'images/灰左箭头.png';
        }
        // 判断右箭头状态
        if (right_max_index != data1.length) {
            this.nextElementSibling.src = 'images/黑右箭头.png';
        }
    });

    // 轮播图模块
    const arrow_left = document.querySelector('.arrow-left');
    const arrow_right = document.querySelector('.arrow-right');
    const focus_box = document.querySelector('.focus-box');
    const focus_circle = document.querySelector('.focus-circle');
    // 获取focus-pic里面的ul
    const ul_pic = document.querySelector('.focus-pic').children[0];
    // 获取focus-circle，也就是ul
    const ul_circle = document.querySelector('.focus-circle')
    // 轮播图自动播放定时器名称
    let timer = null;
    timer = setInterval(function () {
        arrow_right.click();
    }, 3000)
    // 鼠标进过移开、轮播图，显示、隐藏左右箭头
    focus_box.addEventListener('mouseover', function () {
        arrow_left.style.display = 'block';
        arrow_right.style.display = 'block';
        // 鼠标经过轮播图，停止自动播放
        clearInterval(timer);
    });
    focus_box.addEventListener('mouseout', function () {
        arrow_left.style.display = 'none';
        arrow_right.style.display = 'none';
        // 自动播放轮播图
        timer = setInterval(function () {
            arrow_right.click();
        }, 3000);
    });
    // 动态生成小圆圈
    let pic_length = ul_pic.children.length;
    for (let i = 0; i < pic_length; i++) {
        let li = document.createElement('li');
        li.setAttribute('data-index', i);
        ul_circle.appendChild(li);
        li.addEventListener('click', function (e) {
            // 小圆圈排他
            for (let j = 0; j < ul_circle.children.length; j++) {
                ul_circle.children[j].className = '';
            }
            this.className = 'focus-circle-current';
            // 点击小圆圈切换图片
            let li_data_index = this.getAttribute('data-index');
            animate(ul_pic, -li_data_index * ul_pic.children[0].offsetWidth);
            // 解决小圆圈和左右箭头不关联造成的bug
            pic_num = li_data_index;
            circle_num = li_data_index;
            // pic_num和circle_num在外部定义（已经定义好了），上面两行代码写在异步任务中，因此并不会造成bug
        });
        // 先选中第一个小圆圈
        focus_circle.children[0].className = 'focus-circle-current';
    }
    // 在末尾克隆第一个li
    const clone = ul_pic.children[0].cloneNode(true);
    ul_pic.appendChild(clone);
    // 点击左右箭头切换图片
    let pic_num = 0; // 标识变量，当做轮播图索引号
    let circle_num = 0; // 标识变量
    let flag = true; // 节流阀变量 控制轮播图被快速点击时不会快速滚动
    arrow_right.addEventListener('click', function (e) {
        if (flag) {
            flag = false; // 当点击一次以后，节流阀关闭
            if (pic_num == ul_pic.children.length - 1) {
                pic_num = 0;
                ul_pic.style.left = 0;
            }
            pic_num++; //每次点击
            animate(ul_pic, -pic_num * ul_pic.children[0].offsetWidth, function () {
                flag = true; // 当动画执行完毕之后，节流阀打开
            });
            // 小圆圈高亮位置对应图片位置
            if (circle_num == ul_circle.children.length - 1) {
                circle_num = 0;
            } else {
                circle_num++;
            }
            // 小圆圈排他
            for (let i = 0; i < ul_circle.children.length; i++) {
                ul_circle.children[i].className = '';
            }
            ul_circle.children[circle_num].className = 'focus-circle-current';
        }
    });
    arrow_left.addEventListener('click', function (e) {
        if (flag) {
            flag = false;
            if (pic_num == 0) {
                pic_num = ul_pic.children.length - 1;
                ul_pic.style.left = -pic_num * ul_pic.children[0].offsetWidth + 'px';
            }
            pic_num--; //每次点击
            animate(ul_pic, -pic_num * ul_pic.children[0].offsetWidth, function () {
                flag = true; // 当动画执行完毕之后，节流阀打开
            });
            // 小圆圈高亮位置对应图片位置
            if (circle_num <= 0) {
                circle_num = ul_circle.children.length - 1;
            } else {
                circle_num--;
            }
            // 小圆圈排他
            for (let i = 0; i < ul_circle.children.length; i++) {
                ul_circle.children[i].className = '';
            }
            ul_circle.children[circle_num].className = 'focus-circle-current';
        }
    });
});