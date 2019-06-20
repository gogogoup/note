# learning

#### 学习新知识的方式
* 从实际使用出发  
  - 这个东西可以用来干什么
  - 为什么可以这么做
  - 除了这个之外还可以干什么  
    
  例子就是golang的interface：  
  首先，这个是为了解决golang没有范型的缺点，实现类似动态语言的传参。  
  ```go
  type test interface{
    wow()
  }
  func SayWow(t test) {
    t.wow()
  }
  ```
  这样，SayWow的传入参数就可以是任何实现了wow的变量，可以是某个结构体，也可以是别的  
  