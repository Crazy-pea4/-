window.addEventListener('load', function () {
    // 关闭广告
    const close_ad = document.querySelector('.close-ad');
    const ad = document.querySelector('.advertisement');
    close_ad.addEventListener('click', function () {
        ad.style.display = 'none';
    })
    // 搜索模块选中边框变红
    const search = document.querySelector('.search').children[0];
    search.addEventListener('focus', function () {
        search.style.border = '1px solid #fc5531';
    })
    search.addEventListener('blur', function () {
        search.style.border = '1px solid #ccc';
    })

    // 搜索模块placeholder自动切换
    let arr = [
        '元宇宙概念有多火',
        'python循环语句的使用方法',
        'C语言如何实现字符串替换',
        'java创建对象的四种方式',
        'C++和C语言有什么区别',
        '10分钟搭建linux服务器',
        '清楚excel密码的方法',
        'mysql8如何部署至linux',
        'python爬虫的100个入门项目',
        'centos8安装图解'
    ];
    console.log();
    counter();

    function counter() {
        // 随机推荐
        search.placeholder = arr[Math.floor(Math.random() * 10)];
    }
    setInterval(counter, 5000);

    // 用户档案表显现
    const user_pic = document.querySelector('.user-pic');
    const profile = document.querySelector('.user-profile');
    user_pic.addEventListener('mouseenter', function () {
        profile.style.display = 'block';

        function counter() {
            profile.style.visibility = 'visible';
            profile.style.opacity = '1';
        }
        setTimeout(counter, 100);
    })
    user_pic.addEventListener('mouseleave', function () {
        profile.style.display = 'none';

        function counter() {
            profile.style.visibility = 'hidden';
            profile.style.opacity = '0';
        }
        setTimeout(counter, 100);
    });

    // 会员特权显现
    const vip = document.querySelector('.vip');
    const vip_introduction = document.querySelector('.vip-introduction');
    vip.addEventListener('mouseover', function () {
        vip_introduction.style.display = 'block';

        function counter() {
            vip_introduction.style.visibility = 'visible';
            vip_introduction.style.opacity = '1';
        }
        setTimeout(counter, 100);
    });
    vip.addEventListener('mouseout', function () {
        vip_introduction.style.display = 'none';

        function counter() {
            vip_introduction.style.visibility = 'hidden';
            vip_introduction.style.opacity = '0';
        }
        setTimeout(counter, 100);
    });
    // 收藏模块显现
    const collections = document.querySelector('.collections');
    const collecttions_body = document.querySelector('.collections-body');
    const collections_left = document.querySelector('.collections-left');
    collections.addEventListener('mouseover', function () {
        collecttions_body.style.display = 'block';

        function counter() {
            collecttions_body.style.visibility = 'visible';
            collecttions_body.style.opacity = '1';
        }
        setTimeout(counter, 100);
    })
    collections.addEventListener('mouseout', function () {
        collecttions_body.style.display = 'none';

        function counter() {
            collecttions_body.style.visibility = 'hidden';
            collecttions_body.style.opacity = '0';
        }
        setTimeout(counter, 100);
    })
    // 点击选中对应收藏区块
    const collections_items = collections_left.querySelectorAll('li');
    const collections_items_num = collections_left.querySelectorAll('span');
    for (let i = 0; i < collections_items.length; i++) {
        // 获取每个收藏区块中的span（存放收藏数目）
        collections_items[i].addEventListener('click', function (e) {
            // 收藏区块排他
            for (let j = 0; j < collections_items.length; j++) {
                collections_items[j].children[0].className = '';
                collections_items_num[j].className = '';
            }
            this.children[0].className = 'collections-items-current1';
            this.querySelector('span').className = 'collections-items-current2';
        })
    }
    // 选择第一个收藏模块并选中
    collections_left.querySelector('a').className = 'collections-items-current1';

    // 消息模块显现
    const news = document.querySelector('.news');
    const news_body = document.querySelector('.news-body');
    news.addEventListener('mouseover', function () {
        news_body.style.display = 'block';

        function counter() {
            news_body.style.visibility = 'visible';
            news_body.style.opacity = '1';
        }
        setTimeout(counter, 100);
    });
    news.addEventListener('mouseout', function () {
        news_body.style.display = 'none';

        function counter() {
            news_body.style.visibility = 'hidden';
            news_body.style.opacity = '0';
        }
        setTimeout(counter, 100);
    });
});