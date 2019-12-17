# Git

[[toc]]

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

## 基本流程
一般流程是
1. 工作区进行开发，代码修改了/增加，然后`git add .`到暂存区，暂存区可以保留一份修改
2. 如果对工作区代码不满意，回退回暂存区版本`git checkout .`
3. 代码没有问题了，也添加到暂存区，则`git commit -m 'YOURCOMMIT'`，将暂存区的代码提交到仓库区
4. 将本地仓库区代码推到远程仓库，`git push`。或者可以先`git fetch`，拉取远程仓库的分支，然后`git pull [remote] [branch]`拉取远程分支并与本地合并，然后解决冲突后再`git push`

## 分支管理
1. 创建分支：
  * `git branch BRANCHNAME`创建新分支但是停留在当前分支
  * `git checkout -b BRANCHNAME`创建并切换到新的分支
2. 切换分支：`git checkout BRANCHNAME`
3. 查看分支
  * 本地分支列表：`git branch`
  * 远程分支：`git branch -r`
  * 所有分支：`git branch -a`
4. 将本地分支推到远端仓库：`git push REMOTE LOCALBRANCHNAME`
5. 删除
  * 本地分支`git branch -d BRANCHNAME`
  * 远端分支`git branch -dr REMOTE/BRANCHNAME`
6. 合并分支
  * `git merge BRANCHNAME` 合并指定分支到当前分支
  * `git cherry-pick COMMITID` 选择一个commit，合并到当前分支（这个貌似比较少用到）
