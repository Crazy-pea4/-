import UploadController from "../@types/controller/upload";

/* 引入upload模型 */
import uploadModel from "../model/upload";

/* 引入config文件 */
import config from "../config/index";

const uploadController: UploadController = {
  upload: (req, res, next) => {
    if (req.file) {
      res.status(200).json({
        code: 200,
        message: "上传成功",
        data: `http://localhost:${config.app.port}/uploads/${req.file.filename}`,
      });
    }
  },
};

export default uploadController;
