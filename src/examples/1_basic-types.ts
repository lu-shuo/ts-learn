// *布尔boolean
let bool: boolean = true

// *数值
let num: number = 123
num = 0b111 // 二进制
num = 0o173 // 八进制
num = 0x7b // 十六进制

// *字符串
let str: string = 'abc'
str = `数值位：${num}`

// *数组
let arr1: number[] = [1, 2, 3]
let arr2: Array<number> = [1, 2, 3]
let arr3: (number | string)[] = ['1', 2, 3]

// *元组
// 固定长度，固定类型
let tuple: [string, number, boolean] = ['1', 2, true]

// *枚举
// 不指定从0开始，指定从指定值开始
// var Roles;
// (function (Roles) {
//     Roles[Roles["SUPER_ADMIN"] = 0] = "SUPER_ADMIN";
//     Roles[Roles["ADIMN"] = 1] = "ADIMN";
//     Roles[Roles["USER"] = 2] = "USER";
// })(Roles || (Roles = {}));
enum Roles {
  SUPER_ADMIN,
  ADIMN = 1,
  USER = 2,
}

console.log(Roles.ADIMN, Roles[0])

// *any
// 是任何类型的子类型
// 编写代码时无法获取准确类型的情况
// 不建议使用，万不得已的时候可以用
let value: any

// *void
// 什么类型都不是，空
// 函数没有返回值的情况，js中函数没有返回值返回undefined
// void类型的值可以被赋给undefined或null
const printFunc = (str: string): void => {
  console.log(str)
}

let v: void
v = undefined
// v = null // 需要关闭严格类型检查

// *undefined和null
// 在js中两者都为基础数据类型，在ts中两者既是值又是数据类型
let u: undefined = undefined
let n: null = null
// 两者为其他类型的子类型，可以被赋给任何其他类型的值（需要关闭严格类型检查）
// num = u
// num = v

// *never
// 抛错或者死循环函数
// never是任意类型的子类型，没有任何类型是其它类型的子类型
const errorFunc = (message: string): never => {
  throw new Error(message)
}

const infiniteFunc = (): never => {
  while (true) {}
}

// *object
function consoleObject(obj: object) {
  console.log(obj)
}

// *类型断言
// jsx中只能使用as
const getLength = (target: string | number): number => {
  if ((target as string).length || (target as string).length === 0) {
    return (target as string).length
  } else {
    return target.toString().length
  }
}
