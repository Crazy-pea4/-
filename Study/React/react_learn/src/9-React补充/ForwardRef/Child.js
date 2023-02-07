import React, { forwardRef } from "react";

{
  /* 在函数式组件中，若要向子组件传递ref，需要用到forwardRef函数 */
}

const Child = forwardRef((props, ref) => {
  return (
    <div>
      <input defaultValue={"123123"} ref={ref}></input>
    </div>
  );
});

export default Child;
