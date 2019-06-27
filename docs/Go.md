# Golang

[[toc]]

## 数组和切片关系
* 数组  
是一段连续的内存，定长，且长度不能更改，导致`[3]int, [4]int`是不同类型，所以使用很少
* 切片  
实际上是个结构体
```go
type slice struct {
  len int
  cap int
  array unsafe.Pointer
}
```
所以切片是包含指向底层数组的指针。同时，底层数组也可以被其他切片引用，因此修改底层数组会影响到引用它的其他切片。

## 切片作为形参
函数传入切片作为形参到底是值传递还是引用传递？  
结论：是值传递
#### 原因
* 切片是个数组片段的描述，包含指向数组的指针，片段长度，容量，也就是说，它也可以看作是个结构体，成员是len，cap和数组指针。  
* 如果用原来切片新建一个切片的话，是不会复制底层数组的，只会改变指针的位置。
* 当切片作为参数传入函数中时，应该是值传递，但是底层的数组是指向同一个数组的片段，所以直接通过索引改变底层数组的元素是会影响到实参，而获取底层数组元素的值后直接更改值，是不会影响到实参

## 切片扩容方式
切片append新的元素之后大于原来底层数组的容量时，会进行扩容。此时切片会迁移到新的内存地址，底层数组长度增加，同时为了预防再次append，增加的容量会有一定规律：  
网上的：`当原 slice 容量小于 1024 的时候，新 slice 容量变成原来的 2 倍；原 slice 容量超过 1024，新 slice 容量变成原来的1.25倍。`  
这个是不准确的，查看append的内部调用，容量不够时会调用growslice
```go
func growslice(et *_type, old slice, cap int) slice {
    // ……
    newcap := old.cap
	doublecap := newcap + newcap
	if cap > doublecap {
		newcap = cap
	} else {
		if old.len < 1024 {
			newcap = doublecap
		} else {
			for newcap < cap {
				newcap += newcap / 4
			}
		}
	}
	// ……
	
	capmem = roundupsize(uintptr(newcap) * ptrSize)
	newcap = int(capmem / ptrSize)
}
```
可以看到:
* 当增加之后的新容量的两倍a大于就容量的两倍b时，会设定新容量为a
* 当容量大于1024时，确实会增加到原来的1.25倍，但是在最后，会有roundupsize的调用，进行一次内存对齐，所以会导致新容量>=旧容量的1.25倍

## interface
   
接口是让go这个静态语言能够支持duck type，来完成动态语言形参不定义类型的写法，是编译器的一种对象推断策略。也是go解决没有范型的一种妥协？  
当函数的传入参数是个接口，只需要传入参数能实现接口定义的方法，编译器就可以通过，代码就能正常跑下去。
```go
package main

import "fmt"

func main() {
	m := Man{}
	w := Woman{}
	Wow(m)
	Wow(w)
}

type HelloOne interface {
	sayHi()
}

func Wow(h HelloOne)  {
	h.sayHi()
}

type Man struct {}
type Woman struct {}

func (Man) sayHi() {
	fmt.Println("yo bro!")
}

func (Woman) sayHi() {
	fmt.Println("hi honey!")
}
```
* 类型只要实现了接口规定的所有方法，那就认为它实现了接口，而不是像java，需要显式的声明它实现了接口
* golang其实在传入到Wow之前，就把实现了接口的变量隐式的转换成了接口变量，所以可以像其他静态类型一样做编译检查

### 底层结构
分成iface和eface，区别在于iface描述的接口包含方法，eface是空接口
![](/note/2019-06-21-13-45-55.png)
#### iface
```go
type iface struct {
	tab  *itab
	data unsafe.Pointer
}
```
内部维护两个指针  
1. tab指向itab实体，表示接口的类型以及赋给这个接口的实体类型
2. data指向接口具体的值，一般是指向堆内存的指针  

#### itab
```go
type itab struct {
	inter  *interfacetype
	_type  *_type
	link   *itab
	hash   uint32 // copy of _type.hash. Used for type switches.
	bad    bool   // type does not implement interface
	inhash bool   // has this itab been added to hash?
	unused [2]byte
	fun    [1]uintptr // variable sized
}
```
1. _type描述实体的类型，包括内存对齐方式，大小等，实际上是描述go中各种数据类型的结构体
2. inter描述了接口的类型
3. fun字段放置了和接口方法对应的具体数据类型的方法地址，实现接口调用方法的动态分派。当给接口赋值时会更新这个表。需要注意的是，fun数组的大小是1，如果接口定义了多个方法时，数组存的是第一个方法的函数指针，其他方法是在它之后的内存中继续存粗，所以是ok的  

#### interfacetype  
```go
type interfacetype struct {
	typ     _type
	pkgpath name
	mhdr    []imethod
}
```
1. _type，跟前面的相同
2. mhdr，表示接口所定义的函数列表
3. pkgpath，记录定义接口的包名  

#### _type
```go
type _type struct {
  // 类型大小
	size       uintptr
  ptrdata    uintptr
  // 类型的 hash 值
  hash       uint32
  // 类型的 flag，和反射相关
  tflag      tflag
  // 内存对齐相关
  align      uint8
  fieldalign uint8
  // 类型的编号，有bool, slice, struct 等等等等
	kind       uint8
	alg        *typeAlg
	// gc 相关
	gcdata    *byte
	str       nameOff
	ptrToThis typeOff
}
```

举例：
#### 接口变量可以储存任何实现了接口定义的所有方法的变量
```go
var r io.Reader
tty, err := os.OpenFile("/test", os.O_RDWR, 0)
if err != nil {
  return nil, err
}
r = tty
```
![](/note/2019-06-21-14-47-33.png)  
1. 声明r是io.Reader类型，是个interface（静态类型），它的动态类型是nil，动态值也是nil
2. 定义一个tty，OpenFile返回的是个file的指针，*os.File
3. r = tty，将r的动态类型变成*os.File，动态值非空，r可以用`<value, type>`表示`<tty, *os.File>`
4. r的fun中指向的方法是Read，但是储存了tty变量之后，r还具有了io.Writer接口的方法，所以
```go
var w io.Writer
w = r.(io.Writer)
```
