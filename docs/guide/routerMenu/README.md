---
title: 路由和菜单
date: 2022-11-21
permalink: /guide/routerMenu/
---

# 路由和菜单

## 配置项

```js
const router = {
  path: '/examples', //路由地址 ·必填·
  name: 'examples', //路由名字与组件中的`name` 保持一致 ·必填·
  text: '组件库', //展示名称 ·必填·
  id: 1024, //id不可重复 ·必填·
  parentId: null, //父级菜单id ·可选·
  component: '', //对应的组件 ·可选·
  iconName: 'zichanzhongxin', //菜单图标 ·可选·
  isExternalLink: false, //是否外部网站链接 如果是外部网站链接可以在nav-header中额外处理 ·可选·
}
```

## 系统中如何生成路由菜单

### 初始化菜单

在 `src/router/index.js` 中已经初始化了默认的基础路由

### 前端静态路由

在 `src/router/index.js` 中可以直接添加，也可以在 `src/stores/modules/permission.js`中按需引入，例如 `examplesRoutes`

### 从后端中获取路由

在 `系统管理` 中添加，找到对应的应用系统，新增模块，如下图

![add-router-dynamic](/images/routerMenu/add-router-dynamic.png)

```
父层级 —— 同配置项parentId
层级名称 —— 同配置项name
资源编码 —— 可随意填写，只要没有报重复即可
权限标识 —— 用来做权限控制一般与name保持一致，具体使用方法见 权限章节
路由地址 —— 同配置项component
是否外链 —— 同配置项isExternalLink
图标 —— 同配置项iconName
```

## 路由处理机制

### 加载静态路由

由 `src/router/index.js` 加载静态路由

### 动态添加路由

在 `src/router/guard.js` 路由钩子函数中，调用 `src/stores/modules/permission.js` 中的 `setRouterList` 方法从后端获取菜单路由并处理一部分字段

`guard.js`

```javascript
async function _getRoutes(to, from, next) {
  try {
    const permissionStore = usePermissionStore()
    await permissionStore.setRouterList()
    const accessRoutes = getAsyncRoutes(permissionStore.routerList)
    if (accessRoutes.length > 0) {
      // 动态添加格式化过的路由
      accessRoutes.forEach((route) => {
        router.addRoute(route)
      })
      if (to.name === '/') {
        const redirectRoute = accessRoutes.find((row) => row.name === '/')
        next({
          ...redirectRoute,
          replace: true,
        })
      } else {
        next({
          path: to.fullPath,
          replace: true,
          query: to.query,
        })
      }
    } else {
      Message.warning('该用户未分配菜单权限,请联系管理员分配！')
      next({
        name: 'login',
        query: {
          redirect: router.currentRoute.name,
        }, //登录成功后跳入浏览的当前页面
      })
    }
  } catch (err) {
    console.log(err, 'err')
    next({
      name: 'login',
      query: {
        redirect: router.currentRoute.name,
      }, //登录成功后跳入浏览的当前页面
    })
  }
}
```

`permission.js`

```javascript
async setRouterList() {
  try {
    const commonStore = useCommonStore();
    const userStore = useUser();
    const examples = useExamplesRoutes()
    // 获取iVDG的菜单信息等
    const res = await userStore.getUserInfo(null);
    // 只返回页面或模块菜单
    const menus = res.data.data.resourceVoList.filter(row => row.resourceType === '1' || row.resourceType === '2');
    const datascopeVoList = res.data.data.datascopeVoList;
    const permissions = res.data.data.permissions;
    this.routerList = menus.map(row => {
      return {
        path: row.componentUrl || `/${row.resourceUrl}`,
        name: row.resourceUrl,
        text: row.resourceCname,
        id: row.id,
        parentId: row.parentId,
        component: row.componentUrl || `/${row.resourceUrl}`, //路由对应文件
        iconName: geticonClassName(row.iconUrl), //菜单图标
        isExternalLink: row.isExternalLink, //是否外部网站链接
      }
    });

    if (isDev) {
      this.routerList = [...this.routerList, ...examples.routerList]
    }

    this.routerTreeList = arrayToJson(deepCopy(this.routerList), 'id', 'parentId');
    this.permissions = permissions;
    commonStore.setOrganizationList(datascopeVoList);
  } catch (err) {
    console.log(err);
  }
}
```

然后通过 `src/router/asyncRouter.js` 处理获取到的菜单路由列表，将字段转化为 `vue-router` 所需的字段，并生成重定向路由

`asyncRouter.js`

```javascript
const modules = import.meta.glob('../views/**/*.vue')
// 引入路由文件这种的公共路由
export function getAsyncRoutes(routes) {
  const res = []
  // 定义路由中需要的自定名
  const keys = ['path', 'name', 'children', 'redirect', 'meta']
  // 遍历路由数组去重组可用的路由
  routes.forEach((item) => {
    const newItem = {}
    newItem.component = modules[`../views${item.component}/index.vue`]
    for (const key in item) {
      if (keys.includes(key)) {
        newItem[key] = item[key]
      }
    }

    const hasChild = routes.findIndex((row) => row.parentId === item.id)
    // 若遍历的当前路由存在子路由，需要对子路由进行递归遍历
    if (hasChild !== -1) {
      let redirect = getRedirect(routes, item)
      newItem.redirect = {
        name: redirect,
      }
    }
    res.push(newItem)
  })
  // 动态添加重定向路由
  res.length &&
    res.push({
      path: '/',
      name: '/',
      redirect: {
        name: res[0].name,
      },
    })
  // 返回处理好且可用的路由数组
  return res
}

function getRedirect(routes, route, redirect = '') {
  const redirectRoute = routes.find((row) => row.parentId === route.id)
  if (!!redirectRoute) {
    redirect = `${redirectRoute.name}`
    return getRedirect(routes, redirectRoute, redirect)
  } else {
    return redirect
  }
}
```
