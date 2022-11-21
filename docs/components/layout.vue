<script setup>
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import { usePageFrontmatter } from '@vuepress/client'
console.log(usePageFrontmatter())
</script>

<template>
  <ParentLayout>
    <template #page>
      <Content class="custom-content"></Content>
      <rightMenu></rightMenu>
    </template>
  </ParentLayout>
</template>

<style lang="css">
.custom-content {
  max-width: 860px;
  margin: 0 auto;
  padding: 1rem 2.5rem 2rem;
}
</style>
