import fs from "fs";
import UploadController from "../@types/controller/upload";
// 引入Tencent Cos对象存储服务包
import Cos from "cos-nodejs-sdk-v5";
/* 引入upload模型 */
import userModel from "../model/user";

/* 引入config文件 */
import config from "../config/index";

const cos = new Cos({
  SecretId: "AKIDZyAAvGxOaXGl26wXu21BAyYx71e2A3jC",
  SecretKey: "UjiU2JLBoCKCpvy1xsgGckgOs79xYv8H",
});

const uploadController: UploadController = {
  upload: (req, res, next) => {
    const id = req.params.id;
    if (req.file) {
      const filepath = `${config.app.baseUrl}/public/uploads/${req.file.originalname}`;
      // 查询用户先前是否已经上传过头像
      cos.getBucket(
        {
          Bucket: "blog-user-avatar-1308742510",
          Region: "ap-guangzhou",
          Prefix: id,
        },
        (err, data) => {
          if (err) {
            res.status(500).json({
              code: 500,
              message: err.message,
            });
          }
          // 若用户存在之前上传过的图片，删除掉再添加新的
          if (data.Contents[0]) {
            cos.deleteObject(
              {
                Bucket: "blog-user-avatar-1308742510",
                Region: "ap-guangzhou",
                Key: data.Contents[0].Key,
              },
              (err, data) => {
                if (err) {
                  res.status(500).json({
                    code: 500,
                    message: err.message,
                  });
                }
              }
            );
          }
        }
      );
      // 确保将用户的先前头像删除完毕，再添加新头像
      cos.uploadFile({
        Bucket: "blog-user-avatar-1308742510",
        Region: "ap-guangzhou",
        Key: `${id}_${req.file.originalname}`,
        FilePath: filepath,
        SliceSize: 1024 * 1024 * 5,
        onFileFinish: async function (err, data, options) {
          if (err) {
            res
              .status(500)
              .json({ code: 500, message: "文件上传出错，请稍后重试" });
          }
          // 成功后设置userModel.avatar为图床的图片url
          await userModel.findByIdAndUpdate(id, {
            $set: {
              avatarUrl: `https://${data.Location}`,
            },
          });
          // 删除留在本地的图片
          fs.rmSync(
            `D:/Program/H5C3-JS/Project/Blog/server/public/uploads/${
              req.file!.originalname
            }`
          );
          res.status(200).json({
            code: 200,
            message: "上传成功！",
          });
        },
      });
    }
    // if (req.file) {
    //   res.status(200).json({
    //     code: 200,
    //     message: "上传成功",
    //     data: `http://localhost:${config.app.port}/uploads/${req.file.filename}`,
    //   });
    // }
  },
};

export default uploadController;
