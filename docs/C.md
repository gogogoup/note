# C

[[toc]]

## 程序结构
* 预处理器指令
* 函数
* 变量
* 语句&表达式
* 注释

## 基本语法
* 令牌
* 分号
* 注释
* 标识符
* 关键字
* 空格

## 数据类型
* 基本类型   
  是算术类型
  * 整数类型
    * char  
    一个字节，八位
    * unsigned char
    * signed char
    * int  
    2/4个字节，16/32位，取决于系统位数
    * unsigned int
    * short
    * unsigned short
    * long
    * unsigned long
  * 浮点类型
    * float  
      单精度浮点值，4个字节，32位：1位符号，8位指数，23位小数  
      ![float](/note/2019-06-13-14-29-23.png)
    * double  
      双精度浮点数，8个字节，64位：1位符号，11位指数，52位小数  
      ![](/note/2019-06-13-14-34-06.png)
    * long double
* 枚举类型  
  也是算术类型，定义程序中只能赋予一定的离散的整数值的变量
* void类型  
  没有可用的值
* 派生类型
  * 指针类型
  * 数组类型
  * 结构类型
  * 共用体类型
  * 函数类型

## 变量
* 变量定义
  ```
  type variable_list;
  type variable_name = value;
  ```
* 变量声明  
  变量的声明和定义是可以分开的，如果希望只声明而不定义，可以使用关键字extern进行声明  
  ```c
  extern int i; // 声明但不定义，可以在别的文件中定义。用于在当前文件引用其他文件中定义的变量
  int i;  // 声明，同时也定义
  ```
* 左值和右值

## 常量
* 常量又叫字面量
* 整数常量
  * 前缀
    * 0x：十六进制
    * 0：八进制
    * 不带前缀：十进制
  * 后缀
    * u/U：无符号整数
    * l/L：长整数
  ```c
  85         /* 十进制 */
  0213       /* 八进制 */
  0x4b       /* 十六进制 */
  30         /* 整数 */
  30u        /* 无符号整数 */
  30l        /* 长整数 */
  30ul       /* 无符号长整数 */
  ```
* 浮点常量
  * 小数形式
    * 包含整数部分，小数点，小数部分
  * 指数形式
    * 小数点，指数
* 字符常量
  * 括在单引号中
* 字符串常量
  * 括在双引号中
* 定义常量
  * #define 预处理器
  ```
  #define identifier value
  ```
  * const 关键字
  ```
  const type variable = value;
  ```

## 存储类
* auto
  * 局部变量的默认存储类，只能用在函数内
* register
  * 存储在寄存器而不是ram中的局部变量，变量最大尺寸等于寄存器的大小，没有内存位置
  * 只用于需要快速访问的变量，比如计数器
* static
  * 指示编译器在程序生命周期内保持局部变量的存在，不需要在进入和离开作用域的时候创建/销毁
  * 主要用于当前文件内的全局变量储存类
* extern
  * 提供一个全局变量的引用，对所有程序文件都是可见的
  * 通常用于两个或多个文件共享相同的全局变量或函数时

## 运算符
* 算术运算符  
  `+，-，*，/，%，++，--`
* 关系运算符  
  `==，!=，>, <, >=, <=`
* 逻辑运算符  
  `&&, ||, !`
* 位运算符  
  `&, |, ^, <<, >>`  
  位与，位或，异或，二进制左移，二进制右移
* 赋值运算符  
  `=, +=, -=, *=, /=, %=, <<=, >>=, &=, ^=, |=`
* 杂项运算符  
  `sizeof(), &, *, ?:(三元)`
* 运算符优先级

## 判断
* if/if...else.../switch
* 三元运算符

## 循环
* while
* for
* do...while...
* 嵌套循环
* 循环控制语句
  * break
  * continue
  * goto

## 函数
* 定义
  ```
  return_type function_name (parameter list)
  {
    body of the function
  }
  ```
* 函数声明
  * 函数声明是告诉编译器函数名称和如何调用函数，主体可以单独定义
  ```c
  int max(int num1, int num2)
  int max(int int)
  ```
* 函数调用
* 函数参数
  * 传值调用：把参数的实际值复制给函数的形参，修改形参不影响实际参数
  * 引用调用：通过指针传递，形参是指向实际参数的指针，修改形参会影响实际参数

## 作用域规则
* 局部变量和全局变量在内存中的区别：
  * 全局变量保存在内存的**全局存储区**
  * 局部变量保存在**栈**中，只有在所在函数被调用时才会动态的分配存储单元
* 初始化区别：
  * 局部变量在定义时不会初始化
  * 全局变量定义时就被初始化了
    ![](/note/2019-06-13-17-02-23.png)

## 数组

## 枚举enum
`enum 枚举名 {枚举元素1， 枚举元素2, ......}`  
```c
enum Day 
{
  MON = 1, TUE, WED, THU, FRI, SAT, SUN
};
```
* 如果不设置，默认第一个元素是0
* 后续枚举元素会在前一个成员上加1
```c
#include <stdio.h>
#include <stdlib.h>

int main() 
{
  enum Day
  {
    mon,
    tue,
    wed,
    tur,
    fri,
    sat,
    sun
  };

  int a = 1;
  enum Day oneDay;
  oneDay = (enum Day) a;
  printf("oneDay: %d \n", oneDay);
  return 0;
}
```

## 指针
指针是个变量，值是另外一个变量的内存地址  
`type *var-name;`
* 取一个变量的指针，通过`&`
* 获取一个指针指向的内存地址的值，通过`*`

## 字符串
字符串实际上是使用null，字符`\0`终止的一维字符数组
```c
#include <stdio.h>
 
int main ()
{
  char greeting[6] = {'H', 'e', 'l', 'l', 'o', '\0'};

  printf("Greeting message: %s\n", greeting );

  return 0;
}
```
会打印出“Hello”  
操作字符串函数示例：
* `strcpy(s1, s2)`：复制字符串2到字符串1
* `strcat(s1, s2)`：连接字符串2到字符串1的末尾
* `strlen(s1)`：返回字符串1的长度
* `strcmp(s1, s2)`：如果 s1 和 s2 是相同的，则返回 0；如果 s1 < s2 则返回小于 0；如果 s1 > s2 则返回大于 0
* `strchr(s1, ch)`：返回一个指针，指向字符串 s1 中字符 ch 的第一次出现的位置
* `strstr(s1, s2)`：返回一个指针，指向字符串 s1 中字符串 s2 的第一次出现的位置

## 结构体
* 定义
  ```c
  struct Books
  {
    char title[50];
    char author[50];
    char subject[100];
    int book_id;
  } book;
  ```
  上面代码，
    * 声明了拥有三个成员的结构体
    * 声明了结构体变量是book
    * 结构体标签是Books
  ```c
  struct
  {
    char title[50];
    char author[50];
    char subject[100];
    int book_id;
  } book;
  ```
  * 无标签，结构体变量是book
  ```c
  struct Books
  {
    char title[50];
    char author[50];
    char subject[100];
    int book_id;
  };

  struct Books b1, b2, b3;
  ```
  * 有标签为Books，但是没定义结构体变量
  * 定义变量b1, b2, b3的值是结构体
  ```c
  typedef struct
  {
    char title[50];
    char author[50];
    char subject[100];
    int book_id;
  } Books;

  Books b1, b2, b3;
  ```
