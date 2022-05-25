// ES6中新增的基本类型
// 标识独一无二的值

// tsconfig中lib添加es6支持
const s1 = Symbol()
const s2 = Symbol()
// console.log(s1 === s2) false

// 可以传入字符串作标识，同样标识仍然不相等
// 传入其他类型会先调用toString方法转换成字符串
// ts中只允许传入字符串或数字
const s3 = Symbol('lushuo')
const s4 = Symbol('lushuo')
// console.log(s3 === s4) false

// Symbol不能做运算

// Symbol可以转换成字符串，作布尔类型转换
s3.toString() // Symbol(lushuo)
Boolean(s3) // true
// tslint:disable-next-line: no-unused-expression
!s3 // false

// 作属性名
// 可以保证属性不被其他任何属性覆盖，只能用自身属性名修改
const s5 = Symbol('name')

const info = {
  [s5]: 'lushuo',
  age: 25,
  gender: 'male',
}
// 只能通过[]形式访问，不能使用.操作符
info[s5] = 'darren'
// info.s5 = 'darren' // 报错

// !以下方式访问不到Symbol作key的值
for (const key in info) {
  console.log(info[key])
}

Object.keys(info) // ['age', 'gender']

Object.getOwnPropertyNames(info) // ['age', 'gender']

JSON.stringify(info) // {"age":25,"gender":"male"}

// *下面方法可以获取到Symbol属性
Object.getOwnPropertySymbols(info) // [Symbol(name)]

Reflect.ownKeys(info) // ['age', 'gender', Symbol(name)]

// Symbol的方法
// Symbol.for()
// 会在当前页面,iframe，service worker中寻找是否已经用此参数创建过Symbol,如果有，就创建索引
const s6 = Symbol.for('lushuo')
const s7 = Symbol.for('lushuo')
// console.log(s6 === s7) // true

// Symbol.keyFor()
// 返回通过Symbol.for创建的Symbol的标识
Symbol.keyFor(s6) // lushuo

// *11个内置的Symbol值
// 1.Symbol.hasInstance
// 当使用instanceof obj时就会调用通过Symbol.hasInstance作key的方法
// const obj1 = {
//   [Symbol.hasInstance](otherObj) {
//     console.log(otherObj)
//   },
// }

// console.log({ a: 'a' } instanceof <any>obj1)

// 2.Symbol.isConcatSpreadable
// 将数组的此属性设置为false，数组在concat中将不会被扁平化
// 默认为undefined，和true的效果相同
// let arr = [1, 2]
// arr[Symbol.isConcatSpreadable] = false
// console.log([].concat(arr, [3, 4]))

// 3.Symbol.species 指定创建衍生对象的构造函数

// 4.Symbol.match

let obj3 = {
  [Symbol.match](string) {
    console.log(string.length)
  },
}

'abcde'.match(<RegExp>obj3) // 5

// 5.Symbol.replace

// 6.Symbol.search

// 7.Symbol.split

// 8. Symbol.iterator
const iterator = arr[Symbol.iterator]()
console.log(iterator, iterator.next()) // {value: 1, done: false}

// 9.Symbol.toPrimitive
let obj4: unknown = {
  [Symbol.toPrimitive](type) {
    console.log(type)
  },
}

// const res = (obj4 as number)++ // number
const res = `abc${obj4}` // ts中：default，js中：string

// 10. Symbol.toStringTag
// 指定调用对象toString方法时调用的函数
let obj5 = {
  [Symbol.toStringTag]: 'lushuo',
}

console.log(obj5.toString()) // [object lushuo]

// 11.Symbol.unscopables
// 指定在使用with操作对象时从对象上过滤掉的属性
// const obj7 = {
//   a: 'a',
//   b: 'b',
// }
// with (obj7) {
//   console.log(a)
// }
console.log(Array.prototype[Symbol.unscopables])
