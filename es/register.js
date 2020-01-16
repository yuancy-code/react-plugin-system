/*
 * @Author: yuanchengyong
 * @Date: 2020-01-15 09:48:43
 * @Last Modified by: zyycy_love@126.com
 * @Last Modified time: 2020-01-16 14:31:41
 * @Des 插件注册
 */
import plugins from "./plugins";

const findIndex = (array = [], fun = () => {}) => {
  let index = -1;
  for (let i = 0; i < array.length; i++) {
    if (fun(array[i])) {
      index = i;
      break;
    }
  }
  return index;
};
/**
 * 单插件注册方法
 * @param {Object} config 插件配置
 */
const register = config => {
  if (Object.prototype.toString.call(config) !== "[object Object]") {
    console.warn("Plugin config does not exist!");
    return false;
  }
  const id = config.id;
  if (!id) {
    console.warn("Id of plugin config is required!");
    return false;
  }
  const index = findIndex(plugins, function(o) {
    return o.id === id;
  });
  if (index > -1) {
    console.warn(`Plugin id "${id}" already exist!`);
    return false;
  }
  plugins.push(config);
};
export { register };
