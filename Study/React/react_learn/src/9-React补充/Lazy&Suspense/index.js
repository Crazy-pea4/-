import React, { lazy, Suspense } from "react";

export default function App() {
  const Com = lazy(() => import("./LazyLoad"));
  return (
    <div>
      <h3>请将浏览器改为slow 3G</h3>
      {/* 使用React.lazy要搭配Suspense组件使用，该组件是在文件lazyLoad时展示的JSX */}
      <Suspense fallback={<p>加载中....</p>}>
        <Com></Com>
      </Suspense>
    </div>
  );
}
