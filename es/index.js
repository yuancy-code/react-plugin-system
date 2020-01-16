/*
 * @Author: yuanchengyong
 * @Date: 2020-01-15 09:37:38
 * @Last Modified by: zyycy_love@126.com
 * @Last Modified time: 2020-01-16 16:15:41
 * @Des 插件系统核心
 */
import plugins from "./plugins";
// import Plugin from "./plugin.jsx";
import { register } from "./register";
import callPlugin from "./call-plugin";
import Plugin from "./plugin.jsx";
export {
  plugins, // 插件列表
  callPlugin, // 调用插件
  register, // 单插件注册
  Plugin // 插件组件
};
