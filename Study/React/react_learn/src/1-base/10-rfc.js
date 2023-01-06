import React from "react";

export default function Rfc(props) {
  console.log(props);
  props.handler("rfc数据...哔哔哔");
  return (
    <div style={{ backgroundColor: props.bgColor }}>
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
      </ul>
    </div>
  );
}
