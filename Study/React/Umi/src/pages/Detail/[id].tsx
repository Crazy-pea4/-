/**
 * 约定 [] 包裹的文件或文件夹为动态路由。
    比如：
    src/pages/users/[id].tsx 会成为 /users/:id
    src/pages/users/[id]/settings.tsx 会成为 /users/:id/settings
    src/pages/[id].tsx 会成为 /:id

    约定 [ $] 包裹的文件或文件夹为动态可选路由。
    比如：
    src/pages/users/[id$].tsx 会成为 /users/:id?
    src/pages/users/[id$]/settings.tsx 会成为 /users/:id?/settings
 */
import React from 'react';
import { useParams } from 'umi';

export default function Detail() {
  const params: { id: string } = useParams();

  return <div>Detail-{params.id}</div>;
}
