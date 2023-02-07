/**
 * mock
 */
export default {
  // 支持自定义函数，API 参考 express@4
  'POST /api/login': (req, res) => {
    if (req.body.username === 'yarh' && req.body.password === '123456') {
      res.send({ ok: 1 });
    } else {
      res.send({ ok: 0 });
    }
  },
};
