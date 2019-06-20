# Git

git分成三个区：工作区，暂存区，版本库  
![](/note/2019-06-20-13-11-29.png)
* 左侧是工作区，右侧是版本库，index部分是暂存区，master是master分支的目录树
* objects区域是git的对象库，包含了创建的各种对象和内容  
1. 当在工作区修改/新增文件，执行`git add`，工作区修改/新增的文件内容写入对象库中的一个新的对象，该对象id被记录在暂存区的文件索引中，同时，暂存区的目录树会被更新
2. `git commit`时，暂存区目录树写入版本库中，master分支做相应更新。
3. `git reset HEAD`时，暂存区的目录树会被重写，被master分支指向的目录树代替，工作区不受影响
4. `git rm --cached <file>`会直接从暂存区删除文件，工作区不改变
5. `git checkout . / git checkout -- <file>`，会用暂存区全部/指定文件替换工作区文件，会清除工作区中未添加到暂存区的改动
6. `git checkout HEAD / git checkout HEAD <file>`，会用head指向master分支中的全部/部分文件替换暂存区和工作区中的文件


* git init / git init [project-name]
* git clone