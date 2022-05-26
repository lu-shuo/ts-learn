import '../modules/add-methods-to-string.js'

// *为全局对象添加属性要定义声明合并
const str: string = 'lushuo'
console.log(str.getFirstLetter())

// *全局库添加声明文件
// global.d.ts
setTitle('ts-learn')
console.log(getTitle())
console.log(initDocumentTitle)
