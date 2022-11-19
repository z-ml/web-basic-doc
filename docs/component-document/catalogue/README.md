---
title: 目录结构
date: 2022-11-10
permalink: /component-document/catalogue/
---

文档目录结构

```
├── .vuepress  # vuepress 文档配置文件
│   │   ├── .cache  # 
│   │   ├── .temp  # 
│   │   ├── configs  # vuepress配置文件
│   │   |      ├── nav  # 菜单配置文件
│   │   |      |    ├── navbar # 导航栏菜单
│   │   |      |    └── sidebar # 侧边栏菜单
│   │   ├── public  # 公共资源
│   │   |      ├── images # 图片
│   │   ├── client  # 客户端配置文件，用来注册组件以及路由钩子函数配置等
│   │   ├── config  # vuepress 配置文件，来配置一些默认配置
├── guide  # 指南
│   │   ├── catalogue # 项目目录结构
│   │   ├── ...
├── README  # 主页
```