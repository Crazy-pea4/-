import server from "../utils/server";

// 新增泛型,扩充res中的数据类型.方便解构
interface Res {
  data: {
    now: any;
  };
}

const link = (url: string, method: string, data?: object, params?: object) => {
  return new Promise<Res>((resolve, reject) => {
    server
      .request({
        url,
        method,
        data,
        params,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export default link;
