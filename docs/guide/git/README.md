---
title: git 相关
date: 2022-11-21
permalink: /guide/git/
---

# git 相关

## 提交规范

<code>feat：增加新功能</code>
<br>
<code>fix: 修复问题/BUG</code>
<br>
<code>style: 代码风格相关无影响运行结果的</code>
<br>
<code>perf: 优化/性能提升</code>
<br>
<code>refactor: 重构</code>
<br>
<code>revert: 撤销修改</code>
<br>
<code>test: 测试相关</code>
<br>
<code>docs: 文档/注释</code>
<br>
<code>chore: 依赖更新/脚手架配置修改等</code>
<br>
<code>workflow: 工作流改进</code>
<br>
<code>ci: 持续集成</code>
<br>
<code>types: 类型定义文件更改</code>
<br>
<code>wip: 开发中</code>

## 常用命令

### 创建仓库代码

```sh
git clone xxx.git
```

### 创建分支

```sh
git branch dev
# or
git checkout -b dev
# or
git switch -c dev
```

### 切换本地分支

```sh
git checkout dev
# or
git switch dev
```

### 切换分支并关联远程分支

```
git checkout -b dev origin/dev
# or
git checkout --track origin/dev
```

### 查看本地所有分支

```
git branch
```

### 查看远程所有分支

```
git branch -r
```

### 删除本地分支

```
git push origin -d dev
```

### 拉取远程分支代码

```
git pull origin dev
```

### 将代码从工作区添加暂存区

```
git add .
```

### 查看尚未暂存的更新

```
git diff
```

### 添加提交信息（commit 注释写错，执行 git commit --amend 此时会进入默认 vim 编辑器，修改注释后保存）

```
git commit -m 'xxxx'
```

### 推送代码到远程分支

```
git push origin dev

# 强制推送（常在 git rebase 或 git reset 后使用）
git push -f origin dev
```

### 合并分支

```
git merge dev
```

### 查看 git 状态

```
git status
```

### 查看提交历史

```
git log
```

### 查看可引用的历史版本记录

```
git reflog
```

### 把本地未 push 的分叉提交历史整理成直线

```
git rebase origin/dev
```

### 回到 rebase 执行之前的状态

```
git rebase --abort
```

### 回退版本

```
# 回退指定 commit_id 版本
git reset --hard commit_id

# 回退上一个版本
git reset --soft HEAD^
# or
git reset --soft HEAD~1
```

### 撤销代码

```
git revert commit_id
```

### 修改分支名

```
# 第一步
git branch -m oldBranchName newBranchName

# 第二步
git push origin :oldBranchName

# 第三步
git push --set-upstream origin newBranchName
```

### 查看 git 配置

```
# 查看全局配置
git config --global --list

# 查看用户名
git config --global user.name
```

### 添加用户名

```
git config --global --add user.name newName
```

### 删除用户名

```
git config --global --unset user.name
```

### 修改用户名

```
git config --global user.name newName
```

### 配置 Git 用户名和邮箱

```
# 用户名
git config --global user.name "Your Name"

# 邮箱
git config --global user.email "email@example.com"
```
