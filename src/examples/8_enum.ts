// *数字枚举
const index = 0

function getIndex() {
  return 1
}
enum Status {
  Success = index, // *如果值使用常量或者函数初始化，则下面的值必须初始化
  Error = getIndex(),
  Warning = 2,
}

console.log(Status)
console.log(Status.Success)
console.log(Status.Error)
console.log(Status.Warning)

// *字符串枚举
enum Message {
  Success = 'Hoho. success!',
  Failed = 'Sorry!',
  Warning = Failed,
}

console.log(Message)

// *异构枚举
// !不建议使用
enum Result {
  Failed = 0,
  Success = 'Hoho. success!',
}

// *枚举成员作类型
// 满足以下条件：1. enum E { A } 2. enum E { a = 'a' } 3. enum E = { a = 0 }
enum BookType {
  Science,
  Computer,
}

interface ScienceBook {
  type: BookType.Science
}

const book1: ScienceBook = {
  type: BookType.Science,
}

// *枚举作联合类型
interface Book {
  type: BookType
}

const book2: Book = {
  type: BookType.Computer,
}

// *const 枚举
const enum Code {
  success = 0,
  fail = 1,
}
// 不会编译成对象，会直接替换值到代码中
