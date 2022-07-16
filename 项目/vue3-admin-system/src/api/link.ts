import server from "../utils/server";

const link = (url: string, method: string, data?: object, params?: object) => {
  return new Promise((resolve, reject) => {
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
