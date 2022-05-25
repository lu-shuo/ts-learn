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

// *类型断言
// 下面函数中执行到函数addPrefix时n一定不为null，可以使用!作类型断言
function genNumString(n: number | null) {
  function addPrefix(prefix: string) {
    return prefix + n!.toFixed().toString
  }
  n = typeof n === 'number' ? n : 0.1
  return addPrefix('prefix-')
}

// *类型别名type
type TypeString = string
let temp1: TypeString
// 使用泛型
type Position<T> = {
  x: T
  y: T
}
let position: Position<number> = {
  x: 0,
  y: 0,
}
// 引用自身(树形解构)，只可以在对象属性中引用自己
type Childs<T> = {
  current: T
  child?: Childs<T>
}
let temp2: Childs<number> = {
  current: 0,
  child: {
    current: 1,
    child: {
      current: 2,
    },
  },
}

// *type和interface
// 1.type和interface是类型兼容的
type Alias = {
  num: number
}

interface AliasInterface {
  num: number
}

let temp3: Alias = { num: 1 }
let temp4: AliasInterface = { num: 2 }
temp3 = temp4

// 2.使用场景
// 被定义的类型要用于拓展（extends）使用interface

// *字面量类型
// 字符串字面量类型
type Lname = 'lushuo'
let temp5: Lname = 'lushuo'

type Direction = 'north' | 'west' | 'east' | 'south'
let direction: Direction = 'east'
// 数字字面量类型
type Age = 18

// *枚举成员作类型（见8_enum.ts）

// *可辨识联合两要素
/**
 * 1.具有普通的单例类型属性
 * 2.一个类型别名包含了哪些类型的联合
 */

interface Square {
  kind: 'Square'
  size: number
}

interface Rectangle {
  kind: 'Rectangle'
  width: number
  height: number
}

interface Circle {
  kind: 'Circle'
  radius: number
}

type Shape = Square | Rectangle | Circle

function assertNever(value: never): never {
  throw new Error('Unexpected Object' + value)
}

function getArea(s: Shape): number {
  switch (s.kind) {
    case 'Square':
      return s.size ** 2
      break
    case 'Rectangle':
      return s.width * s.height
      break
    case 'Circle':
      return Math.PI * s.radius ** 2
      break
    default:
      assertNever(s) // 完整性检查
  }
}
