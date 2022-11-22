<template>
  <aside class="sidebar-zml">
    <ul class="sidebar-items-zml">
      <li
        class="sidebar-items-zml"
        v-for="(item, index) in sidebarList"
        :key="index"
      >
        <p class="sidebar-item-zml sidebar-heading">{{ item.text }}</p>
        <ul v-for="(child, childIndex) in item.children" :key="childIndex">
          <li>
            <RouterLink
              :class="[
                'sidebar-item-zml',
                child.link === route.path ? 'active' : '',
              ]"
              :to="child.link"
              >{{ child.text }}</RouterLink
            >
          </li>
        </ul>
      </li>
    </ul>
  </aside>
</template>

<script setup>
import { sidebar } from '../configs/nav/sidebar'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
// 获取一级菜单路由
const firstRoutePath = ref('')
if (route.path === '/') {
  firstRoutePath.value = `/guide/`
} else {
  firstRoutePath.value = `/${route.path.split('/')[1]}/`
}
// 通过一级菜单路由找到对应的侧边栏二级菜单
const sidebarList = sidebar[firstRoutePath.value]
</script>

<style scoped lang="scss">
.sidebar-zml {
  font-size: 16px;
  width: var(--sidebar-width);
  position: fixed;
  z-index: 10;
  margin: 0;
  top: var(--navbar-height);
  left: 0;
  bottom: 0;
  box-sizing: border-box;
  border-right: 1px solid var(--c-border);
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--c-brand) var(--c-border);
  background-color: var(--c-bg-sidebar);
  transition: transform var(--t-transform), background-color var(--t-color),
    border-color var(--t-color);
  .sidebar-items-zml {
    padding: 1.5rem 0;
    .sidebar-item-zml {
      &.sidebar-heading {
        transition: color 0.15s ease;
        font-size: 1.1em;
        font-weight: 700;
        padding: 0.35rem 1.5rem 0.35rem 1.25rem;
        width: 100%;
        box-sizing: border-box;
        margin: 0;
      }
      &:not(.sidebar-heading) {
        font-size: 1em;
        font-weight: 400;
        display: inline-block;
        margin: 0;
        padding: 0.35rem 1rem 0.35rem 2rem;
        line-height: 1.4;
        width: 100%;
        box-sizing: border-box;
      }
      &.active:not(p.sidebar-heading) {
        font-weight: 600;
        color: var(--c-text-accent);
        border-left-color: var(--c-text-accent);
      }
      cursor: default;
      border-left: 0.25rem solid transparent;
      color: var(--c-text);
    }
    a.sidebar-item-zml {
      cursor: pointer;
      &:hover {
        color: var(--c-text-accent);
      }
    }
  }
}
</style>
