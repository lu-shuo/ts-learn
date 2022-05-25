// *类型推断和类型兼容性
let name_9 = 'lushuo' // string

let arr_9 = [0, '1'] // (string | number)[]

// 上下文推断
// window.onmousedown = (event) => {
//   console.log(event)
// }

// *接口兼容性
interface Info9 {
  name: string
  info?: {
    age: number
  }
}
// 初始化时赋值需要一一对应
// 递归检测
// let info_9: Info9 = {
//   name: 'lushuo',
//   info: {
//     age: 25,
//   },
// }

// let info_9

// const tempInfo = { name: 'lushuo', sex: 'male' }

// info_9 = tempInfo // 赋值给已存在的变量则只要包含接口中所有的属性

// *函数的兼容性
// *函数参数
// 1.参数个数
// let x = (a: number) => 0
// let y = (b: number, c: number) => 0

// x = y // 报错
// y = x // 不报错。即只能将参数小于等于当前函数的函数赋值给当前函数的变量

// 2.参数类型
// let x = (a: number) => 0
// let y = (b: string) => 0
// y = x // 报错。参数类型要保持一致

// 3.可选参数和剩余参数
// 剩余参数可以传入任意个参数，类型需要对应
// const getSum = (arr: number[], callback: (...args: number[]) => number) => {
//   return callback(...arr)
// }

// const res1 = getSum([1, 2, 3], (...args) => args.reduce((a, b) => a + b, 0))
// const res2 = getSum([1, 2, 3], (arg0, arg1, arg2) => arg0 + arg1 + arg2)
// console.log(res1, res2)

// 4.函数参数双向协变
// let func1 = (a: number | string): void => {}

// let func2 = (a: number): void => {}

// func1 = func2
// func2 = func1

// *函数返回值
// let func1 = (): (number | string) => 0
// let func2 = (): string => '0'
// let func3 = (): boolean => true

// func1 = func2
// func2 = func1
// func3 = func1

// *函数重载
// function func1(a: number, b: number): number
// function func1(a: string, b: string): string
// function func1(a: any, b: any) {
//   return a + b
// }

// function func2(a: number, b: number): number
// function func2(a: any, b: any) {
//   return a + b
// }

// let temp = func1
// temp = func2

// *枚举兼容性
// enum Test {
//   Ok,
//   Fail
// }

// enum Test1 {
//   Success,
//   Fail
// }

// let temp = Test.Ok
// temp = 1 // 数字枚举类型与数字类型兼容
// temp = Test1.Success // 不同枚举不兼容

// *类的实例的兼容性
// 类作为类型时，ts只会比较实例的属性和属性类型，而不会去比较类上的静态属性
// class AnimalClass {
//   public static age: number
//   constructor(public name: string) {}
// }

// class PeopleClass {
//   public static age: string
//   constructor(public name: string) {}
// }

// class FoodClass {
//   constructor(public name: number) {}
// }

// let animal: AnimalClass
// let people: PeopleClass
// let food: FoodClass

// animal = people
// animal = food

// *类的私有属性和被保护属性对兼容性的影响
// class ParentClass {
//   private age: number
//   constructor() {}
// }

// class ChildClass extends ParentClass {
//   constructor() {
//     super()
//   }
// }

// class OtherClass {
//   private age: number
//   constructor() {}
// }

// const children: ParentClass = new ChildClass() // 只有子类创建的实例可以赋值给父类类型的变量
// const other: ParentClass = new OtherClass()

// *泛型兼容性
// interface Data<T> {}

// let data1:Data<number>
// let data2:Data<string>

// data1 = data2 // 可以赋值

// interface Data<T> {
//   no: T
// }

// let data1:Data<number>
// let data2:Data<string>

// data1 = data2 // 不可以赋值

// 泛型类型只会影响到使用到泛型的地方
