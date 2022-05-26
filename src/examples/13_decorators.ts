// *装饰器
// 实验特性，需要在tsconfig中打开experimentalDecorators
// !装饰器不能用在.d.ts文件和declare中
// !生产环境尽量不要使用

// function setName(target) {
//   console.log('setName', target)
// }

// 装饰器工厂（返回一个装饰器函数）
// function setAge() {
//   console.log('setAge')
//   return (target) => {
//     console.log('setAge', target)
//   }
// }

// *执行顺序
// 如果有装饰器工厂函数，先从上到下依次执行装饰器工厂，再从下往上执行装饰器
// @setName
// @setAge()
// class ClassDec {}

// *类中装饰器的求值顺序
/**
 * 1.参数、方法、访问符、属性装饰器应用到每个实例成员上
 * 2.参数、方法、访问符、属性装饰器应用到每个静态成员上
 * 3.参数装饰器应用到构造函数上
 * 4.类装饰器应用到类上
 */
// let sign

// function setName(name) {
//   return (target: new () => any) => {
//     sign = target
//     console.log(target.name)
//   }
// }

// @setName('lushuo')
// class ClassDec {}

// console.log(sign === ClassDec)
// console.log(sign === ClassDec.prototype.constructor)

// 1.类装饰器
// function classDecorator<T extends new (...args: any[]) => {}>(target: T): any {
//   return class extends target {
//     public newProperty = 'new Property'
//     public hello = 'override'
//   }
// }

// @classDecorator
// class Greeter {
//   public property: string = 'property'
//   public hello: string = 'hello'
//   constructor(h: string) {
//     this.hello = h
//   }
// }

// console.log(new Greeter('world'))

// 2.方法装饰器(使用环境大于es5)
// 参数：
/**
 * 装饰静态成员：类的构造函数 / 装饰实例成员：类的原型对象
 * 成员名字
 * 属性描述符（configuration/writable/enumable）
 */
// function enumerable(bool: boolean) {
//   return (
//     target: any,
//     propertyName: string,
//     descriptor: PropertyDescriptor
//   ) => {
//     console.log(target, propertyName)
//     descriptor.enumerable = bool
//     // return {
//     //   value() {
//     //     return 'override age'
//     //   },
//     //   enumerable: bool
//     // }
//   }
// }
// class ClassF {
//   constructor(public age: number) {}
//   @enumerable(false)
//   public getAge() {
//     return this.age
//   }
// }

// const c = new ClassF(25)
// console.log(c)

// 3.访问器装饰器
// function enumerable(bool: boolean) {
//   return (
//     target: any,
//     propertyName: string,
//     descriptor: PropertyDescriptor
//   ) => {
//     console.log(target, propertyName)
//     descriptor.enumerable = bool
//   }
// }

// class ClassG {
//   private __name: string
//   constructor(name: string) {
//     this.__name = name
//   }
//   @enumerable(true)
//   get name() {
//     return this.__name
//   }
//   set name(val) {
//     this.__name = val
//   }
// }

// const c = new ClassG('lushuo')
// for (const key in c) {
//   console.log(key)
// }

// 4.属性装饰器
// function printPropertyName(target: any, propertyName: string) {
//   console.log(propertyName)
// }

// class ClassP {
//   @printPropertyName
//   public name: string
// }

// 5.参数装饰器
function required(target: any, propertyName: string, index: number) {
  console.log(`修饰的是${propertyName}的第${index + 1}个参数`)
}

class ClassI {
  public name: string = 'lushuo'
  public age: number = 25
  public getInfo(prefix: string, @required infoType: string): string {
    return prefix + ' ' + this[infoType]
  }
}

const item = new ClassI()
console.log(item.getInfo('hihi', 'name'))
