import pkg from 'mockjs';
const { Random } = pkg;
function login(req:any) {
  const body = JSON.parse(req.body);
  let code = 200,
    msg = "登录成功";
  let data = {
    username: Random.cname(),
    token: Random.guid(),
    message: "success",
  };
  if (body.username !== "admin" || body.password !== "123456") {
    code = 201;
    msg = "错误";
    data = {};
  }
  return {
    code,
    msg,
    data,
  };
}
export default login
