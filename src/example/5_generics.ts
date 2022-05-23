// *泛型

// *单泛型
// const getArray = <T>(value: T, times: number): T[] => {
//   return new Array(times).fill(value)
// }

// *多泛型
// const getArray = <T, U>(value1: T, value2: U, times: number): [T, U][] => {
//   return new Array(times).fill([value1, value2])
// }

// *定义函数
// type GetArray = <T>(value: T, times: number) => T[]

// *接口中使用
// interface GetArray {
//   <T>(value: T, times: number): T[]
// }

// interface GetArray<T> {
//   (value: T, times: number): T[],
//   array: T[]
// }

// *泛型约束（extends）
interface ValueWithLength {
  length: number
}
const getArray = <T extends ValueWithLength>(value: T, times: number): T[] => {
  return new Array(times).fill(value.length)
}

const getProps = <T, U extends keyof T>(obj: T, prop: U) => {
  return obj[prop]
}

const testObj = {
  a: 'a',
  b: 'b',
}

// getProps(testObj, 'c') // 报错
