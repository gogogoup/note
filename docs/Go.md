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