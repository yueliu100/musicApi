import musicApi from "./app";
/**
 *
 * @param {*}
 * funcName:musicApi提供的函数，必填
 * vender:音乐渠道，非必填
 */
export default async function (funcName,vender, ...args) {
  const error_param = {
    code: 42200,
    msg: "请求参数错误"
  };
  const venders = ['netease', 'qq', 'xiami'];
  let rs;
  if (!Object.keys(musicApi).includes(funcName) || !funcName||typeof funcName!=="string") {
    return error_param;
  } else if (!vender) {
    debugger
    rs = await musicApi[funcName](...args);
  } else {
    debugger
    rs = await musicApi[vender][funcName](...args);
  }
  return rs;
}