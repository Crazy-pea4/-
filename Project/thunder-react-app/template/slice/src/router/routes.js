export default function () {
  return `import React from "react";
import { Navigate } from "react-router-dom";
import NotFound from "../views/NotFound";
const modules = import.meta.glob("../views/**/*.jsx");

export default [
  {
    path: "/",
    element: <Navigate to="/home"></Navigate>,
  },
  {
    path: "/home",
    element: LazyLoad("/Home"),
  },
  {
    path: "/introducing",
    element: LazyLoad("/Introducing"),
  },
  {
    path: "*",
    element: <NotFound></NotFound>,
  },
];

function LazyLoad(path) {
  const Com = React.lazy(modules[\`../views\${path}.jsx\`]);

  return (
    <React.Suspense fallback={null}>
      <Com />
    </React.Suspense>
  );
}`;
}
