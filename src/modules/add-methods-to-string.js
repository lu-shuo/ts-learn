// 往全局对象上添加新方法，需要定义声明合并
String.prototype.getFirstLetter = function () {
  return this[0]
}
