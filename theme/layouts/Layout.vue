<template>
  <ParentLayout>
    <template #page>
      <main class="page">
        <div class="custom-wrapper">
          <rightMenu></rightMenu>
          <Content class="theme-default-content"></Content>
        </div>
      </main>
    </template>
  </ParentLayout>
</template>

<script setup>
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
</script>

<style lang="css">
.custom-wrapper {
  max-width: 860px;
  margin: 0 auto;
}
</style>
