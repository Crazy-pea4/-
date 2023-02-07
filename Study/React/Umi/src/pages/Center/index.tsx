import React from 'react';

function Center() {
  return (
    <div>
      <div>鉴权通过！现在试着把local storage里的token删掉</div>
    </div>
  );
}

// 指定高阶组件 wrappers，每次访问Center都会经过Auth组件
Center.wrappers = ['@/wrappers/Auth'];
export default Center;
