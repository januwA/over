
### 使用操作系统的人被称之为用户
- `su root` // 从当前用户切换到root用户
- `groups user` // user用户处于那个用户组
- linux 允许多人同时登陆
---
### 具有相同权限的一组用户被称之为 用户组
- ### /etc/group/  存储当前系统中所有的用户信息
- ajanuw : x        :  1000 :aa,bb,cc

    ajanuw| x | 1000 | user1,user2,user3
    ---|---|---|---
    组名称 | 组密码占位符 | 组编号| 组中用户列表
- root 组的组编号是0
- 1 - 499 是系统留给安装的软件用的
- 用户创建的用户组 一般是从 500开始的
---
- ### /etc/gshadow 储存当前系统用户组密码信息

    root| * |   |a,b,c
    ---|---|---|---
    组名称 | 组密码 | 组管理者| 组中用户列表
- 组密码为空or*or!可以认为这个组的密码为空
- 用户列表与 group里面的一样
---
* ### /etc/passwd 储存当前系统所有用户的信息
    root| * |   |a,b,c
    ---|---|---|---
    组名称 | 组密码 | 组管理者| 组中用户列表

ajanuw| x | 1000 |1000|2011/12/3 |/home/ajanuw |/bin/bash
 ---|---|---|---|---|---|---|---
 用户名|密码占位符|用户编号|用户组编号|用户注释信息|用户目录|shell类型
 * ### /etc/shadow  储存当前系统所有用户密码信息
 - 密码一般都会被加密
---
## 创建用户组
- `groupadd [-g] [number] grouptest`  // 创建了一个用户组 -g 1888 创建时同时指定组编号
- `groupmod -n newGroupName oldGroupName` // 修改组名称
- `groupmod -g 1211 grouptest`  // 修改组编号，默认是系统给的
- `groupdel grouptest` // 删除用户组，删除前 记得先清空下面的所有用户
---
## 创建用户
- `adduser user2`  //创建一个用户，回车继续输入密码， 然后一路回车创建好后，会自动在home下创建user2的家目录
- 修改用户信息
    - `passwd -d user2`  // 清空密码
    - `passwd 1234` // 创建密码
    - `usermod -c num user` //修改用户的备注信息
    - `usermod -l newName oldName`  // 修改name
    - `usermod -g group user` // 指定用户所在用户组
    - `userdel [-r] user` // 删除用户， -r 同时删除文件
    - `passwd -l user` // 锁定账户
    - `passwd -u user` // 解锁账户
    - `gpasswd -a user group` // 把用户添加到其它组,同时处于多个组
    - `gpasswd -d zgq group` // 在用户组中删掉user用户
    - `newgro group` // 切换到 group组里面去，如果group组有组密码，会输入组密码
---
### `touch /etc/nologin`  // 创建此文件后除了root其他人将无法登陆服务器
