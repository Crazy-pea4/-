window.addEventListener('load', function () {
    // 创建对象
    let xhr = new XMLHttpRequest();
    // 初始化
    xhr.open('GET', 'https://api.it120.cc/MartinGarrixForTest/mock/data/getMsg');
    // 发送请求
    xhr.send();
    xhr.onreadystatechange = function () {
        // 判断
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                // 将服务端返回的字符串转换为js对象
                const json = JSON.parse(JSON.parse(xhr.responseText));
                console.log(json);
                // 新增一个空数组存放新建元素
                let arr = [];
                const data = json.result.data;
                // data是个数组 要看清楚
                for (let i = 0; i < data.length; i++) {
                    // 判断对象的个数来确定图文显示方式
                    // 注意清零
                    let getNumber = 0;
                    for (var key in data[i]) {
                        getNumber++;
                    }
                    // 打印元素
                    if (getNumber == 8) {
                        // 只有一张图
                        arr.push(
                            `<div class="box clearfix">
                            <a href="${data[i].url}">
                                <img src="${data[i].thumbnail_pic_s}" class="single_img">
                            </a>
                            <p class="clearfix single_p">
                                <a href="${data[i].url}">${data[i].title}</a>
                            </p>
                            <i class="single_i">
                                <span>${data[i].author_name}</span>${data[i].date}
                            </i>
                        </div>`
                        );
                    } else if (getNumber == 9) {
                        // 有两张图
                        arr.push(
                            `<div class="multi_box clearfix">
                            <p class="clearfix multi_p">
                                <a href="${data[i].url}">${data[i].title}</a>
                            </p>
                            <a href="${data[i].url}">
                                <img src="${data[i].thumbnail_pic_s}" class="multi_img">
                                <img src="${data[i].thumbnail_pic_s02}" class="multi_img">
                            </a>
                            <i class="multi_i">
                                <span>${data[i].author_name}</span>${data[i].date}
                            </i>
                        </div>`
                        );
                    } else {
                        arr.push(
                            // 三张图
                            `<div class="multi_box clearfix">
                            <p class="clearfix multi_p">
                                <a href="${data[i].url}">${data[i].title}</a>
                            </p>
                            <a href="${data[i].url}">
                                <img src="${data[i].thumbnail_pic_s}" class="multi_img">
                                <img src="${data[i].thumbnail_pic_s02}" class="multi_img">
                                <img src="${data[i].thumbnail_pic_s03}" class="multi_img">
                            </a>
                            <i class="multi_i">
                                <span>${data[i].author_name}</span>${data[i].date}
                            </i>
                        </div>`
                        );
                    }
                }
                // 将数组转换成字符串，再通过innerHtml渲染到body上
                const big_box = document.querySelector('.news')
                big_box.innerHTML = arr.join('');
                // 给第一个元素添加锚点链接
                const top = document.querySelector('div');
                top.setAttribute('id', 'top');
            }
        }
    }
})