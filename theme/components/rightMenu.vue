<template>
  <div class="right-menu-wrapper" v-if="headers.length">
    <div class="right-menu-margin">
      <div class="right-menu-title">目录</div>
      <div class="right-menu-content">
        <div
          :class="[
            'right-menu-item',
            'level' + item.level,
            { active: item.slug === hashText },
          ]"
          v-for="(item, i) in headers"
          :key="i"
        >
          <a :href="'#' + item.slug">{{ item.title }}</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { usePageData } from '@vuepress/client'
import { jsonToArray, deepCopy } from '../util'

const pageData = usePageData()
const route = useRoute()
let hashText = ref('')
let headers = ref([])

function getHashText() {
  hashText.value = decodeURIComponent(window.location.hash.slice(1))
}

function getHeadersData() {
  headers.value = jsonToArray(deepCopy(pageData.value.headers))
}

onMounted(() => {
  getHeadersData()
})

watch(route, () => {
  getHeadersData()
  getHashText()
})
</script>

<style scoped lang="scss">
$rightMenuWidth: 230px;
.right-menu-wrapper {
  position: sticky;
  float: right;
  width: $rightMenuWidth;
  margin-right: -($rightMenuWidth + 55px);
  top: 0;
  font-size: 0.8rem;
  .right-menu-margin {
    margin-top: 4.6rem;
    border-radius: 3px;
    overflow: hidden;
  }
  .right-menu-title {
    &:after {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      background: var(--borderColor);
      margin-top: 10px;
    }
  }
  .right-menu-content {
    max-height: 80vh;
    position: relative;
    overflow: hidden;
    padding: 4px 3px 4px 0;
    &::-webkit-scrollbar {
      width: 3px;
      height: 3px;
    }

    &::-webkit-scrollbar-track-piece {
      background: none;
    }

    &::-webkit-scrollbar-thumb:vertical {
      background-color: hsla(0, 0%, 49%, 0.3);
    }

    &:hover {
      overflow-y: auto;
      padding-right: 0;
    }
    .right-menu-item {
      padding: 4px 15px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      position: relative;
      &.level2 {
        font-size: 0.8rem;
      }

      &.level3 {
        padding-left: 27px;
      }

      &.level4 {
        padding-left: 37px;
      }

      &.level5 {
        padding-left: 47px;
      }

      &.level6 {
        padding-left: 57px;
      }

      &.active {
        &:before {
          content: '';
          position: absolute;
          top: 5px;
          left: 0;
          width: 3px;
          height: 14px;
          background: var(--c-text-accent);
          border-radius: 0 4px 4px 0;
        }

        a {
          color: var(--c-text-accent);
          opacity: 1;
        }
      }

      a {
        color: var(--textColor);
        opacity: 0.75;
        display: inline-block;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        &:hover {
          opacity: 1;
        }
      }
    }
  }
}
</style>
