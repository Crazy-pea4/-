import React, { useState, useEffect } from 'react';
import { IRouteComponentProps, connect } from 'umi';
import { NavBar, DotLoading } from 'antd-mobile';
interface ModelProps extends IRouteComponentProps {
  state: {
    HomeModel: {
      num: number;
      list: any[];
    };
    // 这里是Dva配置的，当生成器函数调用时，global为true，调用完毕后为false
    // 可以很好的帮助开发者做“加载中”处理
    loading: {
      global: boolean;
    };
  };
  dispatch(action: { type: string; [params: string]: string | number }): void;
}

// 如果需要嵌套路由（约定式写法），需要新建文件夹，里面创建一个_layout.tsx作为所有子路由的父组件。
// 通过props.children提供子路由
function Home(props: ModelProps) {
  const { state, dispatch } = props;

  useEffect(() => {
    if (!state.HomeModel.list.length) {
      dispatch({
        type: 'HomeModel/getList',
      });
    }
  }, []);

  return (
    <div>
      <NavBar>标题</NavBar>
      Home
      {state.loading.global && <DotLoading />}
      <ol>
        {state.HomeModel.list.map((item: any) => (
          <li key={item.filmId}>{item.name}</li>
        ))}
      </ol>
      {props.children}
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return { state };
};

export default connect(mapStateToProps)(Home);
