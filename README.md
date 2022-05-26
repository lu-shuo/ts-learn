# typescript 学习笔记

## 目录

- [x] 1.基础类型
- [x] 2.Symbol
- [x] 3.接口
- [x] 4.函数
- [x] 5.泛型
- [x] 6.类
- [x] 7.ts 中的类
- [x] 8.枚举类型
- [x] 9.类型推断和类型兼容性
- [x] 10.高级类型-1
- [x] 11.高级类型-2
- [x] 12.声明合并
- [x] 13.装饰器
- [x] 14.混入
- [x] 15.更新
- [x] 16.声明文件

## 声明文件

### 识别库的类型

#### 通过使用方式判断

1. 仅能通过 script 标签引入并全局使用的库为全局库（目前很少有单纯的全局库，可以通过工具方便的转换为 umd 库）
2. 既能通过 script 标签引入又能通过 import/require 引入的库为 umd 库
3. 通过 require/import 引用的库为模块化库

#### 通过源码判断

1. 往 window 上挂载一些全局属性的可能为全局库
2. 代码中存在判断模块加载器的代码，比如`define !== undefined`，`module && module.exports`，一般为 umd 库

### 添加声明文件

#### 安装社区声明文件

```
npm install @types/模块名 -D
```

可以安装成功则说明有社区声明文件，可以直接使用

#### 手动添加声明文件

[声明文件模板](https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html)

1. global.d.ts 全局库模板
2. module.d.ts 模板引入之后既不是函数也不是类
3. module-class.d.ts 模块引入之后可以当作类调用
4. module-function.d.ts 模块引入之后可以当作函数调用
5. module-plugin.d.ts

#### 定义声明文件时加载其他库的声明

```
///<refrence types="moment" />
```

模块库可以直接引入：

```
import * as moment from 'moment'
```

#### 快捷外部模块声明

```
// types/moment/index.d.ts

declare module 'moment'
```
