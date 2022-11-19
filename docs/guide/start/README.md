---
title: 开始
date: 2022-11-10
permalink: /guide/start/
---

# 开始

## 开发环境

::: warning 前提条件
`node` 版本应不小于 `16` ，`pnpm` 版本应不小于 `6`
:::

如果您还没安装 `pnpm`，请执行下面命令进行安装（`mac` 用户遇到安装报错请在命令前加上 `sudo`）

```
npm install -g pnpm
```

如果您需要安装多个 `node` 版本环境，推荐使用 [nvm](https://github.com/coreybutler/nvm-windows/releases)

## 本地开发

安装依赖

```
pnpm install
```

启动项目

```
pnpm dev
```

安装一个包

```
pnpm add 包名
```

卸载一个包

```
pnpm remove 包名
```