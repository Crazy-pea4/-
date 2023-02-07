import React from "react";
import TabBar from "./components/TabBar";

export default function App(props) {
  return (
    <div>
      {props.children}
      <TabBar></TabBar>
    </div>
  );
}
