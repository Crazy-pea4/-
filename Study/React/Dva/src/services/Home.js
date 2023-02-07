import request from "../utils/request";

export function queryList() {
  return request(
    "https://m.maizuo.com/gateway?cityId=441300&pageNum=1&pageSize=10&type=1&k=8680478",
    {
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.2.1","e":"16735000082187250750193665"}',
        "X-Host": "mall.film-ticket.film.list",
      },
    }
  );
}
