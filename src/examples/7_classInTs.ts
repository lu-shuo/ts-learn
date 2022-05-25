// *修饰符
// public 类的实例中可以访问
// private 类之外不可以访问
// protected 在继承该类的子类中可以访问

class Point {
  private x: number
  private y: number
  // !constructor用protected后，这个类将不能创建实例，只能由子类继承
  protected constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
  protected getPosition() {
    return `(${this.x}, ${this.y})`
  }
}

class ChildPoint extends Point {
  constructor(x: number, y: number) {
    super(x, y)
    // !通过super只能访问基类的公共方法和受保护方法
    // console.log(super.x, super.getPosition)
  }
}

// const point = new ChildPoint(1, 2)

// console.log(point, point.getPosition())

// *readonly
class UserInfo {
  public readonly name: string
  constructor(name: string) {
    this.name = name
  }
}

// *constructor参数修饰符，简化书写过程，指定参数类型并将参数放到实例上
// class A {
//   constructor(public readonly a: string) {}
// }

// *静态属性和方法
class SClass {
  public static x: number = 0
  public static getX() {
    return SClass.x
  }
}

// *可选属性 ?
class User {
  public name: string
  public age?: number
  constructor(name: string, age?: number, public sex?: number) {
    this.name = name
    this.age = age
  }
}

// const oP = new OptionalUserInfo('lushuo')
// console.log(oP)

// *存取器
class Admin {
  public name: string
  public age?: number
  private __permission: string
  constructor(name: string, age?: number, public sex?: number) {
    this.name = name
    this.age = age
  }
  get adminPermission() {
    return this.__permission
  }
  set adminPermission(value) {
    console.log('set permission:', value)
    this.__permission = value
  }
}

// *抽象类
// 用来被其他类继承，不能用来创建实例
abstract class Person {
  public name: string
  constructor(name: string) {
    this.name = name
  }
  public abstract printName(): void
}

class Man extends Person {
  constructor(name: string) {
    super(name)
  }
  public printName(): void {
    console.log(this.name)
  }
}
// const p = new Person('lushuo') // 无法创建抽象类的实例
const m = new Man('lushuo')
m.printName()

// abstract不仅可以修饰类和类中方法，还可以修饰类中的属性和存取器
// abstract class People {
//   public abstract __name: string
//   abstract get insideName()
//   abstract set insideName(value: string) // 存取器不能定义返回值类型
// }

// class P extends People {
//   public __name: string
//   get insideName(): string {
//     return this.__name
//   }
//   set insideName(value: string) {
//     this.__name = value
//   }
// }

// *类在ts中也是实例的类型，但不能通过类型来判断实例是否是这个类的实例，要用instanceof
class People {
  constructor(public name: string) {
    this.name = name
  }
}

let p
p = new People('lushuo') // 此时p的类型就是People

class Animal {
  constructor(public name: string) {
    this.name = name
  }
}
p = new Animal('lushuo') // 内部相同的类也可以复制给同样的变量

// *类的接口
interface FoodInterface {
  type: string
}
// 实现接口的类的实例上必须包含接口中定义的属性和方法
class Food implements FoodInterface {
  public type: string
}

// *接口也可以继承类
// 接口会继承类的成员及其类型，包括private和protected修饰的成员
class A {
  protected name: string
}

interface I extends A {}

class B extends A implements I {
  public name: string
}

// *在泛型中使用类类型
const create = <T>(c: new () => T): T => {
  return new c()
}

class Infos {
  public name: string
  constructor() {
    this.name = 'lushuo'
  }
}

const infos = create<Infos>(Infos)

console.log(infos)
