import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import store from "../../redux/store";

// 引入actionCreator
import {
  plus,
  asyncAction,
  asyncActionPromise,
} from "../../redux/actionCreator/HomeAction";

export default function Home() {
  // useEffect(() => {
  //   console.log("Home组件挂载");

  //   // store.subscribe 添加订阅。store.subscribe返回的是取消订阅函数
  //   const unsubscribe = store.subscribe(() => {
  //     console.log("订阅", store.getState());
  //   });
  //   return () => {
  //     console.log("Home组件销毁");
  //     // 由于每次挂载Home都会订阅一次，因此在组件销毁时必须取消订阅。
  //     unsubscribe();
  //   };
  // }, []);

  /** 由于这里只是简单的兄弟组件传值，因此无需订阅，直接dispatch修改即可 */

  useEffect(() => {
    // redux-thunk写法
    // store.dispatch(asyncAction());
    // redux-promise写法
    store.dispatch(asyncActionPromise());
  }, []);

  const navigate = useNavigate();
  const ToPage = (routeName, id) => {
    if (routeName === "Page1") {
      // query传参
      navigate(`${routeName}?id=${id}`);
    } else {
      // params传参（路由传参）与vue-router类似，需要在路由处配置/:params1[?]
      navigate(`${routeName}/${id}`);
    }
  };

  return (
    <div>
      <p>Home</p>
      {/* Outlet 类似与router-view，是子路由出口 */}
      <Outlet></Outlet>
      <button onClick={() => ToPage("Page1", 711)}>ToPage1</button>
      <button onClick={() => ToPage("Page2", 1019)}>ToPage2</button>

      <p>首页 +1按钮控制的 </p>
      <div>
        <button
          onClick={() => {
            store.dispatch(plus());
          }}
        >
          +1
        </button>
        <p>
          (切换页面才能看到)首页 按钮计数 {store.getState().HomeReducer.val}
        </p>
      </div>

      <p>来自 中心页 的字符！--&gt; {store.getState().CenterReducer.inpVal}</p>

      <p>
        我是异步redux-thunk请求回来的数据 &nbsp;
        {store.getState().HomeReducer.random}
      </p>
      <p>
        我是异步redux-promise请求回来的数据 &nbsp;
        {store.getState().HomeReducer.random1}
      </p>
      <p style={{ textAlign: "center" }}>请切换页面来查看数据更变</p>
    </div>
  );
}
