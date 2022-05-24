// *继承

// es5
function Animal() {}

function Dog() {}

Dog.prototype = new Animal()
// *super
// 1.作为方法
// 只能在constructor中调用,在其他函数中调用报错
// 2.作为对象
// 在普通方法中 -》 父类的原型对象
// 在静态方法中 -》 父类本身

class Parent {
  constructor() {
    this.type = 'parent'
  }
  getName() {
    return this.type
  }
}

Parent.getType = () => {
  return 'is Parent'
}

const parent1 = new Parent()

class Child extends Parent {
  constructor() {
    super()
    console.log('constructor:', super.getName())
  }
  getParentName() {
    console.log(super.getName())
  }
  // getParentType() {
  //   console.log(super.getType())
  // }
  static getParentType() {
    console.log(super.getType())
  }
}

const child1 = new Child()
child1.getParentName()
// child1.getParentType()
Child.getParentType()

// *__proto__
// 实例的__proto__属性指向构造函数的prototype属性
var obj = new Object()
console.log(obj.__proto__ === Object.prototype)

// 继承情况：
// 子类的__proto__属性指向父类本身
console.log(Child.__proto__ === Parent)
// 子类的prototype的__proto__属性指向父类的prototype属性
console.log(Child.prototype.__proto__ === Parent.prototype)
// 实例的__proto__的__proto__属性指向父类实例的prototype属性
console.log(child1.__proto__.__proto__ === parent1.__proto__)

// *原生构造函数的继承
// Boolean, Number, String, Array, Object, Function, Date, RegExp, Error
// es5中不允许继承原生构造函数，es6可以

class CustomArray extends Array {
  constructor(...args) {
    super(...args)
  }
}

let arr = new CustomArray(3)

console.log(arr)

// *es6的类和es5构造函数的继承实现差异：
// es5: 先创建子构造函数实例的this，再将父构造函数的属性，方法添加到这个this上
// es6: 先从父类取到实例对象this，调用super之后再将子类的属性和方法加到这个this上
