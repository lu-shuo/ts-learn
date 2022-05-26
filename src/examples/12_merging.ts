// *接口
interface InfoInter {
  name: string
  getRes(text: string): number
}

interface InfoInter {
  // name: number // 后续属性声明必须属于同一类型。
  age: number // 不同的后续属性会合并
  getRes(text: number): string // 重复的函数类型声明会合并为函数重载
}

let info_12: InfoInter = {
  name: 'lushuo',
  age: 25,
  getRes(text: any): any {
    if (typeof text === 'string') return text.length
    return text.toString()
  },
}

// *命名空间
// 重名的命名空间会被合并
namespace Validation {
  const isLetterReg = /^[A-Za-z]+$/
  export const checkLetter1 = () => {}
}

namespace Validation {
  // console.log(isLetterReg) // 没有使用export导出的变量在同名命名空间里是拿不到的
  export const checkNumber1 = () => {}
}

// 命名空间和同名的不同类型之间的合并
/**
 * 1.类：类的定义必须在命名空间之前，合并的结果为一个以命名空间导出内容为静态属性的类
 * 2.函数：函数的定义必须在命名空间之前，命名空间导出的变量会加到函数定义上
 * 3.枚举：先后顺序没有要求，命名空间可以拓展枚举，但不会添加反向映射
 */
// 类
class Validations {
  constructor() {}
  public checkType() {}
}

namespace Validations {
  export const isLetterReg = /^[a-zA-Z]+$/
}

console.dir(Validations)

// 函数
function countUp() {
  countUp.count++
}

namespace countUp {
  export let count = 0
}

// 枚举
enum Colors {
  red,
  green,
  blue,
}

namespace Colors {
  export const yellow = 3
}

console.log(Colors)
