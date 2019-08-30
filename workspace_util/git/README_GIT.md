## git 版本管理工具

## 暂存区
    - git stash

## 暂存操作
    #查看当前状态
    git status 
    #如果有修改,添加修改文件
    git add .
    #暂存操作
    git stash save '本次暂存的标识名字'

## 查看当前暂存的记录
    #查看记录
    git stash list

## 恢复暂存的工作

    - pop命令恢复,恢复后,暂存区域会删除当前的记录
    - #恢复指定的暂存工作, 暂存记录保存在list内,需要通过list索引index取出恢复
        git stash pop stash@{index}
    -‘apply命令恢复,恢复后,暂存区域会保留当前的记录’
    -#恢复指定的暂存工作, 暂存记录保存在list内,需要通过list索引index取出恢复
        git stash apply stash@{index}

## 删除暂存区
    #删除某个暂存, 暂存记录保存在list内,需要通过list索引index取出恢复
    git stash drop stash@{index}
    #删除全部暂存
    git stash clear


# 常用 git stash命令：

    （1）git stash save "save message"  : 执行存储时，添加备注，方便查找，只有git stash 也要可以的，但查找时不方便识别。

    （2）git stash list  ：查看stash了哪些存储

    （3）git stash show ：显示做了哪些改动，默认show第一个存储,如果要显示其他存贮，后面加stash@{$num}，比如第二个 git stash show stash@{1}

    （4）git stash show -p : 显示第一个存储的改动，如果想显示其他存存储，命令：git stash show  stash@{$num}  -p ，比如第二个：git stash show  stash@{1}  -p

    （5）git stash apply :应用某个存储,但不会把存储从存储列表中删除，默认使用第一个存储,即stash@{0}，如果要使用其他个，git stash apply stash@{$num} ， 比如第二个：git stash apply stash@{1} 

    （6）git stash pop ：命令恢复之前缓存的工作目录，将缓存堆栈中的对应stash删除，并将对应修改应用到当前的工作目录下,默认为第一个stash,即stash@{0}，如果要应用并删除其他stash，命令：git stash pop stash@{$num} ，比如应用并删除第二个：git stash pop stash@{1}

    （7）git stash drop stash@{$num} ：丢弃stash@{$num}存储，从列表中删除这个存储

    （8）git stash clear ：删除所有缓存的stash




