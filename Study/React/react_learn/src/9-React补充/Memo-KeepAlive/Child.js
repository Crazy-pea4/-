import React, { memo } from "react";

const Child = memo(() => {
  console.log("React.memo，作用类似与Vue中的KeepAlive");
  return <div></div>;
});

export default Child;
