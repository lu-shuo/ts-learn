let add: (x: number, y: number) => number

add = (arg1: number, arg2: number) => arg1 + arg2

type Add = (x: number, y: number) => number

const addFunc: Add = (arg1: number, arg2: number) => arg1 + arg2

// *可选参数
// 必须位于必选参数后面
type AddFunc1 = (x: number, y: number, c?: number) => number

let addFunc1: AddFunc1

addFunc1 = (arg1: number, arg2: number) => arg1 + arg2
addFunc1 = (arg1: number, arg2: number, arg3: number) => arg1 + arg2 + arg3

// *默认参数
addFunc1 = (arg1: number, arg2 = 2) => arg1 + arg2

// *剩余参数
const handleData = (arg1: number, ...args: number[]) => {
  // ...
}

// *重载
function handleData1(x: number): number[]
function handleData1(x: string): string[]
function handleData1(x: any): any {
  if (typeof x === 'number') {
    return x
      .toString()
      .split('')
      .map((i) => Number(i))
  } else {
    return x.split('')
  }
}

console.log(handleData1(1234))
console.log(handleData1('1234'))
