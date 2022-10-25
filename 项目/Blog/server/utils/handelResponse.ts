import HandelResponse from "../@types/utils/handelResponse";

const handelResponse: HandelResponse = function (res, result, data?) {
  if (result) {
    res.status(200).json({
      code: 200,
      message: "操作成功",
      data: data ? data : result,
    });
  } else {
    res.status(400).json({
      code: 400,
      message: "操作失败",
      data: data ? data : result,
    });
  }
};

export default handelResponse;
