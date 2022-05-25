// *this类型
class Counters {
  constructor(public count: number = 0) {}
  add() {
    this.count++
    return this
  }
  substract() {
    this.count--
    return this
  }
}

class PowCounters extends Counters {
  constructor(public count: number = 0) {
    super(count)
  }
  pow(value: number) {
    this.count = this.count ** value
    return this
  }
}

const powCounter = new PowCounters(2)

// console.log(powCounter.add().substract().pow(2).count)

// *keyof
interface PersonInfo {
  name: string
  age: number
}

let i: keyof PersonInfo
i = 'name'
i = 'age'

function getObjValue<T, U extends keyof T>(obj: T, props: U[]): T[U][] {
  return props.map((prop) => obj[prop])
}

const o = {
  name: 'lushuo',
  age: 25,
}

// console.log(getObjValue(o, ['name', 'age']))

// *[]
// 返回所有不为never的属性名
interface MyType {
  a: string
  b: number
  c: object
  d: never
  e: null
  f: undefined
}

type temp1 = MyType[keyof MyType]

// *映射类型
type ReadOnlyType<T> = {
  readonly [P in keyof T]?: T[P]
}

// ts中内置了许多内置类型，Readonly，Partial（可选）, Pick（选出部分prop组成新接口）, Record（对每个字段应用回调函数）..
// Record非同态
type Proxy<T> = {
  get(): T
  set(value: T): void
}

type Proxify<T> = {
  [P in keyof T]: Proxy<T[P]>
}

function Proxify<T>(obj: T): Proxify<T> {
  const result = {} as Proxify<T>
  for (const key in obj) {
    result[key] = {
      get: () => obj[key],
      set: (val) => (obj[key] = val),
    }
  }
  return result
}

let tempObj = {
  name: 'lushuo',
  age: 25,
}

let proxyTempObj = Proxify(tempObj)

// console.log(proxyTempObj)

// 拆包
function unProxify<T>(obj: Proxify<T>): T {
  const result = {} as T
  for (const key in obj) {
    result[key] = obj[key].get()
  }
  return result
}

let unProxyTempObj = unProxify(proxyTempObj)
// console.log(unProxyTempObj)

// 元组和promise
type MapToPromise<T> = {
  [P in keyof T]: Promise<T[P]>
}

type tuple = [number, string, boolean]

type PromiseTuple = MapToPromise<tuple>

let promiseList: PromiseTuple = [
  new Promise((resolve, reject) => resolve(0)),
  new Promise((resolve, reject) => resolve('0')),
  new Promise((resolve, reject) => resolve(true)),
]

// *unknown
// 顶级类型，相对于any来说是安全的
/**
 * 1.任何类型都可以赋值给unknown类型
 * 2.如果没有类型断言或基于控制流的类型细化时，此时unknown只能赋值给unknown和any类型，不能赋值给其他类型
 * 3.如果没有类型断言或基于控制流的类型细化时，不能对它进行任何操作
 * 4.unknown与任何其他类型组成的交叉类型&，最后都等于其他类型
 * 5.unknown与任何其他类型组成的联合类型|（除了any），最后都等于unknown类型
 * 6.never是unknown的子类型
 * 7.keyof unknown = never
 * 8.只能对unknown类型的值进行等或不等操作，不能进行其他操作
 * 9.unknown类型的值不能访问它的属性，也不能作为函数调用和作为类创建实例
 * 10.使用映射类型时，如果遍历的是unknown，则不会映射任何属性
 */
// let unknownTemp: unknown
// unknownTemp = 0

// let temp = 0
// temp = unknownTemp

// unknownTemp ++

// type Type1 = string & unknown

// type Type2 = string | unknown
// type Type3 = any | unknown

type Type4 = number extends unknown ? true : false

// type Type5 = keyof unknown

// type Type6<T> = {
//   [p in keyof T]: number
// }

// type Type7 = Type6<unknown>

// *条件类型
type Type8<T> = T extends string ? string : number

// *分布式条件类型
type TypeName<T> = T extends string
  ? string
  : T extends number
  ? number
  : T extends boolean
  ? boolean
  : T extends () => void
  ? () => void
  : object

type Type9 = TypeName<string[] | (() => void)>

type type10<T> = {
  [P in keyof T]: T[P] extends string ? P : never
}[keyof T]

interface Part {
  id: number
  name: string
  subPart: Part[]
}

type Type11 = type10<Part>

// *infer
type Type12<T> = T extends any[] ? T[number] : T
type Type13 = Type12<string[]>
type Type14 = Type12<number>

type Type15<T> = T extends Array<infer U> ? U : T // 推断出数组中元素的类型保存在U中
type Type16 = Type15<string[]>
type Type17 = Type15<number>

// *常用的内置条件类型
/**
 * 1.Exclude 选出前面的类型中后面没有的类型
 * 2.Extract 选中前面的类型中可以包含后面的类型
 * 3.NonNullable 取出联合类型中的null和undefined
 * 4.ReturnType 取出函数返回值类型
 * 5.InstanceType 获取构造函数类型的实例类型
 * type InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;
 */
type type18 = Exclude<'a' | 'b' | 'c', 'a' | 'b'>

type type19 = Extract<'a' | 'b' | 'c', 'c' | 'b'>

type Type20 = NonNullable<string | null | undefined>

type Type21 = ReturnType<() => number>
