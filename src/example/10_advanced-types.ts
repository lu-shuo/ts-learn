// *交叉类型
const mergeFunc = <T, U>(arg1: T, arg2: U): T & U => Object.assign(arg1, arg2)

// *联合类型
const getLengthFunc = (arg: number | string): number =>
  typeof arg === 'string' ? arg.length : arg.toString().length

// *类型保护
// 常用在运行时才能确定其类型的情况下
const getRandomRes = (): number | string => (Math.random() > 0.5 ? 'ok' : 0)

// 1. 函数类型保护
function isString(value: string | number): value is string {
  return typeof value === 'string'
}

const result = getRandomRes()

// if (isString(result)) {
//   console.log(result.length)
// } else {
//   console.log('number result')
// }

// 2. typeof类型保护
// 在判断逻辑简单的情况下，且要判断的类型是number/string/boolean/symbol时可以直接使用typeof类型保护
// typeof结果只能使用等或不等号判断，不能使用include等其他方式
if (typeof result === 'string') {
  console.log(result.length)
} else {
  console.log('number result')
}

// 3.instanceof类型保护
class Creator1 {
  public name: string = 'lushuo'
  constructor() {}
}

class Creator2 {
  public age: number = 25
  constructor() {}
}

const getRandomItem = () =>
  Math.random() > 0.5 ? new Creator1() : new Creator2()

const item1 = getRandomItem()

if (item1 instanceof Creator1) {
  console.log(item1.name)
} else {
  console.log(item1.age)
}

// *null/undefined
// ts中null和undefined是任何类型的子类型
// 在不开启strictNullChecks的情况下，null/undefined可以赋值给任何类型的值
// let t = 0
// t = null
// t = undefined
// 开启strictNullChecks后，可选参数会被自动推断为包含undefined的联合类型
const sumFunc = (x: number, y?: number) => x + (y || 0)
