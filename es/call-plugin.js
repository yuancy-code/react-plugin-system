/*
 * @Author: yuanchengyong
 * @Date: 2020-01-15 13:55:40
 * @Last Modified by: zyycy_love@126.com
 * @Last Modified time: 2020-01-16 14:39:29
 * @Des 调用插件
 */
import plugins from "./plugins";
export default function(id = "", config = {}) {
  let plugin = {};
  for (let i = 0; i < plugins.length; i++) {
    if (id === plugins[i].id) {
      plugin = plugins[i];
      break;
    }
  }
  if (!plugin.id) {
    console.warn("The plugin you called does not exist!");
    return false;
  }
  //   console.log(plugin);
  //   console.log(path.join("./sssss"));
  let path = plugin.index.replace(/^(.\/)*/g, "");
  return path;
  // let e = await import("@plugins/" + path);
  // e.default(config);
}
