import React, { useState } from "react";

import { fromJS } from "immutable";

export default function App() {
  const obj = fromJS({
    name: "jack",
    skill: {
      fighter: {
        damage: 5,
      },
      swimmer: false,
    },
    hobby: ["eat-", "sleep-", "attack-"],
  });
  const [immuObj, setImmuObj] = useState(obj);
  console.log(immuObj);

  // 使用getIn或setIn方法，getIn(searchKeyPath: Iterable<unknown>, notSetValue?: unknown)
  const jack_damage = immuObj.getIn(["skill", "fighter", "damage"]);
  return (
    <div>
      <div>jack的战斗力-{jack_damage}</div>
      <button
        onClick={() => {
          setImmuObj(
            immuObj.setIn(["skill", "fighter", "damage"], jack_damage + 1)
          );
        }}
      >
        给他加战力！
      </button>
      <div>数组-{immuObj.getIn(["hobby"])}</div>
      <button
        onClick={() => {
          setImmuObj(immuObj.setIn(["hobby", 1], "not sleep-"));
        }}
      >
        不睡觉，开卷
      </button>
      <button
        onClick={() => {
          // 数组的另一种修改方式，值为函数的返回值（push方法不是原生push）
          setImmuObj(immuObj.updateIn(["hobby"], (arr) => arr.push("fight-")));

          // 还有类似的很多 setImmuObj(immuObj.deleteIn(["hobby", 0]));
        }}
      >
        fight
      </button>
    </div>
  );
}
