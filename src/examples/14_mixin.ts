// *混入
/**
 * 1.对象的混入
 * 2.类的混入
 */
// 对象混入
interface ObjectA {
  a: string
}

interface ObjectB {
  b: string
}

let Aa: ObjectA = {
  a: 'a',
}

let Bb: ObjectB = {
  b: 'b',
}

let AB: ObjectA & ObjectB = Object.assign(Aa, Bb)

// 类的混入
function mixins(base: any, from: any[]) {
  from.forEach((item) => {
    Object.getOwnPropertyNames(item.prototype).forEach((key) => {
      base.prototype[key] = item.prototype[key]
    })
  })
}

class ClassA {
  public isA: boolean
  public funcA() {}
}

console.log(ClassA)
class ClassB {
  public isB: boolean
  public funcB() {}
}

class ClassAB implements ClassA, ClassB {
  public isA: boolean
  public isB: boolean
  public funcA: () => void
  public funcB: () => void
  constructor() {}
}

mixins(ClassAB, [ClassA, ClassB])

const ab = new ClassAB()

console.log(ab)
