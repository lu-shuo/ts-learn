// *promise
interface MyResponse {
  code: number
  data: {
    [key: string]: any
  }
}
interface LoginParam {
  userName: string
  password: string
}
namespace axios {
  export function post(url: string, params: object): Promise<MyResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const res: MyResponse = { code: 0, data: {} }
        if (
          url === '/login' &&
          (params as LoginParam).userName === 'lushuo' &&
          (params as LoginParam).password === '123456'
        ) {
          res.data.userId = 111
        } else {
          res.data.role = 'Admin'
        }
        resolve(res)
      }, 1000)
    })
  }
}

async function login({ userName, password }: LoginParam) {
  try {
    const res1 = await axios.post('/login', { userName, password })
    if (res1.data.userId) {
      const res2 = await axios.post('/role', { userId: res1.data.userId })
      console.log(res2.data.role)
    }
  } catch (err) {
    throw new Error(err)
  }
}

login({
  userName: 'lushuo',
  password: '123456',
})

// *动态导入表达式
async function getTime(format: string) {
  const moment = await import('moment')
  return moment.default().format(format)
}

getTime('L').then(console.log)

// *弱类型探测
// 弱类型：内部都是可选属性的类型
interface WeakInter {
  name?: string
  age?: number
}

let myObj = {
  sex: 'male',
}

function printInfo(info: WeakInter) {
  console.log(info)
}

printInfo(myObj as WeakInter)

// *泛型中使用拓展运算符
function getExcludeProps<T extends { name: string }>(obj: T) {
  const { name, ...res } = obj
  return res
}

console.log(
  getExcludeProps({
    name: 'lushuo',
    age: 25,
    sex: 'male',
  })
)
