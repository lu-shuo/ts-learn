// 引入tslint
// tslint --init
interface Vegetable {
  color?: string
  type: string
  [prop: string]: any
}

const getVegetables = ({ color, type }: Vegetable) => {
  return `A ${color ? color + ' ' : ''}${type}`
}

console.log(getVegetables({ type: 'tomato', color: 'yellow', size: 'large' }))

// *绕过多余属性检测方式：
// 1. 类型断言
// 2. ?可选字段
// 3. 类型兼容性：a赋值给b，则b中的属性a中必须都有，多了无所谓

// *只读
interface Persion {
  readonly name: string
}
// 数组
interface ArrInter {
  0: number
  readonly 1: string
}

let arr: ArrInter = [0, '1']

// *定义函数的接口,建议使用类型别名type
type AddFunc = (a: number, b: number) => number

// *定义对象的索引
interface RoleDict {
  [id: number]: string
}

const obj: RoleDict = {
  0: 'Admin',
}

// js中，数字索引会被自动转化为字符串，所以字符串类型的key也可以用数字
interface RoleDict1 {
  [id: string]: string
}

const obj1: RoleDict1 = {
  0: 'Admin',
  '1': 'User',
}

// *接口继承
interface Animal {
  name: string
  eat: () => string
}

interface Dog extends Animal {
  type: string
}

const dog: Dog = {
  name: '大狼狗',
  type: 'dobin',
  eat: () => {
    return '吃饭'
  },
}

// *混合类型接口
interface Counter {
  (): void
  count: number
}

const getCounter = (): Counter => {
  const c = () => {
    c.count++
  }
  c.count = 0
  return c
}
const counter: Counter = getCounter()

counter()
console.log(counter.count)

counter()
console.log(counter.count)

counter()
console.log(counter.count)
