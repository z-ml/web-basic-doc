<template>
  <Home v-if="frontmatter.home"></Home>
  <ParentLayout v-else>
    <template #page>
      <sidebar></sidebar>
      <main class="page">
        <div class="custom-wrapper">
          <rightMenu></rightMenu>
          <div class="theme-default-content">
            <Content></Content>
          </div>
          <PageMeta />
          <PageNav />
        </div>
      </main>
    </template>
  </ParentLayout>
</template>

<script setup>
import Home from '@vuepress/theme-default/components/Home.vue'
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import PageMeta from '@theme/PageMeta.vue'
import PageNav from '@theme/PageNav.vue'
import { usePageFrontmatter } from '@vuepress/client'
import rightMenu from '../components/rightMenu.vue'
import sidebar from '../components/sidebar.vue'

const frontmatter = usePageFrontmatter()
</script>

<style lang="css">
.page {
  padding-right: 250px;
}
.custom-wrapper {
  max-width: 860px;
  margin: 0 auto;
}
</style>
