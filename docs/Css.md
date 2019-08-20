# Css

[[toc]]

## img标签的object属性
当img设置了指定宽高之后，如果跟图片原始尺寸不是等比例，会导致图片拉伸，object相关属性可以让图片像background-image一样指定填充方式，来避免某些情况下的拉伸失真。
1. object-fit: cover/contain/fill
2. object-position: center/top/bottom

## css负值用法
1. outline-offset设置负值，实现➕效果
    * ![](/note/2019-08-20-10-48-34.png)
    * 需要注意：容器要是正方形，因为outline是边框嘛；outline宽度不能太小
    * 负值范围在`-(容器宽度的一半 + outline宽度的一半) < x < -(容器宽度的一半 + outline宽度)`
2. box-shadow实现的单侧投影
    * 利用扩张半径可以设置负值，然后生成的阴影略大于扩张半径的负值就ok，否则阴影会被元素完全遮住
    * ![](/note/2019-08-20-10-54-59.png)
    * 第一个参数的正负决定了左右，第二个参数的正负决定了上下
