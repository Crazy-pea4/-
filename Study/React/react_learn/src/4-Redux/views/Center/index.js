import React, { useEffect, useRef } from "react";

import store from "../../redux/store";
import { useNavigate } from "react-router-dom";

// 引入actionCreator
import { showInputValue } from "../../redux/actionCreator/CenterAction";

export default function Center() {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("Center组件挂载");

    return () => {
      console.log("Center组件销毁");
    };
  }, []);

  // input
  const leftInp = useRef();

  return (
    <div>
      <p>Center</p>
      <div style={{ marginTop: 50 + "px", width: "100%" }}>
        <input type="text" ref={leftInp} style={{ width: "20%" }}></input>
        <button
          onClick={() => {
            store.dispatch(showInputValue(leftInp));
            navigate("/home");
          }}
        >
          发送
        </button>
        <span>前往 首页 查看</span>
      </div>
    </div>
  );
}
