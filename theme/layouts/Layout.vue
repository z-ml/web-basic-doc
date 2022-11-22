<template>
  <Home v-if="frontmatter.home"></Home>
  <ParentLayout v-else>
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
import { onMounted, ref, watch } from 'vue'
import Home from '@vuepress/theme-default/components/Home.vue'
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import { usePageData } from '@vuepress/client'
import { useRoute } from 'vue-router'

const pageData = usePageData()
const route = useRoute()
const frontmatter = ref({})

onMounted(() => {
  frontmatter.value = pageData.value.frontmatter
})

watch(route, () => {
  frontmatter.value = pageData.value.frontmatter
})
</script>

<style lang="css">
.custom-wrapper {
  max-width: 860px;
  margin: 0 auto;
}
</style>
