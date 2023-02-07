import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { connect } from "react-redux";

// 引入actionCreator
import {
  plus,
  asyncAction,
  asyncActionPromise,
} from "../../redux/actionCreator/HomeAction";

function Home(props) {
  console.log(props);
  const { store, plus, asyncActionPromise } = props;
  useEffect(() => {
    // redux-thunk写法
    // store.dispatch(asyncAction());
    // redux-promise写法
    asyncActionPromise();
  }, [asyncActionPromise]);

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
            plus();
          }}
        >
          +1
        </button>
        <p>
          (react-redux写法不切换页面也会更新)首页 按钮计数{" "}
          {store.HomeReducer.val}
        </p>
      </div>

      <p>来自 中心页 的字符！--&gt; {store.CenterReducer.inpVal}</p>

      <p>
        我是异步redux-thunk请求回来的数据 &nbsp;
        {store.HomeReducer.random}
      </p>
      <p>
        我是异步redux-promise请求回来的数据 &nbsp;
        {store.HomeReducer.random1}
      </p>
      <p style={{ textAlign: "center" }}>请切换页面来查看数据更变</p>
    </div>
  );
}

// 使用connect使Home组件与顶层provider连接
// connect(() => mapStateToProps: object, mapDispatchToProps: {() => action1, ()=> action2})
const mapStateToProps = (store) => {
  // 第一个参数提供所有的reducers
  console.log(store);
  return {
    store,
    // 返回对象可以在当前组件的props得到
    "react-redux": "hello i am new type",
  };
};
const mapDispatchToProps = {
  // connect 当props.plus()调用时，返回的action也就是对象，connect会自动帮你传入store.dispatch
  // 并且页面会重新渲染数据
  plus,
  asyncActionPromise,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
