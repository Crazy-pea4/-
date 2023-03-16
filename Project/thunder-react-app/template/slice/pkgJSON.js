import pacote from "pacote";

// 获取最新包最新版本
const getLatestVersion = async (pkgName) => {
  const { name, version } = await pacote.manifest(`${pkgName}@latest`, {
    registry: "https://registry.npmmirror.com/",
  });
  // console.log(manifest);
  return { name, version };
};

export default async function ({ projectName }) {
  return `{
  "name": "${projectName}",
  "description": "",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^${(await getLatestVersion("react"))["version"]}",
    "react-dom": "^${(await getLatestVersion("react-dom"))["version"]}",
    "@reduxjs/toolkit": "^${
      (await getLatestVersion("@reduxjs/toolkit"))["version"]
    }",
    "react-redux": "^${(await getLatestVersion("react-redux"))["version"]}",
    "react-router": "^${(await getLatestVersion("react-router"))["version"]}",
    "react-router-dom": "^${
      (await getLatestVersion("react-router-dom"))["version"]
    }"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^${
      (await getLatestVersion("@vitejs/plugin-react"))["version"]
    }",
    "vite": "^${(await getLatestVersion("vite"))["version"]}"
  }
}`;
}
